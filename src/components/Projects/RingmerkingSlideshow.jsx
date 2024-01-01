import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../../styles';
import {
  frontpage,
  ideGenerering,
  denGenialeIdeen,
  firstprototype,
  usertesting,
  userPrototype,
  userResearch,
  designExpression,
  designChallenge,
  designChallengeSolution,
  ringmerkingGammelSide,
  ringmerkingNySide,
  prototypePlaceholder,
} from '../../assets';
import {
  imageMapImgCarousel,
  imageMapRingmerkingEmathyMap,
  imageMapRingmerkingResultsMap,
} from '../../constants';
import { wrap } from 'popmotion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RingmerkingSlideshow = ({ onClose, ringmerkingBackground }) => {
  //retrieving the t object
  const { t, i18n } = useTranslation();
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const [imgEmpathyMap, setEmpathy] = useState('');
  const [imgFeedbackResults, setFeedbackResults] = useState('');

  //slideshow animation
  const variants = {
    enter: (direction) => {},
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
  //pagination for the slides
  const paginate = (newDirection) => {
    const nextPage = wrap(0, 19, page + newDirection);
    setPage([nextPage, newDirection]);
  };

  const [[imgPage], setImgPage] = useState([1, 0]);
  //index for the img array
  const imageIndex = imgPage; // no need to use wrap, just use imgPage directly

  //paginate for img carousel
  const imgPaginate = (newDirection) => {
    let newPage = imgPage + newDirection;
    // Ensure newPage is between 0 and 5
    newPage = newPage < 1 ? 1 : newPage > 7 ? 7 : newPage;
    setImgPage([newPage, newDirection]);

    console.log('The page', imgPage);
    console.log('The imageIndex', imageIndex);
  };
  // listener for the t language updater
  useEffect(() => {
    const imgEmpathyMap = imageMapRingmerkingEmathyMap[i18n.language];
    const imgFeedbackResults = imageMapRingmerkingResultsMap[i18n.language];

    setEmpathy(imgEmpathyMap);
    setFeedbackResults(imgFeedbackResults);
  }, [t, i18n]);

  return (
    <div className='fixed z-30 inset-0  flex justify-center items-center w-full h-full'>
      <button onClick={onClose} className='z-50 absolute  top-4 right-4'>
        {t('portfolio.ringmerking.buttonclose')}
      </button>

      {/* content container onWheel={handleScroll}*/}
      <div className='bg-[#ffffff] w-full h-full'>
        {/* svg arrows */}

        <div className='footercontrollers bg-white z-100 width-1/1 '>
          <div onClick={() => paginate(-1)}>
            <svg
              id='leftArrow'
              ref={leftArrowRef}
              className=' absolute z-50 top-1/2 cursor-pointer opacity-75 w-10 h-10 sm:left-2 mobile:left-4 lg:left-6 mobile:top-[90%]'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 100 100'
              strokeWidth='8'
              stroke='black'
              fill='transparent'
            >
              <g strokeLinejoin='round' strokeLinecap='round'>
                <polyline points='60 25, 30 50, 60 75'></polyline>
              </g>
            </svg>
          </div>

          <div onClick={() => paginate(1)}>
            <svg
              id='rightArrow'
              ref={rightArrowRef}
              className=' absolute z-50 top-1/2 cursor-pointer opacity-75 w-10 h-10 right-6 sm:right-2 mobile:right-4 lg:right-6 mobile:top-[90%]'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 100 100'
              strokeWidth='8'
              stroke='black'
              fill='transparent'
            >
              <g strokeLinejoin='round' strokeLinecap='round'>
                <polyline points='40 25, 70 50, 40 75'></polyline>
              </g>
            </svg>
          </div>
          {/* progress bar */}
          <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 mobile:gap-1 '>
            {Array.from({ length: 19 }).map((_, idx) => (
              <div
                key={idx}
                className={`mobile:h-1  mobile:w-3 sm:h-1.5 sm:w-6 md:h-2 md:w-8  ${
                  idx <= page
                    ? 'bg-black'
                    : 'border border-black bg-transparent'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <AnimatePresence
          initial={false}
          custom={direction}
          className='flex flex-col'
        >
          {/* frontpage */}
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <h1 className='text-3xl sm:text-4xl md:text-6xl max-w-full sm:w-[400px] font-semibold garet-book'>
                    Ringmerking.no
                  </h1>

                  <div
                    id='id-frontcover'
                    className='flex flex-col lg:flex-col gap-5 '
                  >
                    <p className='lg:text-left lg:w-2/4 text-xl mobile:text-lg garet-book'>
                      {t('portfolio.ringmerking.page0.subTitle')}
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-3/3 h-auto'
                      src={frontpage}
                      alt='Description of the image'
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* table of content */}
          {page === 1 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowPageParagraph}`}>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      {t('portfolio.ringmerking.page1.title')}
                    </h1>
                  </div>
                  <ul className={`${styles.projectSlideShowPagePTitle}`}>
                    {t('portfolio.ringmerking.page1.list', {
                      returnObjects: true,
                    }).map((item, index) => (
                      <li key={index}>- {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* caset */}
          {page === 2 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page2.title1')} 🛠️
                      </h1>
                      <p className={`${styles.projectSlideShowPageP} `}>
                        {t('portfolio.ringmerking.page2.p1')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page2.title2')} 🕴🏼
                      </h1>
                      <p className={`${styles.projectSlideShowPageP} `}>
                        {t('portfolio.ringmerking.page2.p2')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* målet */}
          {page === 3 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                      {t('portfolio.ringmerking.page3.title')}🎯
                    </h1>
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page3.titleP')}
                    </p>
                  </div>

                  {/* the three row aligned paragraph */}

                  <div className={`${styles.projectSlideShowBodyContainer} `}>
                    <div className={`${styles.projectSlideShowTitleParagraph}`}>
                      <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                        {t('portfolio.ringmerking.page3.p1Title')} 🚀
                      </h1>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60 `}
                      >
                        {t('portfolio.ringmerking.page3.p1')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowTitleParagraph}`}>
                      <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                        {t('portfolio.ringmerking.page3.p2Title')} 📱
                      </h1>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60 `}
                      >
                        {t('portfolio.ringmerking.page3.p2')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowTitleParagraph}`}>
                      <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                        {t('portfolio.ringmerking.page3.p3Title')} 👩‍👦
                      </h1>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60 `}
                      >
                        {t('portfolio.ringmerking.page3.p3')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* empati */}
          {page === 4 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={` ${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page4.subTitle')}
                      </h1>
                      <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page4.title')} 🙇🏼‍♂️
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page4.titleP')}
                    </p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          " {t('portfolio.ringmerking.page4.p1Title')}"
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page4.p1')}
                        </p>
                      </div>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          " {t('portfolio.ringmerking.page4.p2Title')}"
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page4.p2')}
                        </p>
                      </div>
                    </div>
                    <div className='empathyMap flex flex-col gap-5'>
                      <LazyLoadImage
                        className='sm:w-6/6 sm:h-6/6'
                        src={imgEmpathyMap}
                        alt='empathy map'
                      />
                      <p
                        className={`${styles.projectSlideShowPageP} text-center italic`}
                      >
                        {t('portfolio.ringmerking.page4.empathyMap')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* empati 2 */}
          {page === 5 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={` ${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page5.subTitle')}
                      </h1>
                      <h1
                        className={` ${styles.projectSlideShowPageTitle} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page5.title')} 🙇🏼‍♂️
                      </h1>
                    </div>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    {/* the two col aligned paragraph */}
                    <p className='garet-book text-center text-2xl  mobile:text-xl sm:text-2xl '>
                      {t('portfolio.ringmerking.page5.p')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* definer */}
          {page === 6 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page6.subTitle')}
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page6.title')} ✍🏼
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page6.titleP')}
                    </p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page6.p1Title')} ✅
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page6.p1')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page6.p2Title')} 👨‍👩‍👦‍👦
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page6.p2')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page6.p3Title')} 👩🏼‍⚕️
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page6.p3')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* ideegenerering */}
          {page === 7 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={` ${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page7.subTitle')}
                      </h1>
                      <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page7.title')} 🧠
                      </h1>
                    </div>

                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page7.titleP')}
                    </p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10 '>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          {t('portfolio.ringmerking.page7.p1Title')}
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page7.p1')}
                        </p>
                      </div>
                    </div>

                    <LazyLoadImage
                      className='w-4/4 h-3/5 sm:w-2/4 sm:h-3/4 md:w-3/5 md:h-3/5'
                      src={ideGenerering}
                      alt='designutfall'
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* ideegenerering 2 */}
          {page === 8 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer} sm:mt-44`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page8.subTitle')}
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page8.title')} 🧠
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page8.titleP')}
                    </p>
                  </div>

                  <div
                    className={`${styles.projectSlideShowBodyContainer} sm:flex-col md:flex-row `}
                  >
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          {t('portfolio.ringmerking.page8.p1Title')}
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page8.p1')}
                        </p>
                      </div>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          {t('portfolio.ringmerking.page8.p2Title')}
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page8.p2')}
                        </p>
                      </div>
                    </div>

                    <div className='imgcarousel flex flex-row items-center sm:w-2/3 sm:h-2/3'>
                      <div onClick={() => imgPaginate(-1)}>
                        <svg
                          id='leftArrow'
                          ref={leftArrowRef}
                          className=' z-50 top-1/2 cursor-pointer opacity-75 w-8 h-8 left-12 mobile:left-4 mobile:top-[92%]'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 100 100'
                          strokeWidth='8'
                          stroke='black'
                          fill='transparent'
                        >
                          <g strokeLinejoin='round' strokeLinecap='round'>
                            <polyline points='60 25, 30 50, 60 75'></polyline>
                          </g>
                        </svg>
                      </div>
                      <div className='imgContainer flex flex-col gap-5'>
                        <p className='ideaname italic text-center'>
                          {imageMapImgCarousel[imageIndex].name}
                        </p>
                        <LazyLoadImage
                          alt='example image'
                          height='w-3/4' // Set height and width
                          width='w-3/4'
                          src={imageMapImgCarousel[imageIndex].img}
                        />
                      </div>
                      <div onClick={() => imgPaginate(1)}>
                        <svg
                          id='rightArrow'
                          ref={rightArrowRef}
                          className='z-50 top-1/2 cursor-pointer opacity-75 w-8 h-8 right-12 mobile:right-4 mobile:top-[92%]'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 100 100'
                          strokeWidth='8'
                          stroke='black'
                          fill='transparent'
                        >
                          <g strokeLinejoin='round' strokeLinecap='round'>
                            <polyline points='40 25, 70 50, 40 75'></polyline>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* den geniale ideen */}
          {page === 9 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page9.subTitle')}
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page9.title')} 💡
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}></p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          {t('portfolio.ringmerking.page9.p1Title')} 🌟
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page9.p1')}
                        </p>
                      </div>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          {t('portfolio.ringmerking.page9.p2Title')} 📱
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page9.p2')}
                        </p>
                      </div>
                    </div>

                    <LazyLoadImage
                      className='w-4/4 h-3/5 sm:w-2/4 sm:h-3/4 md:w-3/6 md:h-3/6'
                      src={denGenialeIdeen}
                      alt='designutfall'
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* prototype */}
          {page === 10 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page10.subTitle')}
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page10.title')} 🎮
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page10.titleP')}
                    </p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div
                        className={`${styles.projectSlideShowPageParagraph}`}
                      >
                        <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                          {t('portfolio.ringmerking.page10.p1Title')}
                        </h1>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page10.p1')}
                        </p>
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page10.p2')}
                        </p>
                      </div>
                    </div>

                    <LazyLoadImage
                      className='w-4/4 h-3/5 sm:w-2/4 sm:h-3/4 md:w-3/6 md:h-3/6 object-contain'
                      src={firstprototype}
                      alt='designutfall'
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* brukertesting */}
          {page === 11 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page11.subTitle')}
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page11.title')} 🗣️
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page11.titleP')}
                    </p>
                  </div>
                  <div className='w-full h-full flex justify-center items-center'>
                    <LazyLoadImage
                      className='w-full h-full sm:w-2/4 sm:h-2/4 md:w-3/6 md:h-3/6'
                      src={usertesting}
                      alt='designutfall'
                    />
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page11.p1Title')} 👨‍👩‍👦‍👦
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page11.p1')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page11.p2Title')} 🤔
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page11.p2')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page11.p3Title')} 📍
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page11.p3')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* resultat */}
          {page === 12 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page12.subTitle')}
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page12.title')} 🏁
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page12.titleP')}
                    </p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    <div className='paragraphcontainer w-full flex flex-col gap-10'>
                      <LazyLoadImage
                        className='w-7/8 h-7/8'
                        alt='feedback results'
                        src={imgFeedbackResults}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* resultat 2 */}
          {page === 13 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        {t('portfolio.ringmerking.page13.subTitle')}
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        {t('portfolio.ringmerking.page13.title')} 🏁
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page13.titleP')}
                    </p>
                  </div>

                  <div
                    className={`${styles.projectSlideShowBodyContainer} items-baseline`}
                  >
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`text-6xl garet-book mobile:text-5xl}`}>
                        1.
                      </h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        {t('portfolio.ringmerking.page13.p1')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`text-5xl garet-book mobile:text-4xl}`}>
                        2.
                      </h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        {t('portfolio.ringmerking.page13.p2')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`text-4xl garet-book mobile:text-3xl}`}>
                        3.
                      </h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        {t('portfolio.ringmerking.page13.p3')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`text-3xl garet-book mobile:text-2xl}`}>
                        4.
                      </h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        {t('portfolio.ringmerking.page13.p4')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* veien videre */}
          {page === 14 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer} sm:mt-44`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      {t('portfolio.ringmerking.page14.title')} 🚌
                    </h1>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page14.titleP')}
                    </p>
                  </div>
                  {/* userPrototype, userResearch, designExpression, */}

                  <div
                    className={`${styles.projectSlideShowBodyContainer} items-baseline`}
                  >
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <LazyLoadImage
                        className='w-full object-contain lg:w-4/4 h-2/4 '
                        src={userResearch}
                        alt='Description of the image'
                      />
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page14.p1Title')}
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page14.p1')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <LazyLoadImage
                        className='w-full object-contain lg:w-4/4 h-2/4 '
                        src={designExpression}
                        alt='Description of the image'
                      />
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page14.p2Title')}
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page14.p2')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <div className='imgContainer w-full flex flex-col items-center'>
                        <LazyLoadImage
                          className='w-full h-full sm:object-contain lg:w-3/4 '
                          src={userPrototype}
                          alt='Description of the image'
                        />
                      </div>

                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page14.p3Title')}
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page14.p3')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* en design utfordring */}
          {page === 15 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      {t('portfolio.ringmerking.page15.title')} 🧐
                    </h1>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page15.titleP')}
                    </p>
                  </div>

                  <div
                    className={`${styles.projectSlideShowBodyContainer} mobile:gap-20`}
                  >
                    <div className='paragraphcol sm:w-2/5 flex flex-col items-center justify-center'>
                      <div className='paragraph flex flex-col mobile:items-center  gap-5 '>
                        <LazyLoadImage
                          className='object-contain mobile:w-3/4 lg:w-3/4 h-3/4 mobile:order-last'
                          src={designChallenge}
                          alt='Description of the image'
                        />
                        <p
                          className={`${styles.projectSlideShowPageP} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page15.p1')}
                        </p>
                      </div>
                    </div>
                    {/* pointing arrow */}
                    <div className='paragraphcol2 sm:w-1/5 flex flex-col justify-center items-center'>
                      <p
                        className={`mobile:text-xl sm:text-2xl md:text-4xl lg:text-6xl text-center transform sm:rotate-0 rotate-90`}
                      >
                        ➡️
                      </p>
                    </div>

                    <div className='paragraphcol3 sm:w-2/5 flex flex-col '>
                      <div className='paragraph mobile:justify-center mobile:items-center flex flex-col gap-5  '>
                        <LazyLoadImage
                          className='object-contain  mobile:w-3/4 sm:w-3/6 '
                          src={designChallengeSolution}
                          alt='Description of the image'
                        />
                        <p
                          className={`${styles.projectSlideShowPageP}  opacity-60`}
                        >
                          {t('portfolio.ringmerking.page15.p2')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* gammel og ny tjeneste */}
          {page === 16 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      {t('portfolio.ringmerking.page16.title')} 🎁
                    </h1>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    <div className='paragraphcol2 sm:w-1/2 flex flex-col'>
                      <div className='paragraph w-full flex flex-col gap-5 '>
                        <p
                          className={`${styles.projectSlideShowPagePTitle} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page16.p1Title')}
                        </p>
                        <LazyLoadImage
                          className='object-contain w-full'
                          src={ringmerkingGammelSide}
                          alt='Description of the image'
                        />
                      </div>
                    </div>
                    <div className='paragraphcol sm:w-1/2 flex flex-col '>
                      <div className='paragraph w-full flex flex-col gap-5 '>
                        <p
                          className={`${styles.projectSlideShowPagePTitle} opacity-60`}
                        >
                          {t('portfolio.ringmerking.page16.p2Title')}
                        </p>
                        <LazyLoadImage
                          className='object-contain w-full '
                          src={ringmerkingNySide}
                          alt='Description of the image'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* figma prototype */}
          {page === 17 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      {t('portfolio.ringmerking.page17.title')} 🎮
                    </h1>

                    <p className={`${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.ringmerking.page17.titleP')}
                    </p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    <div className='paragraphcol w-full flex justify-center items-center flex-col'>
                      <LazyLoadImage
                        className='object-contain mobile:w-3/4 sm:w-2/4 md:w-2/6 cursor-pointer'
                        src={prototypePlaceholder}
                        alt='Description of the image'
                        onClick={() =>
                          window.open(
                            'https://www.figma.com/proto/luE2AxlVtZQhwBOWhaOBWJ/Final-design-sprint---Kantega?page-id=0%3A1&type=design&node-id=1-16074&viewport=1021%2C281%2C0.16&t=ctFeoA40XKKXomcb-1&scaling=scale-down&starting-point-node-id=1%3A16074&mode=design'
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* erfaringer */}
          {page === 18 && (
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
            >
              <div className={` ${styles.projectWrapper} `}>
                <div
                  id='id-slidecontainer'
                  className={`${styles.projectSlideShowContainer}`}
                >
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      {t('portfolio.ringmerking.page18.title')}
                    </h1>

                    <p className={`${styles.projectSlideShowPageP}`}></p>
                  </div>

                  <div className={`${styles.projectSlideShowBodyContainer}`}>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page18.p1Title')} 🤷🏼
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page18.p1')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page18.p2Title')} 🥨
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page18.p2')}
                      </p>
                    </div>
                    <div className={`${styles.projectSlideShowPageParagraph}`}>
                      <h1 className={`${styles.projectSlideShowPagePTitle}`}>
                        {t('portfolio.ringmerking.page18.p3Title')} ⏳
                      </h1>
                      <p
                        className={`${styles.projectSlideShowPageP} opacity-60`}
                      >
                        {t('portfolio.ringmerking.page18.p3')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RingmerkingSlideshow;
