import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei';
import { ErrorBoundary } from '../common/ErrorBoundary';

const LiquidSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#a8c7fa"
          attach="material"
          distort={0.5} // Amount of distortion
          speed={2} // Animation speed
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

export const LiquidBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800">
      <ErrorBoundary fallback={
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-slate-700 animate-pulse-slow"></div>
      }>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#ff0000" />
          <Environment preset="studio" />
          <LiquidSphere />
        </Canvas>
      </ErrorBoundary>
      
      {/* Overlay noise texture for more realism */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};
