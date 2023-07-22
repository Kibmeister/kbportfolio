import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

import CanvasLoader from '../Loader';

const InkQuill = () => {
  const { i18n } = useTranslation();
  const [typewriterModel, setTypewriterModel] = useState(null);

  // Preload all typewriter GLTF models
  const typewriterModels = {
    en: useGLTF('./typewriters/typewriterEn.gltf'),
    fr: useGLTF('./typewriters/typewriterFr.gltf'),
    de: useGLTF('./typewriters/typewriterDe.gltf'),
    it: useGLTF('./typewriters/typewriterIt.gltf'),
    no: useGLTF('./typewriters/typewriterNo.gltf'),
    es: useGLTF('./typewriters/typewriterEs.gltf'),
    // Add other models as needed
  };

  useEffect(() => {
    const model = typewriterModels[i18n.language];
    if (!model) {
      console.error(`No typewriter model found for language: ${i18n.language}`);
    }
    setTypewriterModel(model);
  }, [i18n.language]);

  return (
    typewriterModel && (
      <primitive
        object={typewriterModel.scene}
        scale={1.2}
        position-y={-0.4}
        rotation={[0, 4.7, 0]}
      />
    )
  );
};

const InkQuillCanvas = () => {
  return (
    <Canvas
      frameLoop='demand'
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
      camera={{
        fov: 1.8,
        near: 0.1,
        far: 80,
        position: [50, 55, 25],
      }}
    >
      <directionalLight intensity={1} position={[-20, 50, 10]} />
      <ambientLight intensity={1} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
        />
        <InkQuill />
      </Suspense>
    </Canvas>
  );
};

export default InkQuillCanvas;
