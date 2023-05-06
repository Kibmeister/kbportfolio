import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Earth = () => {
  const earth = useGLTF('./ink_bottle_quill/scene.gltf');

  return (
    <primitive object={earth.scene} scale={7.0} position-y={-0.4} rotation-y={0} onClick={() => alert('Earth: saying YOLO') } />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      frameLoop='demand'
      gl={{ perserveDrawingBuffer: true }}
      dpr={[1, 2]}
      camera={{
        fov: 30,
        near: 0.1,
        far: 80,
        position: [-4, -60, 20],
      }}
    >
      <directionalLight intensity={1} position={[2, 2, 5]} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
