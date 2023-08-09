import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { LampCanvas } from './canvas';
import { heroTags } from '../constants';
import { Cursor4 } from '../scripts/cursors/cursor4';
import { useTranslation } from 'react-i18next';

const getRandomRotation = () => {
  return Math.random() * 40 - 30; // Generates a random number between -30 and 30
};
const getRandomPosition = (
  lampContainerBounds,
  tagWidth = 100,
  tagHeight = 50
) => {
  let positions = [];
  const segmentWidth =
    window.innerWidth / Math.ceil(window.innerWidth / tagWidth);
  const segmentHeight =
    window.innerHeight / Math.ceil(window.innerHeight / tagHeight);

  // Creating a grid of positions across the viewport
  for (let y = segmentHeight / 2; y < window.innerHeight; y += segmentHeight) {
    for (let x = segmentWidth / 2; x < window.innerWidth; x += segmentWidth) {
      // Exclude positions inside the lampContainerBounds
      if (
        x < lampContainerBounds.left ||
        x > lampContainerBounds.right ||
        y < lampContainerBounds.top ||
        y > lampContainerBounds.bottom
      ) {
        positions.push({ x, y });
      }
    }
  }

  // Return a random position from the generated grid
  const randomIndex = Math.floor(Math.random() * positions.length);
  return positions[randomIndex];
};

const Hero = React.forwardRef(({ setLampToggleApp, activeMediaQuery }, ref) => {
  const [tags, setTags] = useState([]);
  const [lampToggle, setLampToggle] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lampHovering, setLampHovering] = useState(false);
  const [headerCaptionHeight, setHeaderCaptionRef] = useState(false);
  const [headerCaptionWidth, setHeaderCaptionWidth] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const hasAnimatedRef = useRef(false);
  const cursor4Ref = useRef(null);
  const lampContainerRef = useRef(null);
  const componentMountedRef = useRef(false);
  const headerCaptionRef = useRef(null);

  // i18n hook
  const { t, i18n } = useTranslation();

  // hook for the proxy div
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      setTimeout(() => {
        const updateDimensions = () => {
          if (headerCaptionRef.current) {
            // console.log(
            //   'divs offsetheight',
            //   headerCaptionRef.current.offsetHeight
            // );
            setHeaderCaptionRef(headerCaptionRef.current.offsetHeight);
            setHeaderCaptionWidth(headerCaptionRef.current.offsetWidth);
          }
        };
        updateDimensions();

        window.addEventListener('resize', updateDimensions);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', updateDimensions);
        };
      }, 500); // wait for 500 ms before running this block of code
    }
  }, [isInitialRender, t]);

  // header animation hook
  const useSplittingAnimation = () => {
    useLayoutEffect(() => {
      const animateTitles = (fx1Titles) => {
        fx1Titles.forEach((title) => {
          const h1Chars = title.querySelectorAll('h1 .char');
          const pChars = title.querySelectorAll('p .char');

          // Animate h1 chars
          gsap.fromTo(
            h1Chars,
            {
              'will-change': 'transform',
              opacity: 0,
              scale: 0.6,
              rotationZ: () => gsap.utils.random(-20, 20),
            },
            {
              ease: 'power4',
              opacity: 1,
              scale: 1,
              rotation: 0,
              stagger: 0.2, // Stagger value for h1
            }
          );

          // Animate p chars
          gsap.fromTo(
            pChars,
            {
              'will-change': 'transform',
              opacity: 0,
              scale: 0.6,
              rotationZ: () => gsap.utils.random(-20, 20),
            },
            {
              ease: 'power4',
              opacity: 1,
              scale: 1,
              rotation: 0,
              stagger: 0.04, // Stagger value for p (4 times faster than h1)
            }
          );
        });
      };
      const handleSplittingAnimation = () => {
        const fx1Titles = [
          ...document.querySelectorAll(
            '.content__title[data-splitting][data-effect1]'
          ),
        ];

        Splitting({ target: '#id_header, #id_subHeader', by: 'chars' });

        requestAnimationFrame(() => {
          if (fx1Titles.length !== 0 && !hasAnimatedRef.current) {
            // console.log('header animation called');
            animateTitles(fx1Titles);
            hasAnimatedRef.current = true;
          }
        });
      };
      if (document.readyState === 'complete' || componentMountedRef.current) {
        handleSplittingAnimation();
      }
    }, [lampToggle]);
  };

  useSplittingAnimation();

  // listener for lampToggle
  useEffect(() => {
    disseminateTags();

    if (lampToggle) {
      // Disable scroll when tags are visible
      window.addEventListener('scroll', handleScroll);
      cursor4Ref.current = new Cursor4(lampToggle);
      cursor4Ref.current.enableCursor();
      // cursor4Ref.current.cursor = true;
      // Reset hasAnimatedRef to false so that animation can run again
      hasAnimatedRef.current = false;
    } else {
      window.removeEventListener('scroll', handleScroll);

      if (!lampToggle && cursor4Ref.current) {
        // cursor4Ref.current.cursor = false;
        cursor4Ref.current.removeCursor();
        //cursor4Ref = null; // Or set it to some default cursor
      }
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lampToggle]);

  // listener for lampHover
  useEffect(() => {
    // console.log('The lamp is hovering : ');
    // console.log(lampHovering);
    if (cursor4Ref.current) {
      cursor4Ref.current.setHovering(isHovering, lampHovering);
    }
  }, [isHovering, lampHovering]);

  // listener for lampcontainer mount
  useLayoutEffect(() => {
    const lampContainerElement = document.querySelector('#id_lampContainer');
    if (lampContainerElement) {
      lampContainerRef.current = lampContainerElement;
      disseminateTags();
    }
  }, []);

  const handleScroll = () => {
    // Prevent scrolling when tags are visible
    window.scrollTo(0, 0);
  };

  const nonOverlappingPositions = (lampContainerBounds) => {
    const positions = [];
    const minDistance = 100; // Increased minimum distance between tags in pixels
    const numTries = 1000; // Number of attempts to find a non-overlapping position

    const positionOverlap = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < minDistance;
    };

    for (const tag of heroTags) {
      let newPos;
      let overlap;
      let tries = 0;

      do {
        overlap = false;
        newPos = getRandomPosition(lampContainerBounds);

        // Check if new position overlaps with any previous position
        for (const pos of positions) {
          if (positionOverlap(newPos, pos)) {
            overlap = true;
            break;
          }
        }
        tries++;
      } while ((overlap || !lampContainerBounds) && tries < numTries);

      positions.push(newPos);
    }

    return positions;
  };

  const disseminateTags = () => {
    setTimeout(() => {
      if (lampContainerRef.current) {
        const lampContainer = document.querySelector('#id_lampContainer');
        const lampContainerBounds = lampContainer.getBoundingClientRect();
        const { left, top, width, height } = lampContainerBounds;

        const positions = nonOverlappingPositions(lampContainerBounds);

        const transformedTags = t('herotags', {
          returnObjects: true,
        }).map((tag, index) => {
          const { x, y } = positions[index];

          const adjustedX = Math.floor(x);
          const adjustedY = Math.floor(y);

          const rotation = getRandomRotation();
          return { ...tag, x: adjustedX, y: adjustedY, rotation };
        });
        setTags(transformedTags);
      }
    }, 100);
  };

  // 1. Set the background color to dark, 70% opaque
  // 2. Disseminate the thoughts tags throughout the hero section
  const lampPress = () => {
    console.log(' Hero.jsx lampPress called ', lampToggle);
    setLampToggle(!lampToggle); // Toggle tags visibility
    setLampToggleApp(); // propagate the toggle to parent component
  };

  return (
    //   mx:auto relative
    <section ref={ref} id='hero' className='w-full h-screen mx:auto relative '>
      {/* container for the svg cursor */}
      <div id='id_cursorcontainer'></div>
      {/* div for the heroTag dissemination */}
      <div id={'id_disseminate'} className={'tags absolute inset-0'}>
        <AnimatePresence>
          {lampToggle &&
            tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='tag'
                style={{
                  position: 'absolute',
                  left: `${tag.x}px`,
                  top: `${tag.y}px`,
                  transform: `rotate(${tag.rotation}deg)`,
                  zIndex: 10,
                }}
              >
                <button
                  className='bg-transparent border-none outline-none p-0'
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <p className='sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl garet-book'>
                    {tag.term}
                  </p>
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      {/* wrapper div for the hero heading and the lamp canvas */}
      <div
        className={`${styles.paddingX} absolute max-w-7xl mx-auto flex mobile:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row items-start gap-5 inset-0 mobile:top-[80px] top-[120px]`}
      >
        {/* container for the herotext/subtext */}
        <div className='flex flex-col justify-center items-start flex-shrink-0  mobile:min-w-[200px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[700px] 2xl:min-w-[700px] h-auto relative'>
          {lampToggle ? (
            <div
              id='id_proxydiv'
              style={{
                minHeight: `${headerCaptionHeight}px`,
                minWidth: `${headerCaptionWidth}px`,
              }}
              className='content__title inset-0 top-0 left-0'
            >
              {/* content of id_proxydiv */}
            </div>
          ) : (
            <div
              ref={headerCaptionRef}
              id='id_headerContainer'
              className={`content__title relative sm:inset-auto sm:w-full md:min-w-[700px] mobile:min-w-[200px] sm:min-w-[600px] lg:min-w-[700px] xl:min-w-[700px] 2xl:min-w-[700px] max-w-[700px]`}
              data-splitting
              data-effect1
            >
              <h1 id={'id_header'} className={`${styles.heroHeadText} `}>
                {t('hero.header')}
              </h1>
              <div data-splitting data-effect1>
                <p
                  id={'id_subHeader'}
                  className={`${styles.heroSubText} sm:text-sm sm:leading-normal md:text-lg mobile:max-w-[80vw] sm:max-w-[80vw] md:max-w-[80vw] lg:max-w-[50vw]`}
                >
                  {t('hero.subHeader')}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* container for the lamp canvas */}
        <div
          ref={lampContainerRef}
          id='id_lampContainer'
          className='lampContainer w-full h-full '
        >
          <LampCanvas
            setLamptoggle={(press) => lampPress(press)}
            setMouseHover={(hovering) => setLampHovering(hovering)}
            activeMediaQuery={activeMediaQuery}
          />
        </div>
        {/* interactive lamp object  */}
      </div>
      {/* The little knob that transitions the website down to the about section */}
      {!lampToggle ? (
        <div
          className={`absolute ${
            i18n.language === 'en' && activeMediaQuery === 'mobile'
            ? 'bottom-20'
            : i18n.language === 'no' && activeMediaQuery === 'mobile'
            ? 'bottom-20'
            : i18n.language === 'es' && activeMediaQuery === 'mobile'
            ? 'bottom-20'
            : i18n.language === 'it' && activeMediaQuery === 'mobile'
            ? 'bottom-20'
            : i18n.language === 'fr' && activeMediaQuery === 'mobile'
            ? 'bottom-8'
            : i18n.language === 'de' && activeMediaQuery === 'mobile'
            ? 'bottom-20'
            : 'bottom-10'
          } w-full z-[1] flex justify-center items-center`}
        >
          <a href='#about'>
            <div
              className={` mobile:w-[26px] mobile:h-[42px] w-[35px] h-[64px] mobile:rounded-3xl rounded-3xl mobile:border-2.5 border-4 border-tertiary flex justify-center items-start mobile:p-1 p-2
              
          `}
            >
              <motion.div
                animate={{
                  y: activeMediaQuery === 'mobile' ? [0, 16, 0] : [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className={` mobile:w-2 mobile:h-2 w-3 h-3 rounded-full bg-tertiary mb-1 `}
              />
            </div>
          </a>
        </div>
      ) : (
        ''
      )}
    </section>
  );
});

export default Hero;
