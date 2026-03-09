import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Volume2, CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { generateMockExamPart, ExamQuestion } from '../services/gemini';
import { clsx } from 'clsx';

export default function ExamSession() {
  const { part } = useParams<{ part: string }>();
  const navigate = useNavigate();
  const partNumber = parseInt(part || '1', 10);
  
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      const data = await generateMockExamPart(partNumber);
      setQuestions(data);
      setIsLoading(false);
    };
    loadQuestions();
  }, [partNumber]);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      if (!window.confirm('您還有未作答的題目，確定要交卷嗎？')) {
        return;
      }
    }
    setIsSubmitted(true);
    setCurrentIndex(0); // Go back to first question for review
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 px-4 text-center">
        <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-indigo-600 animate-spin" />
        <p className="text-slate-600 font-medium">正在為您生成 Part {partNumber} 模擬試題...</p>
        <p className="text-sm text-slate-400">這可能需要幾秒鐘的時間</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 px-4 text-center">
        <p className="text-slate-600 font-medium">無法載入試題，請重試。</p>
        <button 
          onClick={() => navigate('/mock-exam')}
          className="text-indigo-600 hover:underline"
        >
          返回測驗列表
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isListening = partNumber <= 4;
  const isCorrect = isSubmitted && answers[currentIndex] === currentQuestion.answer;
  const isWrong = isSubmitted && answers[currentIndex] !== currentQuestion.answer;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800">Part {partNumber}</h2>
          <p className="text-xs md:text-sm text-slate-500">
            {isSubmitted ? '測驗解析' : '測驗進行中'}
          </p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="text-xs md:text-sm font-medium text-slate-500 bg-slate-100 px-3 md:px-4 py-1.5 rounded-full">
            {currentIndex + 1} / {questions.length}
          </div>
          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              交卷
            </button>
          )}
        </div>
      </div>

      {/* Score Summary (if submitted) */}
      {isSubmitted && currentIndex === 0 && (
        <div className="mb-6 md:mb-8 bg-indigo-50 border border-indigo-100 p-4 md:p-6 rounded-2xl text-center">
          <h3 className="text-xl md:text-2xl font-bold text-indigo-900 mb-2">測驗結果</h3>
          <p className="text-indigo-700">
            答對題數：{Object.keys(answers).filter(k => answers[parseInt(k)] === questions[parseInt(k)].answer).length} / {questions.length}
          </p>
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-slate-100 mb-6 md:mb-8">
        {/* Audio Player for Listening Parts */}
        {isListening && currentQuestion.audioText && (
          <div className="mb-6 md:mb-8 flex flex-col items-center justify-center p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200">
            <button
              onClick={() => playAudio(currentQuestion.audioText!)}
              className="w-14 h-14 md:w-16 md:h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <p className="mt-3 md:mt-4 text-xs md:text-sm text-slate-500 font-medium">點擊播放音檔</p>
            
            {/* Show transcript only after submission */}
            {isSubmitted && (
              <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200 w-full">
                <p className="text-sm font-semibold text-slate-700 mb-2">聽力文本：</p>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{currentQuestion.audioText}</p>
              </div>
            )}
          </div>
        )}

        {/* Reading Text */}
        {!isListening && currentQuestion.text && (
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-800 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{currentQuestion.text}</p>
          </div>
        )}

        {/* Question */}
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6">
          {currentIndex + 1}. {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-2 md:space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentIndex] === option;
            const isCorrectOption = isSubmitted && option === currentQuestion.answer;
            const isWrongSelected = isSubmitted && isSelected && !isCorrectOption;

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                disabled={isSubmitted}
                className={clsx(
                  'w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all flex items-center justify-between',
                  !isSubmitted && !isSelected && 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50',
                  !isSubmitted && isSelected && 'border-indigo-600 bg-indigo-50',
                  isCorrectOption && 'border-emerald-500 bg-emerald-50',
                  isWrongSelected && 'border-red-500 bg-red-50',
                  isSubmitted && !isCorrectOption && !isWrongSelected && 'border-slate-100 opacity-50'
                )}
              >
                <span className={clsx(
                  'font-medium text-sm md:text-base',
                  isCorrectOption ? 'text-emerald-700' : isWrongSelected ? 'text-red-700' : 'text-slate-700'
                )}>
                  {option}
                </span>
                {isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />}
                {isWrongSelected && <XCircle className="w-5 h-5 text-red-500 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isSubmitted && (
          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-2 text-sm md:text-base">解析</h4>
            <p className="text-indigo-800 text-sm md:text-base leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 md:px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">上一題</span>
        </button>
        
        {currentIndex === questions.length - 1 && isSubmitted ? (
          <button
            onClick={() => navigate('/mock-exam')}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 md:px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm md:text-base"
          >
            結束複習 <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 md:px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            <span className="hidden sm:inline">下一題</span> <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
