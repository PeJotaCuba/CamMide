import { ViewState } from '../App';

interface DashboardProps {
  setCurrentView: (view: ViewState) => void;
}

export default function Dashboard({ setCurrentView }: DashboardProps) {
  return (
    <div className="px-6 max-w-4xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-[2px] w-8 bg-primary-container"></span>
          <span className="font-label text-[0.7rem] uppercase tracking-[0.2em] text-primary-fixed-dim">Panel de Control Avanzado</span>
        </div>
        <h1 className="font-headline text-4xl font-bold leading-none text-primary">HERRAMIENTAS DE PRECISIÓN</h1>
        <p className="text-on-surface-variant text-sm mt-4 max-w-md font-light leading-relaxed">
          Seleccione un módulo técnico para iniciar la telemetría AR. Calibración automática activa para entornos industriales.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ángulo */}
        <div className="glass-card group p-6 rounded-xl border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-primary-container/30 hud-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl">square_foot</span>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center mb-4 text-primary-container border border-primary-container/20">
              <span className="material-symbols-outlined">square_foot</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-primary-container mb-1 uppercase tracking-tight">Ángulo</h3>
            <p className="text-on-surface-variant text-xs font-label uppercase mb-4">Medición de Vértices</p>
            <p className="text-sm text-on-surface/70 leading-snug mb-6">Calcula la desviación angular entre dos superficies con margen de error de ±0.05°.</p>
          </div>
          <button onClick={() => setCurrentView('ar')} className="w-full bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container py-3 rounded-lg font-headline font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer z-10">
            INICIAR MÓDULO <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>

        {/* Volumen 3D */}
        <div className="glass-card group p-6 rounded-xl border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-secondary/30 hud-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl">view_in_ar</span>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center mb-4 text-secondary border border-secondary/20">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>view_in_ar</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-secondary mb-1 uppercase tracking-tight">Volumen 3D</h3>
            <p className="text-on-surface-variant text-xs font-label uppercase mb-4">Mapeo de Capacidad</p>
            <p className="text-sm text-on-surface/70 leading-snug mb-6">Escaneo multi-punto para estimar volúmenes complejos y cubicaje de objetos en tiempo real.</p>
          </div>
          <button onClick={() => setCurrentView('ar')} className="w-full bg-surface-container-highest hover:bg-secondary text-on-surface hover:text-on-secondary py-3 rounded-lg font-headline font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer z-10">
            INICIAR MÓDULO <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>

        {/* Nivelador */}
        <div className="glass-card group p-6 rounded-xl border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-primary-container/30 hud-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl">shutter_speed</span>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center mb-4 text-primary-container border border-primary-container/20">
              <span className="material-symbols-outlined">shutter_speed</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-primary-container mb-1 uppercase tracking-tight">Nivelador</h3>
            <p className="text-on-surface-variant text-xs font-label uppercase mb-4">Alineación de Eje</p>
            <p className="text-sm text-on-surface/70 leading-snug mb-6">Guía visual de nivelación láser con compensación de inclinación por giroscopio.</p>
          </div>
          <button onClick={() => setCurrentView('ar')} className="w-full bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container py-3 rounded-lg font-headline font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer z-10">
            INICIAR MÓDULO <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>

        {/* Distancia Láser */}
        <div className="glass-card group p-6 rounded-xl border border-white/5 flex flex-col justify-between transition-all duration-300 hover:border-primary-container/30 hud-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl">height</span>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center mb-4 text-primary-container border border-primary-container/20">
              <span className="material-symbols-outlined">height</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-primary-container mb-1 uppercase tracking-tight">Distancia Láser</h3>
            <p className="text-on-surface-variant text-xs font-label uppercase mb-4">Registro de Cota</p>
            <p className="text-sm text-on-surface/70 leading-snug mb-6">Medición lineal de alta fidelidad mediante triangulación AR de profundidad.</p>
          </div>
          <button onClick={() => setCurrentView('ar')} className="w-full bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container py-3 rounded-lg font-headline font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer z-10">
            INICIAR MÓDULO <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>
      </div>

      <section className="mt-12 bg-surface-container-low/40 rounded-2xl p-6 border border-outline-variant/10">
        <h4 className="font-label text-[0.65rem] uppercase tracking-widest text-primary-fixed-dim mb-4">Estado del Sistema</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-3 rounded-lg border border-white/5">
            <p className="text-[0.6rem] text-on-surface-variant uppercase mb-1">Calibración</p>
            <p className="font-headline text-sm text-secondary font-bold">98% OPTIMIZADO</p>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg border border-white/5">
            <p className="text-[0.6rem] text-on-surface-variant uppercase mb-1">Latencia AR</p>
            <p className="font-headline text-sm text-primary-container font-bold">12ms</p>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg border border-white/5">
            <p className="text-[0.6rem] text-on-surface-variant uppercase mb-1">Unidades</p>
            <p className="font-headline text-sm text-on-surface font-bold uppercase tracking-tighter">Métrico (mm)</p>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg border border-white/5">
            <p className="text-[0.6rem] text-on-surface-variant uppercase mb-1">Sensores</p>
            <p className="font-headline text-sm text-secondary font-bold">ACTIVOS</p>
          </div>
        </div>
      </section>

      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container/5 blur-[120px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none z-[-1]"></div>
    </div>
  );
}
