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

const Hero = React.forwardRef(({ setLampToggleApp }, ref) => {
  const [tags, setTags] = useState([]);
  const [lampToggle, setLampToggle] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lampHovering, setLampHovering] = useState(false);
  const [header, setHeader] = useState("Hello, I'm Kasper");
  const [subHeader, setsubHeader] = useState(
    "I'm an interaction designer specialized in UI and UX design. My works are interdisciplinary in form and expression."
  );
  const cursor4Ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const lampContainerRef = useRef(null);

  // i18n hook
  const { t } = useTranslation();

  // listener for the t language updater
  useEffect(() => {
    setHeader(t('hero.header'));
    setsubHeader(t('hero.subHeader'));
    setShouldAnimate(true); // Trigger animation when language changes
  }, [t]);

  // header animation hook
  const useSplittingAnimation = () => {
    useEffect(() => {
      const animateTitles = (fx1Titles) => {
        fx1Titles.forEach((title) => {
          const h1Chars = title.querySelectorAll('h1 .char');
          const pChars = title.querySelectorAll('p .char');

          // Set visibility to visible when the animation starts
          title.querySelector('h1').style.visibility = 'visible';
          title.querySelector('p').style.visibility = 'visible';

          // Animate h1 chars
          gsap.fromTo(
            h1Chars,
            {
              'will-change': 'opacity, transform',
              opacity: 0,
              scale: 1,
              rotationZ: () => gsap.utils.random(-20, 20),
            },
            {
              ease: 'power4',
              opacity: 1,
              scale: 1,
              rotation: 0,
              stagger: 0.1, // Stagger value for h1
            }
          );

          // Animate p chars
          gsap.fromTo(
            pChars,
            {
              'will-change': 'opacity, transform',
              opacity: 0,
              scale: 1,
              rotationZ: () => gsap.utils.random(-20, 20),
            },
            {
              ease: 'power4',
              opacity: 1,
              scale: 1,
              rotation: 0,
              stagger: 0.02, // Stagger value for p (4 times faster than h1)
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

        // applying a custom font class for the h1 characters
        fx1Titles.forEach((title) => {
          const h1Chars = title.querySelectorAll('h1 .char');
          const fontClasses = styles.heroHeadText.split(' ');
          h1Chars.forEach((char) => {
            fontClasses.forEach((fontClass) => {
              char.classList.add(fontClass);
            });
            char.style.opacity = 0; // Set the initial opacity to 0
          });
        });

        requestAnimationFrame(() => {
          if (fx1Titles.length != 0) {
            animateTitles(fx1Titles);
          }
        });
      };
      if (document.readyState === 'complete') {
        handleSplittingAnimation();
      } else {
        const onLoad = () => {
          handleSplittingAnimation();
          window.removeEventListener('load', onLoad);
        };
        window.addEventListener('load', onLoad);
      }
      setShouldAnimate(false);
      return () => {
        window.removeEventListener('load', handleSplittingAnimation);
      };
    }, [lampToggle, header, subHeader, shouldAnimate]);
  };

  useSplittingAnimation();

  // listener for lampToggle
  useEffect(() => {
    disseminateTags();

    if (lampToggle) {
      // Disable scroll when tags are visible
      window.addEventListener('scroll', handleScroll);
      cursor4Ref.current = new Cursor4(lampToggle);
      cursor4Ref.current.cursor = true;
    } else {
      window.removeEventListener('scroll', handleScroll);

      if (!lampToggle && cursor4Ref.current) {
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

  //listener for lampcontainer mount
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
    console.log(' Hero.jsx lampPress called ');
    setLampToggle(!lampToggle); // Toggle tags visibility
    setLampToggleApp(); // propagate the toggle to parent component
  };

  //TODO: the view-port jumps once the scrollbar is disabled in the tagVisible toggle
  return (
    //   mx:auto relative
    <section ref={ref} className='w-full h-screen mx:auto relative '>
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
                transition={{ duration: 1, ease: 'easeInOut' }}
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
                  <p>{tag.term}</p>
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      {/* wrapper div for the hero heading and the lamp canvas */}

      <div
        className={`${styles.paddingX} absolute max-w-7xl mx-auto flex xl:flex-row flex-col items-start gap-5
      inset-0 top-[120px]
    `}
      >
        {/* container for the herotext and subtext */}
        <div className='flex flex-col justify-center items-start flex-shrink-0 lg:min-w-[700px] xl:min-w-[700px] 2xl:min-w-[700px] h-[300px] '>
          {lampToggle ? (
            <div className=''> </div>
          ) : (
            <div
              id='id_headerContainer'
              className='content__title'
              data-splitting
              data-effect1
            >
              <h1
                id={'id_header'}
                className={`${styles.heroHeadText}  `}
              >
                {header}
              </h1>

              {/* {t('subHeader')} */}
              <div data-splitting data-effect1>
                <p
                  id={'id_subHeader'}
                  className={`${styles.heroSubText} max-w-[60vw]`}
                >
                  {subHeader}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* container for the lamp canvas */}
        <div
          ref={lampContainerRef}
          id='id_lampContainer'
          className='lampContainer  w-full h-full '
        >
          <LampCanvas
            setLamptoggle={(press) => lampPress(press)}
            setMouseHover={(hovering) => setLampHovering(hovering)}
          />
        </div>

        {/* interactive lamp object  */}
      </div>
      {/* The little knob that transitions the website down to the about section */}
      {!lampToggle ? (
        <div className='absolute xs:bottom-10 bottom-32 w-full z-[1] flex justify-center items-center'>
          <a href='#about'>
            <div
              className='w-[35px] h-[64px] rounded-3xl border-4 border-tertiary
          flex justify-center items-start p-2'
            >
              <motion.dev
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className='w-3 h-3 rounded-full bg-tertiary mb-1'
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
