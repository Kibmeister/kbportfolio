import React, { useEffect, useState, useRef } from 'react';
import { Suspense } from 'react';
import { AnimationMixer } from 'three';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Preload } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

import CanvasLoader from '../Loader';

const Typewriter = ({ mailStatus }) => {
  const { i18n } = useTranslation();
  const [mixer] = useState(() => new AnimationMixer());
  const [receivedMailStatus, setReceivedMailStatus] = useState(false);

  const typewriterRef = useRef();

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

  const { scene, animations } = useGLTF(typewriterModelPath);

  //hook for settting internal state
  useEffect(() => {
    console.log('mailstatus promt received', mailStatus);
    setReceivedMailStatus(mailStatus);
  }, [mailStatus]);

  // i18n hook
  useEffect(() => {
    const modelPath = typewriterModelPaths[i18n.language];
    if (!modelPath) {
      console.error(`No typewriter model found for language: ${i18n.language}`);
    }
    setTypewriterModelPath(modelPath);
  }, [i18n.language]);

  // //mail sent hook
  useEffect(() => {
    console.log('Animations', animations);
    if (receivedMailStatus) {
      console.log('The typewriter animation runs');
      const action = mixer.clipAction(animations[0], typewriterRef.current);
      action.reset();
      action.setLoop(THREE.LoopOnce, 0);
      action.clampWhenFinished = true;
      action.play();
    }
  }, [scene, receivedMailStatus]);

  useFrame((_, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    scene && (
      <primitive
        ref={typewriterRef}
        object={scene}
        scale={1.2}
        position-y={-0.4}
        rotation={[0, 4.7, 0]}
      />
    )
  );
};

//TODO: the fat gltf models in typewriter screws up the fluent hero section animation
const TypewriterCanvas = ({ mailStatus }) => {
  return (
    <Canvas
      frameLoop='demand'
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
      camera={{
        fov: 1.5,
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
          enablePan={false}
          enableRotate={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
        />
        <Typewriter mailStatus={mailStatus} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default TypewriterCanvas;
