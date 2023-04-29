import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Lamp = ({ setMouseHover, setLamptoggle, isMobile }) => {
  const lamp = useGLTF('./ink_bottle_quill/scene.gltf');

  const [lampHover, setLampHover] = useState(false);
  const [lampToggle, setLampToggle] = useState(false);
  const isFirstRender = useRef(true);
  const lampRef = useRef();

  // handles the stateupdate of the lammp hover
  useEffect(() => {
    setMouseHover(lampHover);
  }, [lampHover]);

  useEffect(() => {
    if (isFirstRender.current) {
      // Check if it's the initial render
      isFirstRender.current = false; // Set it to false for subsequent renders
    } else {
      setLamptoggle(lampToggle);
    }
  }, [lampToggle]);

  useFrame(({ clock }) => {
    if (lampHover) {
      const elapsedTime = clock.getElapsedTime();
      lampRef.current.rotation.x = -0.01 + Math.sin(elapsedTime * 2) * 0.1;
      lampRef.current.rotation.y = -0.2 + Math.sin(elapsedTime * 2) * 0.1;
      lampRef.current.rotation.z = -0.1 + Math.sin(elapsedTime * 2) * 0.1;
    } else {
      lampRef.current.rotation.x = -0.01;
      lampRef.current.rotation.y = -0.2;
      lampRef.current.rotation.z = -0.1;
    }
  });

  return (
    <mesh>
      {lampHover || !lampToggle ? (
        <>
          <hemisphereLight intensity={0.15} groundColor='black' />
          <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          <pointLight intensity={1} />
        </>
      ) : null}

      <primitive
        ref={lampRef}
        onClick={() => setLampToggle(!lampToggle)}
        onPointerEnter={() => {
          setLampHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          setLampHover(false);
          document.body.style.cursor = 'auto';
        }}
        object={lamp.scene}
        scale={isMobile ? 16 : 20}
        position={isMobile ? [0, -3, -2.2] : [0, -2, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
        pointerEvents
      />
    </mesh>
  );
};

const LampCanvas = ({ setMouseHover, setLamptoggle }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max- width: 500px)');

    setIsMobile(mediaQuery.matches);

    const handleMedaQuryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener('change', handleMedaQuryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMedaQuryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* This will enable the 360 degree rotation of the model */}
        {/* <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        /> */}
        <Lamp
          setMouseHover={setMouseHover}
          setLamptoggle={setLamptoggle}
          isMobile={isMobile}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default LampCanvas;
