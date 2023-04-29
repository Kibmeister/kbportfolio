import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';
import { gsap } from 'gsap';
import { ComputersCanvas } from './canvas';
import { LampCanvas } from './canvas';
import { heroTags } from '../constants';
import { Cursor4 } from '../scripts/cursors/cursor4';

// Custom Hook
const useSplittingAnimation = () => {
  useEffect(() => {
    const animateTitles = (fx1Titles) => {
      fx1Titles.forEach((title) => {
        const h1Chars = title.querySelectorAll('h1 .char');
        const pChars = title.querySelectorAll('p .char');

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
      Splitting({ target: '[data-splitting]', by: 'chars' });
      requestAnimationFrame(() => {
        animateTitles(fx1Titles);
      });
    };

    if (document.readyState === 'complete') {
      handleSplittingAnimation();
    } else {
      window.addEventListener('load', handleSplittingAnimation);
    }

    return () => {
      window.removeEventListener('load', handleSplittingAnimation);
    };
  }, []);
};

const getRandomRotation = () => {
  return Math.random() * 40 - 30; // Generates a random number between -30 and 30
};
const getRandomPosition = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  return { x, y };
};

const Hero = React.forwardRef(({ setLampToggleApp }, ref) => {
  useSplittingAnimation();

  const [tags, setTags] = useState([]);
  const [lampToggle, setLampToggle] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursor4Ref = useRef(null);

  useEffect(() => {
    disseminateTags();

    if (lampToggle) {
      // Disable scroll when tags are visible
      window.addEventListener('scroll', handleScroll);
      cursor4Ref.current = new Cursor4();
      cursor4Ref.current.cursor = true;
    } else {
      // Enable scroll when tags are not visible
      window.removeEventListener('scroll', handleScroll);
      if (cursor4Ref.current) {
        cursor4Ref.current.removeCursor();
      }
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lampToggle]);


  useEffect(() => {
    if (cursor4Ref.current) {
      cursor4Ref.current.setHovering(isHovering);
    }
  }, [isHovering]);


  const handleScroll = () => {
    // Prevent scrolling when tags are visible
    window.scrollTo(0, 0);
  };

 const disseminateTags = () => {
   const nonOverlappingPositions = () => {
     const positions = [];
     const minDistance = 300; // Increased minimum distance between tags in pixels
     const numTries = 100; // Number of attempts to find a non-overlapping position

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
         newPos = getRandomPosition();

         // Check if new position overlaps with any previous position
         for (const pos of positions) {
           if (positionOverlap(newPos, pos)) {
             overlap = true;
             break;
           }
         }
         tries++;
       } while (overlap && tries < numTries);

       positions.push(newPos);
     }

     return positions;
   };


   const positions = nonOverlappingPositions();

   const transformedTags = heroTags.map((tag, index) => {
     const { x, y } = positions[index];
     const rotation = getRandomRotation();
     return { ...tag, x, y, rotation };
   });

   setTags(transformedTags);
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
      <div id={'id_disseminate'} className=' absolute inset-0'>
        {lampToggle &&
          tags.map((tag, index) => (
            <div
              key={index}
              className='tag'
              style={{
                position: 'absolute',
                left: `${tag.x}%`,
                top: `${tag.y}%`,
                transform: `rotate(${tag.rotation}deg)`,
                zIndex: 10,
              }}
            >
              <button
                className='bg-transparent border-none outline-none p-0'
                onMouseEnter={() => setIsHovering(true)} // Add this line
                onMouseLeave={() => setIsHovering(false)} // Add this line
              >
                <p>{tag.term}</p>
              </button>
            </div>
          ))}
      </div>

      {/* div for the heading and subheading text, as well as the lampcanvas */}
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className='lampContainer xl:flex-1 xl:h-auto md:h-[550px] h-[350px] '>
          <LampCanvas lampToggle={() => lampPress()} />
        </div>

        <div className='flex flex-col justify-center items-center'>
          {!lampToggle && (
            <div className='content__title' data-splitting data-effect1>
              <h1 className={`${styles.heroHeadText}  text-black`}>
                Hello, I'm Kasper
              </h1>

              <div className='content_title' data-splitting data-effect1>
                <p className={`${styles.heroSubText} text-black`}>
                  I'm<span className='space'></span>an
                  <span className='space'></span>interaction
                  <span className='space'></span>designer
                  <span className='space'></span>specialized
                  <span className='space'></span>in
                  <span className='space'></span>
                  UI<span className='space'></span>and
                  <span className='space'></span>UX
                  <span className='space'></span>
                  design. <br className='sm:block hidden' /> My
                  <span className='space'></span>works
                  <span className='space'></span>are
                  <span className='space'></span>interdisciplinary
                  <span className='space'></span>in
                  <span className='space'></span>
                  form<span className='space'></span>and
                  <span className='space'></span>expression
                </p>
              </div>
            </div>
          )}
        </div>

        {/* interactive lamp object  */}
      </div>

      {/* The little knob that transitions the website down to the about section */}
      {!lampToggle ? (
        <div className='absolute xs:bottom-10 bottom-32 w-full z-[1] flex justify-center items-center'>
          <a href='#about'>
            <div
              className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary
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
                className='w-3 h-3 rounded-full bg-secondary mb-1'
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
