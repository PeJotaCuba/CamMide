export default function History() {
  const measurements = [
    {
      id: 1,
      date: '24 Oct, 2023',
      time: '14:32:10 GMT-5',
      type: 'Cálculo de Área',
      icon: 'square_foot',
      result: '42.50 m²',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      date: '22 Oct, 2023',
      time: '09:15:45 GMT-5',
      type: 'Longitud de Eje',
      icon: 'straighten',
      result: '12.84 m',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      date: '21 Oct, 2023',
      time: '18:44:22 GMT-5',
      type: 'Cálculo Volumen',
      icon: 'view_in_ar',
      result: '3.20 m³',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <div className="px-6 max-w-5xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-label text-[0.7rem] uppercase tracking-[0.2em] text-primary-fixed-dim">Módulo de Telemetría</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mt-1">Historial</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="bg-surface-container-high px-5 py-2 rounded-full text-xs font-label uppercase tracking-wider text-primary border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">Todos</button>
          <button className="bg-surface-container-low px-5 py-2 rounded-full text-xs font-label uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">Área</button>
          <button className="bg-surface-container-low px-5 py-2 rounded-full text-xs font-label uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">Distancia</button>
          <button className="bg-surface-container-low px-5 py-2 rounded-full text-xs font-label uppercase tracking-wider text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">Nivel</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <button className="group relative flex items-center justify-between p-6 bg-surface-container-high rounded-xl overflow-hidden transition-all hover:ring-1 hover:ring-primary-container/50 cursor-pointer">
          <div className="z-10 text-left">
            <p className="text-[0.6rem] uppercase tracking-widest text-on-surface-variant mb-1">Generar Reporte Detallado</p>
            <p className="font-headline text-xl font-bold text-primary">Exportar a PDF</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-primary-container group-hover:scale-110 transition-transform">picture_as_pdf</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
        <button className="group relative flex items-center justify-between p-6 bg-surface-container-high rounded-xl overflow-hidden transition-all hover:ring-1 hover:ring-secondary/50 cursor-pointer">
          <div className="z-10 text-left">
            <p className="text-[0.6rem] uppercase tracking-widest text-on-surface-variant mb-1">Cálculos de Datos Crudos</p>
            <p className="font-headline text-xl font-bold text-secondary">Exportar a Excel</p>
          </div>
          <span className="material-symbols-outlined text-4xl text-secondary group-hover:scale-110 transition-transform">table_chart</span>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      <div className="space-y-4">
        {measurements.map((item) => (
          <div key={item.id} className="bg-surface-container-low rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:bg-surface-container transition-colors relative overflow-hidden">
            <div className="w-full md:w-48 h-32 rounded-lg bg-surface-container-lowest overflow-hidden flex-shrink-0 border border-white/5">
              <img alt="AR View" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" src={item.image} />
            </div>
            <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              <div>
                <p className="text-[0.65rem] uppercase tracking-tighter text-on-surface-variant mb-1 font-label">Fecha de Registro</p>
                <p className="font-medium text-sm">{item.date}</p>
                <p className="text-xs text-on-surface-variant">{item.time}</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-tighter text-on-surface-variant mb-1 font-label">Tipo de Análisis</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-secondary">{item.icon}</span>
                  <p className="font-medium text-sm">{item.type}</p>
                </div>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-tighter text-on-surface-variant mb-1 font-label">Resultado Final</p>
                <p className="font-headline text-xl font-bold text-primary-container">{item.result}</p>
              </div>
              <div className="flex flex-col md:items-end justify-center">
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                  <button className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-error transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-surface-container-high to-surface-container-lowest border border-white/5 rounded-2xl flex flex-wrap gap-12 items-center justify-around">
        <div className="text-center">
          <p className="text-[0.6rem] uppercase tracking-widest text-on-surface-variant mb-2">Total Mediciones</p>
          <p className="font-headline text-3xl font-bold">142</p>
        </div>
        <div className="w-px h-12 bg-white/10 hidden md:block"></div>
        <div className="text-center">
          <p className="text-[0.6rem] uppercase tracking-widest text-on-surface-variant mb-2">Desviación Media</p>
          <p className="font-headline text-3xl font-bold text-secondary">0.04%</p>
        </div>
        <div className="w-px h-12 bg-white/10 hidden md:block"></div>
        <div className="text-center">
          <p className="text-[0.6rem] uppercase tracking-widest text-on-surface-variant mb-2">Precisión de Sensor</p>
          <p className="font-headline text-3xl font-bold text-primary-container">ÓPTIMA</p>
        </div>
      </div>
    </div>
  );
}
