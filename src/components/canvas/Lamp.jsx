import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import * as THREE from 'three';
import { Preload, useGLTF } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

import CanvasLoader from '../Loader';
useGLTF.preload('./lamp/scene.gltf');

const Lamp = ({ setMouseHover, setLamptoggle, activeMediaQuery }) => {
  const lamp = useGLTF('./lamp/scene.gltf');

  const [lampHover, setLampHover] = useState(false);
  const [allowHover, setAllowHover] = useState(false);
  const [lampToggle, setLampToggle] = useState(false);
  const isFirstRender = useRef(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [mixer] = useState(() => new AnimationMixer());

  const lampRef = useRef();
  const { i18n } = useTranslation();

  // console.log('Lamp screen width', activeMediaQuery);

  //language hook

  // handles the stateupdate of the lammp hover
  useEffect(() => {
    setMouseHover(lampHover === true);
  }, [lampHover]);

  // hook for hover inhibitor
  useEffect(() => {
    const hoverTimeout = setTimeout(() => {
      setAllowHover(true);
    }, 500); // 4 seconds

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(hoverTimeout);
  }, []);

  // lampToggle listener
  useEffect(() => {
    // console.log('This is the animations', lamp);
    if (isFirstRender.current) {
      // Check if it's the initial render
      isFirstRender.current = false; // Set it to false for subsequent renders
    } else {
      setLamptoggle(lampToggle);
    }
  }, [lampToggle]);

  // onpageload animation
  // update isPageLoaded when page load animation is done
  // useEffect(() => {
  //   setTimeout(() => {
  //     const clip = lamp.animations[2];
  //     const action = mixer.clipAction(clip, lampRef.current);
  //     action.reset();
  //     action.setLoop(THREE.LoopOnce, 0);
  //     action.clampWhenFinished = true;
  //     action.play();

  //     setIsPageLoaded(true);
  //     // add an event listener for the 'finished' event
  //   }, 150);
  // }, [mixer, lamp, lampRef]);

  // hover animation
  useEffect(() => {
    if (lampHover === true && !lampToggle) {
      const clip = lamp.animations[2];
      const action = mixer.clipAction(clip, lampRef.current);
      action.reset();
      action.setLoop(THREE.LoopOnce, 0);
      action.clampWhenFinished = true;
      action.play();
    }
  }, [lampHover, mixer, lamp, lampRef]);

  // click animation
  // only run this effect after the page has loaded
  useEffect(() => {
    if (isPageLoaded) {
      // when the lamp is toggled off
      if (lampToggle) {
        const clip = lamp.animations[2];
        const action = mixer.clipAction(clip, lampRef.current);
        action.reset();
        action.setLoop(THREE.LoopOnce, 0);
        action.clampWhenFinished = true;
        action.play();
      }
      // when the lamp is toggled on
      if (!lampToggle) {
        const clip = lamp.animations[2];
        const action = mixer.clipAction(clip, lampRef.current);
        action.reset();
        action.setLoop(THREE.LoopOnce, 0);
        action.clampWhenFinished = true;
        action.play();
      }
    }
  }, [lampToggle]);

  useFrame((_, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });


  useEffect(() => {
    return () => {
      // Perform any necessary cleanup
      mixer?.stopAllAction(); // Example cleanup
    };
  }, [mixer]);

  const handlePointerEnter = () => {
    if (!allowHover) return; // Don't execute if hover is not allowed

    // for the cursor hover
    setLampHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    if (!allowHover) return; // Don't execute if hover is not allowed
    // for the cursor hover
    setLampHover(false);
    document.body.style.cursor = 'auto';
  };

  //  console.log('is Mobile state', activeMediaQuery === 'mobile');
  return (
    <mesh>
      {lampHover || !lampToggle ? (
        <>
          <hemisphereLight intensity={0.15} groundColor='black' />
          <spotLight
            position={[10, 50, 20]}
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
        onClick={
          activeMediaQuery === 'mobile'
            ? null
            : () => setLampToggle(!lampToggle)
        }
        onPointerEnter={
          activeMediaQuery === 'mobile' ? null : handlePointerEnter
        }
        onPointerLeave={
          activeMediaQuery === 'mobile' ? null : handlePointerLeave
        }
        object={lamp.scene}
        scale={
          activeMediaQuery === 'mobile' && i18n.language === 'fr'
            ? 4
            : activeMediaQuery === 'mobile'
            ? 6
            : activeMediaQuery === 'sm' && i18n.language === 'fr'
            ? 5
            : activeMediaQuery === 'sm'
            ? 6
            : activeMediaQuery === 'md'
            ? 6
            : activeMediaQuery === 'lg'
            ? 6.5
            : activeMediaQuery === 'xl'
            ? 6.5
            : activeMediaQuery === '2xl'
            ? 6.5
            : 6
        }
        position={
          activeMediaQuery === 'mobile' && i18n.language === 'fr'
            ? [-2.4, 1.5, -2.2]
            : activeMediaQuery === 'mobile'
            ? [-2.4, -0.6, -2.2]
            : activeMediaQuery === 'sm'
            ? [-2.4, -0.6, -2.2]
            : activeMediaQuery === 'md'
            ? [-2.4, -1.2, -2.2]
            : activeMediaQuery === 'lg'
            ? [-2.0, -3, -2.2]
            : activeMediaQuery === 'xl'
            ? [-1, -3, -1.5]
            : activeMediaQuery === '2xl'
            ? [-1.1, -3, -1.5]
            : [-1, -5, -1.5]
        }
        rotation={[-0.0, -0.5, -0.0]}
        pointerEvents
      />
    </mesh>
  );
};

const LampCanvas = ({
  setMouseHover,
  setLamptoggle,
  activeMediaQuery,

}) => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [25, 5, 20], fov: 20 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Lamp
          setMouseHover={setMouseHover}
          setLamptoggle={setLamptoggle}
          activeMediaQuery={activeMediaQuery}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default LampCanvas;
