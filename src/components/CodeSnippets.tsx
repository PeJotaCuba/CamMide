export default function CodeSnippets() {
  const codeDistance = `// Cálculo de distancia Euclidiana entre dos anclas (Anchors) en ARCore
fun calculateDistance(anchor1: Anchor, anchor2: Anchor): Float {
    val pose1 = anchor1.pose
    val pose2 = anchor2.pose
    val dx = pose1.tx() - pose2.tx()
    val dy = pose1.ty() - pose2.ty()
    val dz = pose1.tz() - pose2.tz()
    return Math.sqrt((dx * dx + dy * dy + dz * dz).toDouble()).toFloat()
}`;

  const codeArea = `// Cálculo de área de un polígono irregular (N-ángulo) en 2D
fun calculatePolygonArea(nodes: List<Anchor>): Float {
    if (nodes.size < 3) return 0f
    var area = 0f
    var j = nodes.size - 1
    for (i in nodes.indices) {
        val p1 = nodes[i].pose
        val p2 = nodes[j].pose
        area += (p2.tx() + p1.tx()) * (p2.tz() - p1.tz())
        j = i
    }
    return Math.abs(area / 2.0f)
}`;

  const codeHeight = `// Medición de estatura (Distancia vertical desde el plano del suelo)
fun calculateHeight(floorPlane: Plane, headHitResult: HitResult): Float {
    val headPose = headHitResult.hitPose
    // Obtener la distancia desde el punto de la cabeza hasta el plano del suelo
    val distance = floorPlane.distanceToPoint(headPose.translation)
    return distance
}`;

  return (
    <div className="px-6 max-w-4xl mx-auto">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-[2px] w-8 bg-primary-container"></span>
          <span className="font-label text-[0.7rem] uppercase tracking-[0.2em] text-primary-fixed-dim">Implementación Técnica</span>
        </div>
        <h1 className="font-headline text-4xl font-bold leading-none text-primary">CÓDIGO ARCORE</h1>
        <p className="text-on-surface-variant text-sm mt-4 max-w-2xl font-light leading-relaxed">
          Fragmentos de código en Kotlin para la implementación de la lógica de medición utilizando la API de Google ARCore.
        </p>
      </header>

      <div className="space-y-8">
        <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
          <div className="bg-surface-container-high px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-sm">code</span>
            <span className="font-headline text-sm font-bold text-on-surface">Distancia Lineal (3D)</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-primary-fixed-dim/90">
              <code>{codeDistance}</code>
            </pre>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
          <div className="bg-surface-container-high px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-sm">polyline</span>
            <span className="font-headline text-sm font-bold text-on-surface">Cálculo de Área (Polígono)</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-secondary-fixed-dim/90">
              <code>{codeArea}</code>
            </pre>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
          <div className="bg-surface-container-high px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a7ffb3] text-sm">height</span>
            <span className="font-headline text-sm font-bold text-on-surface">Medición de Estatura</span>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-[#a7ffb3]/90">
              <code>{codeHeight}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
