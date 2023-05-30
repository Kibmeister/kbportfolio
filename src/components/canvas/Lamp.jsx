import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import * as THREE from 'three';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Lamp = ({ setMouseHover, setLamptoggle, isMobile }) => {
  const lamp = useGLTF('./lamp/scene.gltf');

  const [lampHover, setLampHover] = useState(false);
  const [lampToggle, setLampToggle] = useState(false);
  const isFirstRender = useRef(true);
  const [mixer] = useState(() => new AnimationMixer());
  const [currentAction, setCurrentAction] = useState(null);

  const lampRef = useRef();

  // handles the stateupdate of the lammp hover
  useEffect(() => {
    setMouseHover(lampHover);
  }, [lampHover]);

  // lampToggle listener
  useEffect(() => {
    if (isFirstRender.current) {
      // Check if it's the initial render
      isFirstRender.current = false; // Set it to false for subsequent renders
    } else {
      setLamptoggle(lampToggle);
    }
  }, [lampToggle]);
 
  //hover animation
  useEffect(() => {
    if (!lampToggle) {
      const clip = lamp.animations[0];
      // console.log(' this is the lamp object');
      // console.log(lamp);
      const action = mixer.clipAction(clip, lampRef.current);
      action.reset();

      action.setLoop(THREE.LoopOnce, 0);
      action.clampWhenFinished = true;
      action.play();
      setCurrentAction(action);
    }
  }, [lampHover, mixer, lamp, lampRef]);

  // click animation
  useEffect(() => {
    if (lampToggle) {
      const clip = lamp.animations[0]; // the animation to play when the lamp is clicked
      const action = mixer.clipAction(clip, lampRef.current);
      action.reset();

      action.setLoop(THREE.LoopOnce, 0);
      action.clampWhenFinished = true;
      action.play();
      setCurrentAction(action);
    }
  }, [lampToggle, mixer, lamp, lampRef]);

  useFrame((_, delta) => {
    if (currentAction && !lampHover) {
      currentAction.time -= delta;
    }
    mixer.update(delta);
  });

  const handlePointerEnter = () => {
    // for the cursor hover
    setLampHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    // for the cursor hover
    setLampHover(false);
    document.body.style.cursor = 'auto';
  };

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
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        object={lamp.scene}
        scale={isMobile ? 2 : 8}
        position={isMobile ? [0, -3, -2.2] : [0, -4, -1.5]}
        rotation={[-0.0, -0.5, -0.0]}
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
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [25, 5, 20], fov: 20 }}
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
