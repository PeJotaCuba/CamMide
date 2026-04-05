import { ViewState } from '../App';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'PANEL DE CONTROL' },
    { id: 'ar', icon: 'view_in_ar', label: 'MODO AR' },
    { id: 'history', icon: 'history', label: 'HISTORIAL' },
    { id: 'code', icon: 'code', label: 'CÓDIGO ARCORE' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full z-[60] w-64 rounded-r-2xl bg-slate-950/80 backdrop-blur-2xl shadow-[20px_0_40px_rgba(0,0,0,0.4)] hidden lg:flex flex-col border-r border-white/5">
      <div className="p-8 border-b border-white/5 mt-16">
        <h2 className="text-[#00f5ff] font-bold font-headline uppercase text-sm">HERRAMIENTAS</h2>
      </div>
      <nav className="flex-1 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as ViewState)}
            className={`w-full flex items-center gap-4 px-8 py-4 font-headline uppercase text-sm font-bold transition-all duration-200 ${
              currentView === item.id
                ? 'text-[#00f5ff] border-r-4 border-[#00f5ff] bg-[#00f5ff]/5'
                : 'text-slate-500 hover:text-[#a7ffb3] hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-8 mt-auto border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-xs text-primary-container">account_circle</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.6rem] text-slate-500 uppercase">Operador</span>
            <span className="text-xs font-bold text-on-surface">TAC_UNIT_04</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
