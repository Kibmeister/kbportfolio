import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import * as THREE from 'three';
import { Preload, useGLTF } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

import CanvasLoader from '../Loader';
useGLTF.preload('./lamp/scene.gltf');

const Lamp = ({
  setMouseHover,
  setLamptoggle,
  isMobile,
  isSM,
  isMD,
  isLG,
  isXL,
  is2XL,
}) => {
  const lamp = useGLTF('./lamp/scene.gltf');

  const [lampHover, setLampHover] = useState(false);
  const [lampToggle, setLampToggle] = useState(false);
  const isFirstRender = useRef(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [mixer] = useState(() => new AnimationMixer());

  const lampRef = useRef();
  const { i18n } = useTranslation();

  //language hook

  // handles the stateupdate of the lammp hover
  useEffect(() => {
    setMouseHover(lampHover === true);
  }, [lampHover]);

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
  useEffect(() => {
    const clip = lamp.animations[1];
    const action = mixer.clipAction(clip, lampRef.current);
    action.reset();
    action.setLoop(THREE.LoopOnce, 0);
    action.clampWhenFinished = true;
    action.play();

    setIsPageLoaded(true);
    // add an event listener for the 'finished' event
  }, [mixer, lamp, lampRef]);
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

  // console.log('is Mobile state', isMobile);
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
        onClick={isMobile ? null : () => setLampToggle(!lampToggle)}
        onPointerEnter={isMobile ? null : handlePointerEnter}
        onPointerLeave={isMobile ? null : handlePointerLeave}
        object={lamp.scene}
        scale={
          isMobile && i18n.language === 'fr'
            ? 4
            : isMobile
            ? 6
            : isSM
            ? 6
            : isMD
            ? 6
            : isLG
            ? 7
            : isXL
            ? 8
            : is2XL
            ? 9
            : 6
        }
        position={
          isMobile && i18n.language === 'fr'
            ? [-2.4, 1.5, -2.2]
            : isMobile
            ? [-2.4, -0.6, -2.2]
            : isSM
            ? [-2.4, -0.6, -2.2]
            : isMD
            ? [-2.4, -1.2, -2.2]
            : isLG
            ? [-2.0, -3, -2.2]
            : isXL
            ? [-1, -3, -1.5]
            : is2XL
            ? [-0.8, -4, -1.5]
            : [-1, -5, -1.5]
        }
        rotation={[-0.0, -0.5, -0.0]}
        pointerEvents
      />
    </mesh>
  );
};

const LampCanvas = ({ setMouseHover, setLamptoggle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSM, setIsSM] = useState(false);
  const [isMD, setIsMD] = useState(false);
  const [isLG, setIsLG] = useState(false);
  const [isXL, setIsXL] = useState(false);
  const [is2XL, setIs2XL] = useState(false);

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia('(max-width: 639px)');
    const mediaQuerySM = window.matchMedia(
      '(min-width: 640px) and (max-width: 767px)'
    );
    const mediaQueryMD = window.matchMedia(
      '(min-width: 768px) and (max-width: 1023px)'
    );
    const mediaQueryLG = window.matchMedia(
      '(min-width: 1024px) and (max-width: 1279px)'
    );
    const mediaQueryXL = window.matchMedia(
      '(min-width: 1280px) and (max-width: 1535px)'
    );
    const mediaQuery2XL = window.matchMedia('(min-width: 1536px)');

    const handleMediaQueryChangeMobile = (event) => setIsMobile(event.matches);
    const handleMediaQueryChangeSM = (event) => setIsSM(event.matches);
    const handleMediaQueryChangeMD = (event) => setIsMD(event.matches);
    const handleMediaQueryChangeLG = (event) => setIsLG(event.matches);
    const handleMediaQueryChangeXL = (event) => setIsXL(event.matches);
    const handleMediaQueryChange2XL = (event) => setIs2XL(event.matches);

    mediaQueryMobile.addEventListener('change', handleMediaQueryChangeMobile);
    mediaQuerySM.addEventListener('change', handleMediaQueryChangeSM);
    mediaQueryMD.addEventListener('change', handleMediaQueryChangeMD);
    mediaQueryLG.addEventListener('change', handleMediaQueryChangeLG);
    mediaQueryXL.addEventListener('change', handleMediaQueryChangeXL);
    mediaQuery2XL.addEventListener('change', handleMediaQueryChange2XL);

    handleMediaQueryChangeMobile(mediaQueryMobile);
    handleMediaQueryChangeSM(mediaQuerySM);
    handleMediaQueryChangeMD(mediaQueryMD);
    handleMediaQueryChangeLG(mediaQueryLG);
    handleMediaQueryChangeXL(mediaQueryXL);
    handleMediaQueryChange2XL(mediaQuery2XL);

    return () => {
      mediaQueryMobile.removeEventListener(
        'change',
        handleMediaQueryChangeMobile
      );
      mediaQuerySM.removeEventListener('change', handleMediaQueryChangeSM);
      mediaQueryMD.removeEventListener('change', handleMediaQueryChangeMD);
      mediaQueryLG.removeEventListener('change', handleMediaQueryChangeLG);
      mediaQueryXL.removeEventListener('change', handleMediaQueryChangeXL);
      mediaQuery2XL.removeEventListener('change', handleMediaQueryChange2XL);
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
        <Lamp
          setMouseHover={setMouseHover}
          setLamptoggle={setLamptoggle}
          isMobile={isMobile}
          isSM={isSM}
          isMD={isMD}
          isLG={isLG}
          isXL={isXL}
          is2XL={is2XL}
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default LampCanvas;
