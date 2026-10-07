import { useEffect, useState } from 'react';
import { Home, Search, LayoutGrid, Settings, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { HomePage } from '@/pages/HomePage';
import { SearchPage } from '@/pages/SearchPage';
import { ComparePage } from '@/pages/ComparePage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { SettingsPage } from '@/pages/SettingsPage';

export default function App() {
  const { activeTab, setActiveTab, loadEarnKaroId } = useAppStore();
  const [compareQuery, setCompareQuery] = useState<string | null>(null);

  useEffect(() => {
    loadEarnKaroId();
  }, [loadEarnKaroId]);

  const handleSearch = (query: string) => {
    setCompareQuery(query);
  };

  const handleBackFromCompare = () => {
    setCompareQuery(null);
  };

  // Compare is an overlay view, not a tab
  if (compareQuery) {
    return <ComparePage query={compareQuery} onBack={handleBackFromCompare} />;
  }

  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'categories' as const, label: 'Categories', icon: LayoutGrid },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top header — hidden on mobile (bottom nav used instead) */}
      <header className="sticky top-0 z-30 hidden border-b border-slate-200 bg-white/90 backdrop-blur-md sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Deal<span className="text-emerald-500">Scout</span>
            </span>
          </button>

          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile header — compact logo + settings gear */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              Deal<span className="text-emerald-500">Scout</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="pb-20 sm:pb-0">
        {activeTab === 'home' && <HomePage onSearch={handleSearch} />}
        {activeTab === 'search' && <SearchPage onSearch={handleSearch} />}
        {activeTab === 'categories' && <CategoriesPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                <Icon size={20} className={isActive ? 'scale-110 transition-transform' : ''} />
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
