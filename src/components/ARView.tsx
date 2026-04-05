import { useState } from 'react';

type Mode = 'distance' | 'area';

export default function ARView() {
  const [mode, setMode] = useState<Mode>('distance');
  const [points, setPoints] = useState<number>(0);
  const [measurement, setMeasurement] = useState<number>(0);

  const handleAddPoint = () => {
    setPoints(p => p + 1);
    if (mode === 'distance') {
      // Simula la adición de una distancia (ej. 10cm a 50cm)
      setMeasurement(prev => prev + (Math.random() * 0.4 + 0.1));
    } else {
      // Simula la adición de área si hay más de 2 puntos
      if (points >= 2) {
        setMeasurement(prev => prev + (Math.random() * 1.5 + 0.5));
      }
    }
  };

  const handleReset = () => {
    setPoints(0);
    setMeasurement(0);
  };

  const formatMeasurement = (val: number) => {
    if (val === 0) return "0.00";
    return val.toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col">
      {/* Fondo de cámara simulado */}
      <div className="absolute inset-0 z-0 ar-view-canvas">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-surface-container-lowest/60"></div>
        <div className="absolute inset-0 hud-scanline opacity-20 pointer-events-none"></div>
      </div>

      {/* Barra Superior */}
      <header className="relative z-50 flex justify-between items-center px-6 py-6 w-full bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-container">view_in_ar</span>
          <h1 className="font-black text-primary-container drop-shadow-[0_0_8px_rgba(0,245,255,0.5)] font-headline tracking-widest uppercase text-sm">
            AR Measure
          </h1>
        </div>
        <button 
          onClick={handleReset}
          className="text-white hover:text-error hover:bg-error/20 p-3 rounded-full transition-all bg-black/40 backdrop-blur-md border border-white/10 cursor-pointer"
          title="Reiniciar medición"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </header>

      {/* Área Central (Retícula y Datos) */}
      <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* Tarjeta de Medición Flotante */}
        <div className="absolute top-10 flex flex-col items-center pointer-events-auto">
          <div className="bg-surface-container-low/60 backdrop-blur-2xl px-8 py-4 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-headline mb-1">
              {mode === 'distance' ? 'Distancia Total' : 'Superficie Total'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-headline font-bold text-white drop-shadow-lg">
                {formatMeasurement(measurement)}
              </span>
              <span className="text-lg font-headline text-primary-container font-medium uppercase">
                {mode === 'distance' ? 'm' : 'm²'}
              </span>
            </div>
            <div className="mt-2 text-xs text-on-surface-variant font-mono">
              Puntos anclados: {points}
            </div>
          </div>
        </div>

        {/* Retícula Central */}
        <div className="relative w-24 h-24 flex items-center justify-center mt-20">
          <div className="absolute w-full h-full border-2 border-primary-container/40 rounded-full animate-pulse"></div>
          <div className="absolute w-1 h-6 bg-primary-container/80"></div>
          <div className="absolute h-1 w-6 bg-primary-container/80"></div>
          <div className="w-2 h-2 bg-primary-container rounded-full reticle-glow"></div>
          
          <div className="absolute top-16 whitespace-nowrap bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary-container/30">
            <span className="text-[11px] font-bold text-primary-container tracking-wider uppercase font-headline">
              Apunta y añade un punto
            </span>
          </div>
        </div>
      </main>

      {/* Controles Inferiores */}
      <div className="relative z-50 w-full pb-10 pt-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-8">
        
        {/* Selector de Modo */}
        <div className="flex bg-black/50 backdrop-blur-xl p-1.5 rounded-full border border-white/10 pointer-events-auto">
          <button 
            onClick={() => { setMode('distance'); handleReset(); }}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
              mode === 'distance' 
                ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(0,245,255,0.4)]' 
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">straighten</span>
            Distancia
          </button>
          <button 
            onClick={() => { setMode('area'); handleReset(); }}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
              mode === 'area' 
                ? 'bg-secondary text-on-secondary shadow-[0_0_15px_rgba(167,255,179,0.4)]' 
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">layers</span>
            Área
          </button>
        </div>

        {/* Botón Principal de Acción */}
        <button 
          onClick={handleAddPoint}
          className="group relative flex items-center justify-center cursor-pointer pointer-events-auto"
        >
          <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border-4 border-white flex items-center justify-center transition-transform active:scale-90 duration-75">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-black text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
            </div>
          </div>
        </button>

      </div>
    </div>
  );
}
