import { ViewState } from '../App';

interface TopBarProps {
  currentView: ViewState;
}

export default function TopBar({ currentView }: TopBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl flex justify-between items-center px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[#00f5ff]">precision_manufacturing</span>
        <span className="font-headline tracking-widest uppercase text-xs text-[#00f5ff] font-black drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
          ESTADO: LISTO
        </span>
      </div>
      {currentView === 'dashboard' && (
        <div className="font-black text-[#00f5ff] drop-shadow-[0_0_8px_rgba(0,245,255,0.5)] font-headline tracking-tighter hidden md:block">
          TACTICAL AR
        </div>
      )}
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:bg-[#00f5ff]/10 p-2 rounded-full transition-opacity duration-300">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
