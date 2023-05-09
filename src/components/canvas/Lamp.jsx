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
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [reverseTriggered, setReverseTriggered] = useState(false);
  const [mixer] = useState(() => new AnimationMixer());
  const [currentAction, setCurrentAction] = useState(null);
  const [idleAction, setIdleAction] = useState(null);
  const [idleTriggered, setIdleTriggered] = useState(false);

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

  //idel animation 1 
  // useEffect(() => {
  //   const clip = lamp.animations[2];
  //   const action = mixer.clipAction(clip, lampRef.current);
  //   action.setLoop(THREE.LoopOnce, 0);
  //   action.clampWhenFinished = true;
  //   setIdleAction(action);
  // }, [mixer, lamp, lampRef]);

  // useEffect(() => {
  //   const firstTimeout = setTimeout(() => {
  //     if (idleAction && !idleTriggered) {
  //       idleAction.reset();
  //       idleAction.play();
  //       setIdleTriggered(true);
  //     }
  //   }, 3000); // 3 seconds after the page load

  //   const interval = setInterval(() => {
  //     if (
  //       idleAction &&
  //       !lampHover &&
  //       !animationTriggered &&
  //       !reverseTriggered
  //     ) {
  //       idleAction.reset();
  //       idleAction.play();
  //       setIdleTriggered(true);
  //     }
  //   }, 8000); // Every 8 seconds

  //   return () => {
  //     clearTimeout(firstTimeout);
  //     clearInterval(interval);
  //   };
  // }, [
  //   idleAction,
  //   idleTriggered,
  //   lampHover,
  //   animationTriggered,
  //   reverseTriggered,
  // ]);


  //welcome animation
 useEffect(() => {
  const clip = lamp.animations[0];
  const action = mixer.clipAction(clip, lampRef.current);
  action.reset();

  if (lampHover && !animationTriggered) {
    action.setLoop(THREE.LoopOnce, 0);
    action.clampWhenFinished = true;
    action.play();
    setCurrentAction(action);
    setAnimationTriggered(true);
    setReverseTriggered(false);
  } 
}, [lampHover, animationTriggered, mixer, lamp, lampRef]);
//farwell animation
useEffect(() => {
  const clip = lamp.animations[1];
  const action = mixer.clipAction(clip, lampRef.current);
  action.reset();

  if (!lampHover && !reverseTriggered) {
    action.setLoop(THREE.LoopOnce, 0);
    action.clampWhenFinished = true;
    action.time = action.getClip().duration;
    action.play();
    setCurrentAction(action);
    setReverseTriggered(true);
    setAnimationTriggered(false);
  } 
}, [lampHover, reverseTriggered, mixer, lamp, lampRef]);

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

    // for the animation
    if (!animationTriggered && !reverseTriggered) {
      setAnimationTriggered(true);
      setReverseTriggered(false);
    }
  };

  const handlePointerLeave = () => {
    // for the cursor hover
    setLampHover(false);
    document.body.style.cursor = 'auto';

    // for the lamp animation
    if (!reverseTriggered && !animationTriggered) {
      setAnimationTriggered(false);
      setReverseTriggered(true);
    }
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
        position={isMobile ? [0, -3, -2.2] : [0, -2, -1.5]}
        rotation={[-0.0, -1.2, -0.1]}
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
