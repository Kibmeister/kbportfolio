 import React, { useEffect, useState } from 'react';
 import { Suspense } from 'react';
 import { Canvas } from '@react-three/fiber';
 import { OrbitControls, useGLTF } from '@react-three/drei';
 import { useTranslation } from 'react-i18next';

 import CanvasLoader from '../Loader';

 const Typewriter = () => {
   const { i18n } = useTranslation();

   const typewriterModelPaths = {
     en: './typewriters/typewriterEn.gltf',
     fr: './typewriters/typewriterFr.gltf',
     de: './typewriters/typewriterDe.gltf',
     it: './typewriters/typewriterIt.gltf',
     no: './typewriters/typewriterNo.gltf',
     es: './typewriters/typewriterEs.gltf',
   };

   const [typewriterModelPath, setTypewriterModelPath] = useState(
     typewriterModelPaths['en']
   );

   useEffect(() => {
     const modelPath = typewriterModelPaths[i18n.language];
     if (!modelPath) {
       console.error(
         `No typewriter model found for language: ${i18n.language}`
       );
     }
     setTypewriterModelPath(modelPath);
   }, [i18n.language]);

   const typewriterModel = useGLTF('./typewriters/typewriterEn.gltf');

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

//TODO: the fat gltf models in typewriter screws up the fluent hero section animation
const TypewriterCanvas = () => {
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
        <Typewriter />
      </Suspense>
    </Canvas>
  );
};

export default TypewriterCanvas;
