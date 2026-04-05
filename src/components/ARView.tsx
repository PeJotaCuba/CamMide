import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

type Mode = 'distance' | 'area';

export default function ARView() {
  const [mode, setMode] = useState<Mode>('distance');
  const [pointsCount, setPointsCount] = useState<number>(0);
  const [measurement, setMeasurement] = useState<number>(0);
  const [xrSupported, setXrSupported] = useState<boolean | null>(null);
  const [isARActive, setIsARActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const reticleRef = useRef<THREE.Mesh | null>(null);
  const pointsRef = useRef<THREE.Vector3[]>([]);
  const lineRef = useRef<THREE.Line | null>(null);

  const [fallbackPoints, setFallbackPoints] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    if ('xr' in navigator) {
      (navigator as any).xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setXrSupported(supported);
      });
    } else {
      setXrSupported(false);
    }
  }, []);

  useEffect(() => {
    if (xrSupported !== true || !containerRef.current || !uiRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    const reticleGeometry = new THREE.RingGeometry(0.05, 0.06, 32).rotateX(-Math.PI / 2);
    const reticleMaterial = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);
    reticleRef.current = reticle;

    const button = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay'],
      domOverlay: { root: uiRef.current }
    });
    button.style.position = 'absolute';
    button.style.bottom = '120px';
    button.style.left = '50%';
    button.style.transform = 'translateX(-50%)';
    button.style.zIndex = '999';
    button.style.backgroundColor = '#00f5ff';
    button.style.color = '#000';
    button.style.fontWeight = 'bold';
    button.style.padding = '12px 24px';
    button.style.borderRadius = '8px';
    containerRef.current.appendChild(button);

    let hitTestSource: any = null;
    let hitTestSourceRequested = false;

    renderer.xr.addEventListener('sessionstart', () => setIsARActive(true));
    renderer.xr.addEventListener('sessionend', () => {
      setIsARActive(false);
      hitTestSourceRequested = false;
      hitTestSource = null;
    });

    renderer.setAnimationLoop((timestamp, frame) => {
      if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (hitTestSourceRequested === false) {
          session.requestReferenceSpace('viewer').then((refSpace) => {
            session.requestHitTestSource({ space: refSpace })?.then((source) => {
              hitTestSource = source;
            });
          });
          session.addEventListener('end', () => {
            hitTestSourceRequested = false;
            hitTestSource = null;
          });
          hitTestSourceRequested = true;
        }

        if (hitTestSource && referenceSpace) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);
          if (hitTestResults.length > 0 && reticleRef.current) {
            const hit = hitTestResults[0];
            const pose = hit.getPose(referenceSpace);
            if (pose) {
              reticleRef.current.visible = true;
              reticleRef.current.matrix.fromArray(pose.transform.matrix);
            }
          } else if (reticleRef.current) {
            reticleRef.current.visible = false;
          }
        }
      }
      renderer.render(scene, camera);
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.setAnimationLoop(null);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    };
  }, [xrSupported]);

  useEffect(() => {
    if (xrSupported === false) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Camera error:", err));
    }
  }, [xrSupported]);

  const handleReset = () => {
    pointsRef.current = [];
    if (sceneRef.current && lineRef.current) {
      sceneRef.current.remove(lineRef.current);
      lineRef.current = null;
    }
    setFallbackPoints([]);
    setPointsCount(0);
    setMeasurement(0);
  };

  useEffect(() => { handleReset(); }, [mode]);

  const updateMeasurements = () => {
    const pts = pointsRef.current;
    if (mode === 'distance') {
      let dist = 0;
      for (let i = 0; i < pts.length - 1; i++) dist += pts[i].distanceTo(pts[i+1]);
      setMeasurement(dist);
    } else {
      if (pts.length < 3) { setMeasurement(0); return; }
      let area = 0;
      const p0 = pts[0];
      const v1 = new THREE.Vector3();
      const v2 = new THREE.Vector3();
      const cross = new THREE.Vector3();
      for (let i = 1; i < pts.length - 1; i++) {
        v1.subVectors(pts[i], p0);
        v2.subVectors(pts[i+1], p0);
        cross.crossVectors(v1, v2);
        area += cross.length() * 0.5;
      }
      setMeasurement(area);
    }
  };

  const handleAddPoint = () => {
    if (xrSupported === false) return;
    if (reticleRef.current && reticleRef.current.visible) {
      const newPoint = new THREE.Vector3().setFromMatrixPosition(reticleRef.current.matrix);
      pointsRef.current.push(newPoint);

      if (sceneRef.current) {
        if (lineRef.current) sceneRef.current.remove(lineRef.current);
        const geometry = new THREE.BufferGeometry().setFromPoints(
          mode === 'area' && pointsRef.current.length > 2 ? [...pointsRef.current, pointsRef.current[0]] : pointsRef.current
        );
        const material = new THREE.LineBasicMaterial({ color: 0x00f5ff, linewidth: 3 });
        const line = new THREE.Line(geometry, material);
        lineRef.current = line;
        sceneRef.current.add(line);
      }
      setPointsCount(pointsRef.current.length);
      updateMeasurements();
    }
  };

  const handleFallbackClick = (e: React.MouseEvent) => {
    if (xrSupported !== false) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...fallbackPoints, {x, y}];
    setFallbackPoints(newPoints);

    if (mode === 'distance') {
      let dist = 0;
      for (let i = 0; i < newPoints.length - 1; i++) {
        const dx = newPoints[i+1].x - newPoints[i].x;
        const dy = newPoints[i+1].y - newPoints[i].y;
        dist += Math.sqrt(dx*dx + dy*dy) * 0.01; 
      }
      setMeasurement(dist);
    } else {
      if (newPoints.length < 3) { setMeasurement(0); return; }
      let area = 0;
      const p0 = newPoints[0];
      for (let i = 1; i < newPoints.length - 1; i++) {
        const p1 = newPoints[i];
        const p2 = newPoints[i+1];
        area += Math.abs((p1.x - p0.x)*(p2.y - p0.y) - (p2.x - p0.x)*(p1.y - p0.y)) / 2;
      }
      setMeasurement(area * 0.0001);
    }
    setPointsCount(newPoints.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      {xrSupported === false && (
        <div className="absolute inset-0 z-0 cursor-crosshair" onClick={handleFallbackClick}>
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {fallbackPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="8" fill="#00f5ff" stroke="#fff" strokeWidth="2" />
            ))}
            {fallbackPoints.length > 1 && (
              <polyline
                points={(mode === 'area' && fallbackPoints.length > 2 ? [...fallbackPoints, fallbackPoints[0]] : fallbackPoints).map(p => `${p.x},${p.y}`).join(' ')}
                fill={mode === 'area' ? 'rgba(0,245,255,0.2)' : 'none'}
                stroke="#00f5ff"
                strokeWidth="4"
                strokeDasharray="8 4"
              />
            )}
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black/70 backdrop-blur-md p-6 rounded-2xl text-center pointer-events-none border border-white/10 shadow-2xl">
            <span className="material-symbols-outlined text-4xl text-error mb-2">warning</span>
            <p className="font-bold mb-2">WebXR no soportado</p>
            <p className="text-sm text-gray-300 max-w-xs">Estás en modo simulación 2D. Toca la pantalla para medir sobre la imagen de la cámara. Para AR real, usa Chrome en Android.</p>
          </div>
        </div>
      )}
      {xrSupported === true && !isARActive && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface-container-lowest pointer-events-none">
          <span className="material-symbols-outlined text-6xl text-primary-container mb-4 animate-bounce">view_in_ar</span>
          <h2 className="text-2xl font-headline text-white mb-2 font-bold">AR Precision Measure</h2>
          <p className="text-gray-400 mb-8 text-center max-w-sm px-6">Apunta tu cámara al suelo y mueve el dispositivo lentamente para calibrar.</p>
        </div>
      )}
      <div ref={uiRef} className="absolute inset-0 pointer-events-none flex flex-col" style={{ display: (xrSupported === false || isARActive) ? 'flex' : 'none' }}>
        <header className="relative z-50 flex justify-between items-center px-6 py-6 w-full bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container">view_in_ar</span>
            <h1 className="font-black text-primary-container drop-shadow-[0_0_8px_rgba(0,245,255,0.5)] font-headline tracking-widest uppercase text-sm">AR Measure</h1>
          </div>
          <button onClick={handleReset} className="text-white hover:text-error hover:bg-error/20 p-3 rounded-full transition-all bg-black/40 backdrop-blur-md border border-white/10 cursor-pointer pointer-events-auto" title="Reiniciar medición">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </header>
        <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-center">
          <div className="absolute top-4 flex flex-col items-center pointer-events-auto">
            <div className="bg-surface-container-low/80 backdrop-blur-2xl px-8 py-4 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-headline mb-1">{mode === 'distance' ? 'Distancia Total' : 'Superficie Total'}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-headline font-bold text-white drop-shadow-lg">{measurement === 0 ? "0.00" : measurement.toFixed(2)}</span>
                <span className="text-lg font-headline text-primary-container font-medium uppercase">{mode === 'distance' ? 'm' : 'm²'}</span>
              </div>
              <div className="mt-2 text-xs text-on-surface-variant font-mono">Puntos anclados: {pointsCount}</div>
            </div>
          </div>
          {xrSupported && isARActive && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 whitespace-nowrap bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary-container/30">
              <span className="text-[11px] font-bold text-primary-container tracking-wider uppercase font-headline">Apunta y añade un punto</span>
            </div>
          )}
        </main>
        <div className="relative z-50 w-full pb-8 pt-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center gap-6">
          <div className="flex bg-black/60 backdrop-blur-xl p-1.5 rounded-full border border-white/10 pointer-events-auto">
            <button onClick={() => setMode('distance')} className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${mode === 'distance' ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(0,245,255,0.4)]' : 'text-on-surface-variant hover:text-white'}`}>
              <span className="material-symbols-outlined text-sm">straighten</span>Distancia
            </button>
            <button onClick={() => setMode('area')} className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${mode === 'area' ? 'bg-secondary text-on-secondary shadow-[0_0_15px_rgba(167,255,179,0.4)]' : 'text-on-surface-variant hover:text-white'}`}>
              <span className="material-symbols-outlined text-sm">layers</span>Área
            </button>
          </div>
          {xrSupported && isARActive && (
            <button onClick={handleAddPoint} className="group relative flex items-center justify-center cursor-pointer pointer-events-auto mb-4">
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center transition-transform active:scale-90 duration-75">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-black text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
