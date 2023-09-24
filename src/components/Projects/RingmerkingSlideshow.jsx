import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../../styles';
import { designUtfall } from '../../assets';
import { wrap } from 'popmotion';

const RingmerkingSlideshow = ({ onClose, ringmerkingBackground }) => {
  //retrieving the t object
  const { t, i18n } = useTranslation();
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const [[page, direction], setPage] = useState([0, 0]);

  //  scroll to paginate
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const handleScroll = (event) => {
    const now = new Date().getTime();

    // Throttle to prevent too quick successive calls
    if (now - lastScrollTime < 800) return;

    const scrollThreshold = 75; // Adjust this value based on your preference

    if (Math.abs(event.deltaY) < scrollThreshold) return; // Ignore minor scrolls

    // deltaY is positive for scroll down, negative for scroll up
    if (event.deltaY > 0) {
      paginate(1); // Forward
    } else {
      paginate(-1); // Backward
    }

    setLastScrollTime(now);
  };

  //slideshow animation
  const variants = {
    enter: (direction) => {
      return {
        zIndex: 10,
        x: direction > 0 ? 1000 : -1000,
        opacity: 1,
        transition: { duration: 0.08 }, // Set this to your preferred timing
      };
    },
    center: {
      zIndex: 10,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 10,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.08 }, // Make this the same as the enter duration
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const paginate = (newDirection) => {
    const nextPage = wrap(0, 19, page + newDirection);
    setPage([nextPage, newDirection]);
  };

  return (
    <div className='fixed z-30 inset-0  flex justify-center items-center w-full h-full'>
      {/* progress bar */}
      <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex gap-2'>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-8 ${
              idx <= page ? 'bg-black' : 'border border-black bg-transparent'
            }`}
          ></div>
        ))}
      </div>

      <button onClick={onClose} className='z-50 absolute  top-4 right-4'>
        {t('portfolio.ringmerking.buttonclose')}
      </button>

      {/* content container */}
      <div className='bg-[#ffffff] w-full h-full' onWheel={handleScroll}>
        {/* svg arrows */}
        <div onClick={() => paginate(-1)}>
          <svg
            id='leftArrow'
            ref={leftArrowRef}
            className=' absolute z-50 top-1/2 cursor-pointer opacity-75 w-10 h-10 left-12'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
            strokeWidth='8'
            stroke='black'
            fill='transparent'
          >
            <g strokeLinejoin='round' strokeLinecap='round'>
              <circle r='46' cx='50' cy='50' />
              <polyline points='60 25, 30 50, 60 75'></polyline>
            </g>
          </svg>
        </div>

        <div onClick={() => paginate(1)}>
          <svg
            id='rightArrow'
            ref={rightArrowRef}
            className=' absolute z-50 top-1/2 cursor-pointer opacity-75 w-10 h-10 right-12'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
            strokeWidth='8'
            stroke='black'
            fill='transparent'
          >
            <g strokeLinejoin='round' strokeLinecap='round'>
              <circle r='46' cx='50' cy='50' />
              <polyline points='40 25, 70 50, 40 75'></polyline>
            </g>
          </svg>
        </div>

        <AnimatePresence initial={false} custom={direction}>
          {page === 0 && (
            <motion.div
              className={`${styles.projectHigherordercomponent}`}
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <div className={` ${styles.projectWrapper} `}>
                <div id='id-slidecontainer' className='flex flex-col gap-10 '>
                  <h1 className='text-6xl w-[400px]font-semibold'>Ringmerking.no</h1>

                  <div
                    id='id-frontcover'
                    className='flex flex-col lg:flex-row gap-10 '
                  >
                    <p className='lg:text-left lg:w-1/4'>
                      En tjeneste for dem som er fugle- og naturinteresserte som
                      vil bidra til å bevare og beskytte mangfoldet
                    </p>
                    <img
                      className='w-full lg:w-2/4 h-auto'
                      src={designUtfall}
                      alt='Description of the image'
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {page === 1 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 2</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}

          {page === 2 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 3 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 4 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 5 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 6 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 7 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 8 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 9 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 10 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 11 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 12 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 13 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 14 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 15 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 16 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 17 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 18 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
          {page === 19 && (
            <motion.div
              className='w-full h-full flex flex-col justify-evenly items-center bg-[#ffffff]'
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <h1 className='text-xl'>Dette her er div nummer 3</h1>

              <div className='flex flex-row justify-between align-center gap-10 mx-10'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti, ipsa quidem cum, in dicta aliquid, magnam quos porro
                  ex totam adipisci eligendi excepturi aut esse? Laudantium
                  explicabo repudiandae illum voluptas?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RingmerkingSlideshow;
