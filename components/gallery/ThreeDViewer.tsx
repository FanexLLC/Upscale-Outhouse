'use client';

import { useEffect, useState, type ComponentType } from 'react';

// Lazy-load the entire Three.js scene to avoid module evaluation issues
// with @react-three/fiber under Next.js 16 Turbopack
function ThreeDScene({ reducedMotion }: { reducedMotion: boolean }) {
  const [SceneComponent, setSceneComponent] = useState<ComponentType<{ reducedMotion: boolean }> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadScene() {
      try {
        const [
          { Canvas, useFrame },
          { OrbitControls, Environment, useGLTF, Center },
        ] = await Promise.all([
          import('@react-three/fiber'),
          import('@react-three/drei'),
        ]);

        if (cancelled) return;

        // Preload the model
        useGLTF.preload('/upscale-outhouse.glb');

        function TrailerModel({ reducedMotion: rm }: { reducedMotion: boolean }) {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { useRef: useRefHook } = require('react');
          const ref = useRefHook(null);
          const { scene } = useGLTF('/upscale-outhouse.glb');

          useFrame(() => {
            if (ref.current && !rm) {
              ref.current.rotation.y += 0.003;
            }
          });

          return (
            <Center>
              <group ref={ref}>
                <primitive object={scene} />
              </group>
            </Center>
          );
        }

        function LoadedScene({ reducedMotion: rm }: { reducedMotion: boolean }) {
          return (
            <Canvas
              camera={{ position: [5, 3, 8], fov: 45 }}
              dpr={[1, 1.5]}
              frameloop="always"
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[5, 5, 5]} intensity={0.8} color="#C9A84C" />
              <pointLight position={[-5, 3, -5]} intensity={0.3} />
              <TrailerModel reducedMotion={rm} />
              <OrbitControls
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                minDistance={4}
                maxDistance={20}
                enablePan={false}
              />
              <Environment preset="night" />
            </Canvas>
          );
        }

        if (!cancelled) {
          setSceneComponent(() => LoadedScene);
        }
      } catch (err) {
        console.error('Failed to load 3D viewer:', err);
        if (!cancelled) setError(true);
      }
    }

    loadScene();
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <div className="aspect-video max-w-4xl mx-auto rounded-card bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <p className="text-gold-primary font-display text-h4">3D Preview</p>
          <p className="text-text-muted text-sm mt-2">
            3D viewer could not load. Please try a different browser or schedule an in-person tour.
          </p>
        </div>
      </div>
    );
  }

  if (!SceneComponent) {
    return (
      <div className="aspect-video max-w-4xl mx-auto rounded-card bg-bg-secondary flex items-center justify-center">
        <div className="text-gold-primary animate-pulse">Loading 3D viewer...</div>
      </div>
    );
  }

  return <SceneComponent reducedMotion={reducedMotion} />;
}

export default function ThreeDViewer() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div>
      <div className="aspect-video max-w-4xl mx-auto rounded-card overflow-hidden bg-bg-secondary relative">
        {mounted ? (
          <ThreeDScene reducedMotion={reducedMotion} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gold-primary animate-pulse">Loading 3D viewer...</div>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-gold-primary/20 text-gold-primary text-xs uppercase tracking-widest px-3 py-1 rounded-full">
          3D Preview
        </div>
      </div>
      <p className="text-text-muted text-sm text-center mt-2">
        Drag to rotate &bull; Scroll to zoom
      </p>
    </div>
  );
}
