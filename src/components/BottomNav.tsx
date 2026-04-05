import { ViewState } from '../App';

interface BottomNavProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
}

export default function BottomNav({ currentView, setCurrentView }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-6 mb-4 lg:hidden">
      <button 
        onClick={() => setCurrentView('dashboard')}
        className={`rounded-full p-4 transition-all ${currentView === 'dashboard' ? 'bg-[#00f5ff] text-slate-950 scale-110 shadow-[0_0_20px_rgba(0,245,255,0.6)]' : 'bg-slate-900/60 backdrop-blur-md text-slate-300 hover:scale-105'}`}
      >
        <span className="material-symbols-outlined">dashboard</span>
      </button>
      <button 
        onClick={() => setCurrentView('ar')}
        className={`rounded-full p-6 scale-125 transition-all ${currentView === 'ar' ? 'bg-[#00f5ff] text-slate-950 shadow-[0_0_20px_rgba(0,245,255,0.6)]' : 'bg-[#00f5ff] text-slate-950 shadow-[0_0_20px_rgba(0,245,255,0.6)]'}`}
      >
        <span className="material-symbols-outlined">view_in_ar</span>
      </button>
      <button 
        onClick={() => setCurrentView('history')}
        className={`rounded-full p-4 transition-all ${currentView === 'history' ? 'bg-[#00f5ff] text-slate-950 scale-110 shadow-[0_0_20px_rgba(0,245,255,0.6)]' : 'bg-slate-900/60 backdrop-blur-md text-slate-300 hover:scale-105'}`}
      >
        <span className="material-symbols-outlined">history</span>
      </button>
      <button 
        onClick={() => setCurrentView('code')}
        className={`rounded-full p-4 transition-all ${currentView === 'code' ? 'bg-[#00f5ff] text-slate-950 scale-110 shadow-[0_0_20px_rgba(0,245,255,0.6)]' : 'bg-slate-900/60 backdrop-blur-md text-slate-300 hover:scale-105'}`}
      >
        <span className="material-symbols-outlined">code</span>
      </button>
    </nav>
  );
}
