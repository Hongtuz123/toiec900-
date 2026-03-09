import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ArrowRight, Target, Flame } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            歡迎來到 123的英文學習之路
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8">
            專為多益金色證書打造的學習平台。結合 AI 技術，提供個人化的閃卡單字學習與全真模擬試題，助你高分通關！
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link
              to="/flashcards"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
            >
              <BookOpen className="w-5 h-5" />
              開始背單字
            </Link>
            <Link
              to="/mock-exam"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              <GraduationCap className="w-5 h-5" />
              進行模擬測驗
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-slate-500 font-medium">學習進度</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900">Day 1 / 80</p>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-slate-500 font-medium">連續學習</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900">1 天</p>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-slate-500 font-medium">已背單字</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900">0 / 2000</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 group hover:border-indigo-200 transition-colors">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 md:mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">閃卡背單字</h3>
          <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6 line-clamp-2">
            精選 2000 個多益高頻單字，分為 80 天學習計畫。包含詞性、中文說明、例句與 TTS 真人發音，加深記憶。
          </p>
          <Link to="/flashcards" className="inline-flex items-center gap-2 text-indigo-600 font-medium group-hover:gap-3 transition-all">
            前往學習 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 group hover:border-emerald-200 transition-colors">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 md:mb-6">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">全真模擬試題</h3>
          <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6 line-clamp-2">
            包含聽力與閱讀共 7 大題型。透過 AI 語音合成技術模擬真實聽力測驗，考後提供詳細解析。
          </p>
          <Link to="/mock-exam" className="inline-flex items-center gap-2 text-emerald-600 font-medium group-hover:gap-3 transition-all">
            開始測驗 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
