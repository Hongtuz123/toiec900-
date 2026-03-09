import { Link } from 'react-router-dom';
import { Headphones, BookOpen, Clock, FileText } from 'lucide-react';

export default function MockExam() {
  const listeningParts = [
    { id: 1, title: 'Part 1 照片描述', count: 6, desc: '看圖聽敘述，選出最佳描述句。' },
    { id: 2, title: 'Part 2 應答問題', count: 25, desc: '聽一問一答，選出最適切的回應。' },
    { id: 3, title: 'Part 3 簡短對話', count: 39, desc: '聽兩人或三人對話，回答問題，需注意情境與細節。' },
    { id: 4, title: 'Part 4 簡短獨白', count: 30, desc: '聽演講、報告或廣播，回答問題。' },
  ];

  const readingParts = [
    { id: 5, title: 'Part 5 句子填空', count: 30, desc: '語法及詞彙填空，考核文法與辭彙。' },
    { id: 6, title: 'Part 6 段落填空', count: 16, desc: '短篇文章填空，包含完整句子填空題。' },
    { id: 7, title: 'Part 7 閱讀理解', count: 54, desc: '單篇閱讀與多篇閱讀（如電郵、新聞），需理解文章結構與連貫性。' },
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">全真模擬試題</h1>
        <p className="text-base md:text-lg text-slate-600">
          透過 AI 生成的模擬試題，搭配 TTS 語音技術，幫助您熟悉多益考試題型。
          測驗結束後提供詳細解析，確保學習成效。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Listening Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">聽力測驗</h2>
              <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3 md:w-4 md:h-4" /> 100 題</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 md:w-4 md:h-4" /> 約 45 分鐘</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {listeningParts.map((part) => (
              <Link
                key={part.id}
                to={`/mock-exam/${part.id}`}
                className="block p-4 md:p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                    {part.title}
                  </h3>
                  <span className="text-xs md:text-sm font-medium bg-slate-100 text-slate-600 px-2 md:px-3 py-1 rounded-full whitespace-nowrap ml-2">
                    {part.count} 題
                  </span>
                </div>
                <p className="text-slate-500 text-xs md:text-sm">{part.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Reading Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">閱讀測驗</h2>
              <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3 md:w-4 md:h-4" /> 100 題</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 md:w-4 md:h-4" /> 75 分鐘</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {readingParts.map((part) => (
              <Link
                key={part.id}
                to={`/mock-exam/${part.id}`}
                className="block p-4 md:p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {part.title}
                  </h3>
                  <span className="text-xs md:text-sm font-medium bg-slate-100 text-slate-600 px-2 md:px-3 py-1 rounded-full whitespace-nowrap ml-2">
                    {part.count} 題
                  </span>
                </div>
                <p className="text-slate-500 text-xs md:text-sm">{part.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
