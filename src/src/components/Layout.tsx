import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, Home } from 'lucide-react';
import { clsx } from 'clsx';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首頁', icon: Home },
    { path: '/flashcards', label: '閃卡背單字', icon: BookOpen },
    { path: '/mock-exam', label: '模擬試題', icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 shrink-0" />
            <span className="truncate">123的英文學習之路</span>
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden pb-16 md:pb-0">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 md:px-8 shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">
            {navItems.find(item => location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)))?.label || '學習區'}
          </h2>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex items-center justify-around px-2 py-2 z-50 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-col items-center p-2 rounded-lg transition-colors',
                isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
