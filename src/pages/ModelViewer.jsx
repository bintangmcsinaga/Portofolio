import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer() {
  useEffect(() => {
    // Hide scrollbar to keep the 3D viewer focused and immersive
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,101,63,0.16),transparent_22%),linear-gradient(180deg,#130934_0%,#1E104E_55%,#140A36_100%)]">
      <div className="absolute top-6 left-6 z-[60]">
        <Link 
          to="/"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#24124f]/70 p-2 px-4 text-[#E6DCF7] backdrop-blur-md transition-colors hover:border-[#FF653F]/45 hover:text-white"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>
      </div>

      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FF653F" />
        <Suspense fallback={null}>
          <Model url="/ren.glb" />
          <Environment preset="city" />
          <OrbitControls 
            autoRotate 
            autoRotateSpeed={2}
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-white/10 bg-[#24124f]/70 px-6 py-2 text-center text-sm text-[#D7C7EE] backdrop-blur-md">
        Drag to rotate. Scroll to zoom.
      </div>
    </div>
  );
}

useGLTF.preload('/ren.glb');
