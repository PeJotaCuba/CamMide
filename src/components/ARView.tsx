import { ViewState } from '../App';

interface ARViewProps {
  setCurrentView: (view: ViewState) => void;
}

export default function ARView({ setCurrentView }: ARViewProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0 ar-view-canvas">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-surface-container-lowest/40"></div>
        <div className="absolute inset-0 hud-scanline opacity-20 pointer-events-none"></div>
      </div>

      <header className="relative z-50 flex justify-between items-center px-6 py-4 w-full bg-slate-950/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00f5ff]">precision_manufacturing</span>
          <h1 className="font-black text-[#00f5ff] drop-shadow-[0_0_8px_rgba(0,245,255,0.5)] font-headline tracking-widest uppercase text-xs">ESTADO: LISTO</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('dashboard')} className="text-slate-400 hover:bg-[#00f5ff]/10 p-2 rounded-full transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute w-full h-full border border-primary-container/30 rounded-full animate-pulse"></div>
          <div className="absolute w-1 h-8 bg-primary-container/60"></div>
          <div className="absolute h-1 w-8 bg-primary-container/60"></div>
          <div className="w-2 h-2 bg-primary-container rounded-full reticle-glow"></div>
          
          <div className="absolute top-16 whitespace-nowrap bg-surface-container-highest/80 backdrop-blur-md px-4 py-1 rounded-full border border-primary-container/20">
            <span className="text-[10px] font-bold text-primary-container tracking-tighter uppercase font-headline">Alinea el marcador con el objetivo</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 w-72 flex flex-col gap-4 pointer-events-auto">
          <div className="bg-surface-container-low/40 backdrop-blur-2xl p-6 rounded-xl border-l-2 border-primary-container">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-headline">Longitud Actual</span>
              <span className="material-symbols-outlined text-primary-container text-sm">straighten</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-headline font-bold text-primary">1.82</span>
              <span className="text-sm font-headline text-primary-container font-medium uppercase">metros</span>
            </div>
          </div>

          <div className="bg-surface-container-low/40 backdrop-blur-2xl p-6 rounded-xl border-l-2 border-secondary">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-headline">Superficie</span>
              <span className="material-symbols-outlined text-secondary text-sm">layers</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-headline font-bold text-secondary">3.45</span>
              <span className="text-sm font-headline text-secondary-fixed-dim font-medium uppercase">m²</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest/60 backdrop-blur-md p-4 rounded-xl border border-white/5">
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block mb-2">Logs de Telemetría</span>
            <div className="space-y-1 font-mono text-[9px] text-primary-fixed-dim/60">
              <p>&gt; INICIANDO ESCANEO LÍDAR...</p>
              <p>&gt; PLANO DETECTADO @ +0.023</p>
              <p className="text-secondary">&gt; CALIBRACIÓN ÓPTIMA</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto">
          <button className="px-5 py-2 bg-primary-container/10 backdrop-blur-xl border border-primary-container/20 rounded-full text-[11px] font-bold text-primary-container uppercase tracking-widest flex items-center gap-2 hover:bg-primary-container/20 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">radio_button_checked</span>
            Puntos
          </button>
          <button className="px-5 py-2 bg-primary-container text-on-primary-container rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.3)] cursor-pointer">
            <span className="material-symbols-outlined text-sm">linear_scale</span>
            Línea
          </button>
          <button className="px-5 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[11px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">polyline</span>
            Área
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button className="group relative flex items-center justify-center cursor-pointer">
            <div className="absolute inset-0 bg-primary-container rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative w-20 h-20 rounded-full bg-surface-container-highest border-4 border-primary-container flex items-center justify-center transition-transform active:scale-90 duration-75">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              </div>
            </div>
          </button>
        </div>
      </main>
      
      <div className="fixed inset-0 pointer-events-none border-[40px] border-surface-container-lowest/20 z-20"></div>
    </div>
  );
}
