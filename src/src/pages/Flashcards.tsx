import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, ArrowRight, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { getFlashcardsForDay, FlashcardData } from '../data/vocabulary';

export default function Flashcards() {
  const [day, setDay] = useState(1);
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    loadDay(day);
  }, [day]);

  const loadDay = (targetDay: number) => {
    setIsFinished(false);
    setCurrentIndex(0);
    setIsFlipped(false);
    
    const newCards = getFlashcardsForDay(targetDay);
    setCards(newCards);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleNextDay = () => {
    if (day < 80) {
      setDay(prev => prev + 1);
    }
  };

  const handlePrevDay = () => {
    if (day > 1) {
      setDay(prev => prev - 1);
    }
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-slate-600 font-medium">無法載入單字卡，請重試。</p>
        <button 
          onClick={() => loadDay(day)}
          className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200"
        >
          <RefreshCw className="w-4 h-4" /> 重新載入
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center px-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">恭喜完成 Day {day}！</h2>
        <p className="text-slate-600 max-w-md">
          您已經學習了今天的 25 個多益高頻單字。繼續保持，離金色證書更近一步！
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
          <button 
            onClick={() => { setIsFinished(false); setCurrentIndex(0); setIsFlipped(false); }}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
          >
            再次複習
          </button>
          {day < 80 && (
            <button 
              onClick={handleNextDay}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center gap-2"
            >
              進入 Day {day + 1} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center">
      {/* Header & Day Navigation */}
      <div className="w-full flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={handlePrevDay} 
            disabled={day === 1}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="上一天"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Day {day}</h2>
          <button 
            onClick={handleNextDay} 
            disabled={day === 80}
            className="p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="下一天"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        <div className="text-xs md:text-sm font-medium text-slate-500 bg-slate-100 px-3 md:px-4 py-1.5 rounded-full">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full mb-8 md:mb-12 overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="w-full perspective-1000 h-80 md:h-96 mb-8 md:mb-12">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center p-6 md:p-8 text-center">
            <button 
              onClick={(e) => { e.stopPropagation(); playAudio(currentCard.word); }}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
              title="發音"
            >
              <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 md:mb-4 tracking-tight break-all px-4">{currentCard.word}</h3>
            <p className="text-base md:text-lg text-slate-500 font-medium italic">{currentCard.partOfSpeech}</p>
            <p className="text-xs md:text-sm text-slate-400 mt-6 md:mt-8">點擊卡片翻面</p>
          </div>

          {/* Back */}
          <div 
            className="absolute w-full h-full backface-hidden bg-indigo-600 text-white rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 md:p-10 text-center overflow-y-auto"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{currentCard.chinese}</h3>
            <div className="w-12 md:w-16 h-1 bg-indigo-400/50 rounded-full mb-4 md:mb-6 shrink-0" />
            <div className="flex flex-col items-center gap-2">
              <p className="text-base md:text-lg text-indigo-100 leading-relaxed">
                "{currentCard.example}"
              </p>
              <p className="text-sm md:text-base text-indigo-200 leading-relaxed font-medium">
                {currentCard.exampleChinese}
              </p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); playAudio(currentCard.example); }}
              className="mt-4 md:mt-6 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors shrink-0"
              title="朗讀例句"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 md:gap-6 w-full justify-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 md:p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1 max-w-[160px] py-3 md:py-4 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-900 transition-colors shadow-md text-sm md:text-base"
        >
          翻面
        </button>
        <button
          onClick={handleNext}
          className="p-3 md:p-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}
