import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const InkQuill = () => {
  const earth = useGLTF('./ink_bottle_quill/scene.gltf');

  return (
    <primitive
      object={earth.scene}
      scale={7.0}
      position-y={-0.4}
      rotation-y={0}
    />
  );
};

const InkQuillCanvas = () => {
  return (
    <Canvas
      frameLoop='demand'
      gl={{ perserveDrawingBuffer: true }}
      dpr={[1, 2]}
      camera={{
        fov: 1.8,
        near: 0.1,
        far: 80,
        position: [-4, -60, 20],
      }}
    >
      <directionalLight intensity={1} position={[-20, 50, 10]} />
      <ambientLight intensity={1} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <InkQuill />
      </Suspense>
    </Canvas>
  );
};

export default InkQuillCanvas;
