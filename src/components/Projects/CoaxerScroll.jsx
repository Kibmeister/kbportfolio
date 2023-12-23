import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import ReactPlayer from 'react-player';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { styles } from '../../styles';
import {
  coaxerAlreadyDiscoveredMap,
  coaxerMostRelevantMap,
  coaxerDoubleDiamondExploreMap,
  coaxerUppdMap,
  coaxerUppdChristianMap,
  coaxerDoubleDiamondDefineMap,
} from '../../constants';
import {
  coaxerFrontCover,
  introductionImg,
  ouruserChristian,
  contactChristian,
  pact,
  forskere,
  sonification,
  nudging,
  addressinganidea,
  earcon,
  auditoryicon,
  musiccons,
  focuskeeper,
  iphonereminders,
  microsofttodo,
  meeting1,
  meeting2,
  meeting3,
  calendarIntegration,
  coaxerFrontPage,
  evaluationImpact,
  academic,
  leisure,
  practical,
} from '../../assets';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CoaxerScroll = ({ onClose }) => {
  //retrieving the t object
  const { t, i18n } = useTranslation();
  const panelsRef = useRef(null);
  const sectionsRefs = useRef([]);
  const scrollProgressMotion = useMotionValue(0);
  const [coaxerAlreadyDiscoveredImg, setCoaxerAlreadyDiscoveredImg] =
    useState('');
  const [mostRelevantImg, setMostRelevantImg] = useState('');
  const [doublediamondExploreImg, setDoublediamondExploreImg] = useState('');
  const [uppdImg, setUppdImg] = useState('');
  const [upppChristianImg, setUppdChrsitianImg] = useState('');
  const [doubleDiamondDefineImg, setDoubleDiamondDefineImg] = useState('');

  // listener for language dependent images
  useEffect(() => {
    const coaxerAlreadyDiscoveredImg =
      coaxerAlreadyDiscoveredMap[i18n.language];
    const mostRelevantImg = coaxerMostRelevantMap[i18n.language];
    const doublediamondExploreImg =
      coaxerDoubleDiamondExploreMap[i18n.language];
    const uppdImg = coaxerUppdMap[i18n.language];
    const upppdChristianImg = coaxerUppdChristianMap[i18n.language];
    const doubleDiamondDefineImg = coaxerDoubleDiamondDefineMap[i18n.language];

    setCoaxerAlreadyDiscoveredImg(coaxerAlreadyDiscoveredImg);
    setMostRelevantImg(mostRelevantImg);
    setDoublediamondExploreImg(doublediamondExploreImg);
    setUppdImg(uppdImg);
    setUppdChrsitianImg(upppdChristianImg);
    setDoubleDiamondDefineImg(doubleDiamondDefineImg);
  }, [t, i18n]);

  const scaleX = useSpring(scrollProgressMotion, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  //new scroll implementation
  const handleScroll = () => {
    if (panelsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = panelsRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const currentProgress = scrollTop / maxScroll;
      scrollProgressMotion.set(currentProgress); // Update the motion value
    }
  };

  const playSound = (audioFile) => {
    console.log('The audio file played: ', audioFile);

    if (audioFile === 'academic') {
      const sound = new Audio(academic);
      sound.play();
    } else if (audioFile === 'practical') {
      const sound = new Audio(practical);
      sound.play();
    } else if (audioFile === 'leisure') {
      const sound = new Audio(leisure);
      sound.play();
    }
  };

  return (
    <div className='fixed z-30 inset-0  flex justify-center items-center w-full h-full'>
      <button onClick={onClose} className='z-50 absolute  top-4 right-4'>
        {t('portfolio.coaxer.buttonclose')}
      </button>

      {/* content container onWheel={handleScroll}*/}
      <div className='bg-[#fcfcfc] w-full h-full'>
        {/* container for the scroll wheel */}

        <motion.div className='progress-bar' style={{ scaleX }} />

        <div
          ref={panelsRef}
          onScroll={handleScroll}
          className={`${styles.coaxerScrollPanels} `}
        >
          {/* panel 1 */} {/* frontpage */}
          <div
            id='panel_1'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.coaxerScrollClip}`}
            >
              <h1 className='text-4xl sm:text-4xl md:text-6xl max-w-full sm:w-[400px] font-semibold garet-book'>
                Coaxer
              </h1>

              <div
                id='id-frontcover'
                className='flex flex-col lg:flex-col gap-5 '
              >
                <p className='lg:text-left lg:w-3/4  mobile:text-lg sm:text-xl md:text-2xl garet-book'>
                  {t('portfolio.coaxer.page1.subTitle')}
                </p>
                <LazyLoadImage
                  className='w-full lg:w-3/3 h-auto'
                  src={coaxerFrontCover}
                  alt='Description of the image'
                />
              </div>
            </div>
          </div>
          {/* panel 2 */}
          <div
            id='panel_2'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page2.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {/* {t('portfolio.ringmerking.page3.titleP')} */}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className={`${styles.projectSlideShowTitleParagraph}`}>
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    {t('portfolio.coaxer.page2.titleP')}
                  </p>
                </div>
                <LazyLoadImage
                  className=' mobile:w-3/4 sm:w-3/4 md:w-2/4 h-auto object-contain'
                  src={introductionImg}
                  alt='Description of the image'
                />
              </div>
            </div>
          </div>
          {/* panel 3 */}
          <div
            id='panel_3'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className={`${styles.projectSlideShowTitleParagraph}`}>
                  <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                    {t('portfolio.coaxer.page3.subTitle')}
                  </h1>
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    {t('portfolio.coaxer.page3.subTitleP')}
                  </p>
                </div>
                <div className={`${styles.projectSlideShowTitleParagraph}`}>
                  <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                    {t('portfolio.coaxer.page3.subTitle1')}
                  </h1>
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    {t('portfolio.coaxer.page3.subTitle1P')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* panel 4 */}
          <div
            id='panel_4'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page4.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page4.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer}  `}>
                <div className='w-full h-full flex gap-10 flex-col items-center '>
                  <LazyLoadImage
                    className='w-full lg:w-2/4 md:w-2/4 sm:w-2/4 h-auto'
                    src={coaxerAlreadyDiscoveredImg}
                    alt='Description of the image'
                  />
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    {t('portfolio.coaxer.page4.imgcaption')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* panel 5 */}
          <div
            id='panel_5'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page5.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page5.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <p className='garet-book text-center text-2xl  mobile:text-xl sm:text-2xl '>
                  {t('portfolio.coaxer.page5.div1P')}
                </p>
              </div>
            </div>
          </div>
          {/* panel 6 */}
          <div
            id='panel_6'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page6.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page6.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} relative`}
              >
                <div className='w-full h-full flex flex-col gap-10 items-center'>
                  <LazyLoadImage
                    className='w-full lg:w-3/4 h-auto mx-auto'
                    src={mostRelevantImg}
                    alt='Description of the image'
                  />

                  <LazyLoadImage
                    className='w-full md:w-3/4 lg:w-2/4 h-auto mx-auto'
                    src={doublediamondExploreImg}
                    alt='Description of the image'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 7 */}
          <div
            id='panel_7'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page7.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  - {t('portfolio.coaxer.page7.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col lg:flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page7.div1Title')}
                    </h1>

                    <ul className='garet-book opacity-60 text-lg mobile:text-xs sm:text-sm md:text-base '>
                      <li className='mt-2'>
                        - {t('portfolio.coaxer.page7.div1List-li1')}
                      </li>
                      <li className='mt-2'>
                        - {t('portfolio.coaxer.page7.div1List-li2')}
                      </li>
                      <li className='mt-2'>
                        - {t('portfolio.coaxer.page7.div1List-li3')}
                      </li>
                      <li className='mt-2'>
                        - {t('portfolio.coaxer.page7.div1List-li4')}
                      </li>
                      <li className='mt-2'>
                        - {t('portfolio.coaxer.page7.div1List-li5')}
                      </li>
                      <li className='mt-2'>
                        - {t('portfolio.coaxer.page7.div1List-li6')}
                      </li>
                    </ul>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    ></p>
                  </div>

                  <LazyLoadImage
                    className='w-full sm:w-2/4 h-auto object-contain'
                    src={ouruserChristian}
                    alt='Description of the image'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 8 */}
          <div
            id='panel_8'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page8.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page8.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col lg:flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page8.div1Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page8.div1P')}
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page8.div2Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page8.div2P')}
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full sm:w-2/4 h-auto object-contain'
                    src={contactChristian}
                    alt='Description of the image'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 9 */}
          <div
            id='panel_9'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page9.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page9.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col lg:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page9.div1Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page9.div1P')}
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page9.div2Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page9.div2P')}
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page9.div3Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page9.div3P')}
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-3/5 h-auto object-contain'
                    src={uppdImg}
                    alt='ultra personalized design'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 10 */}
          <div
            id='panel_10'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page10.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page10.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page10.div1Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page10.div1P')}
                    </p>
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph}  justify-center items-center text-6xl rotate-90 md:rotate-0`}
                  >
                    =
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page10.div2Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page10.div2P')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 11 */}
          <div
            id='panel_11'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page11.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page11.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page11.div1Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page11.div1P')}
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page11.div2Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page11.div2P')}
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page11.div3Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page11.div3P')}
                    </p>
                  </div>
                </div>
                <div className=' flex  mobile:flex-col flew-row w-full justify-center gap-10'>
                  <LazyLoadImage
                    className=' mobile-w:full sm:w-3/6 lg:w-2/5 h-auto object-contain'
                    src={pact}
                    alt='pact analysis'
                  />
                  <LazyLoadImage
                    className='mobile-w:full sm:w-3/6 lg:w-2/5 h-auto object-contain'
                    src={forskere}
                    alt='researchers illustration'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 12 */}
          <div
            id='panel_12'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page12.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  - {t('portfolio.coaxer.page12.titleP')}
                </p>
              </div>
              {/* the three row aligned paragraph */}

              <LazyLoadImage
                className='w-full h-auto object-contain'
                src={upppChristianImg}
                alt='ultra personalized design christian'
              />
            </div>
          </div>
          {/* panel 13 */}
          <div
            id='panel_13'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page13.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page13.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page13.div1Title')}
                    </h1>
                    <div className={`${styles.projectSlideShowTitleParagraph}`}>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60  `}
                      >
                        {t('portfolio.coaxer.page13.div1P')}
                      </p>
                      <LazyLoadImage
                        className=' w-2/3 md:w-4/5 h-auto object-contain'
                        src={sonification}
                        alt='sonification'
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} flex-row`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page13.div2Title')}
                    </h1>
                    <div className={`${styles.projectSlideShowTitleParagraph}`}>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60 `}
                      >
                        {t('portfolio.coaxer.page13.div2P')}
                      </p>
                      <LazyLoadImage
                        className='w-2/3 md:w-4/5 h-auto object-contain'
                        src={nudging}
                        alt='nudging'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 14 */}
          <div
            id='panel_14'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page14.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page14.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col items-center `}
              >
                <LazyLoadImage
                  className='w-full sm:w-3/5 lg:w-2/4 h-auto object-contain'
                  src={addressinganidea}
                  alt='addressing an idea'
                />
                <div className='flex flex-row'>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 15 */}
          <div
            id='panel_15'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page15.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  - {t('portfolio.coaxer.page15.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page15.div1Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page15.div1P')}
                    </p>
                    <LazyLoadImage
                      className='mobile:w-3/4 w-full  md:w-60  object-contain '
                      src={earcon}
                      alt='addressing an idea'
                    />
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page15.div2Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page15.div2P')}
                    </p>
                    <LazyLoadImage
                      className='mobile:w-3/4 w-full md:w-60  object-contain'
                      src={auditoryicon}
                      alt='addressing an idea'
                    />
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page15.div3Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page15.div3P')}
                    </p>
                    <LazyLoadImage
                      className='mobile:w-3/4 w-full md:w-60  object-contain '
                      src={musiccons}
                      alt='addressing an idea'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 16 */}
          <div
            id='panel_16'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page16.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page16.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page16.div1Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page16.div1P')}
                    </p>
                    <LazyLoadImage
                      className=' w-full mobile:w-3/4 lg:w-2/4 h-auto object-contain'
                      src={focuskeeper}
                      alt='addressing an idea'
                    />
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page16.div2Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page16.div2P')}
                    </p>
                    <LazyLoadImage
                      className='w-full mobile:w-3/4 lg:w-2/4 h-auto object-contain'
                      src={iphonereminders}
                      alt='addressing an idea'
                    />
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page16.div3Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page16.div3P')}
                    </p>
                    <LazyLoadImage
                      className='w-full mobile:w-3/4 lg:w-2/4 h-auto object-contain'
                      src={microsofttodo}
                      alt='addressing an idea'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 17 */}
          <div
            id='panel_17'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page17.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page17.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-5'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page17.div1Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page17.div1P')}
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page17.div2Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page17.div2P')}
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page17.div3Title')}
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page17.div3P')}
                    </p>
                  </div>
                </div>
                <div className='flex flew-row w-full justify-center '>
                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
                    src={doubleDiamondDefineImg}
                    alt='doublediamond-define'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 18 */}
          <div
            id='panel_18'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page18.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  - {t('portfolio.coaxer.page18.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page18.div1Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page18.div1P')}
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page18.div2Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page18.div2P')}
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full md:w-2/4 h-auto object-contain'
                    src={meeting1}
                    alt='meeting 1'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 19 */}
          <div
            id='panel_19'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page19.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}></p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1
                      className={` ${styles.projectSlideShowPagePTitle} `}
                    ></h1>
                    <LazyLoadImage
                      className='w-full h-auto object-contain'
                      src={calendarIntegration}
                      alt='calendar integration'
                    />

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page19.div1P')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 20 */}
          <div
            id='panel_20'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page20.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page20.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page20.div1Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page20.div1P')}
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full md:w-2/4 h-auto object-contain'
                    src={meeting2}
                    alt='meeting 2'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 21 */}
          <div
            id='panel_21'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page21.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  - {t('portfolio.coaxer.page21.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col md:flex-row gap-10 '>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page21.div1Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page21.div1P')}
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full md:w-2/4 h-auto object-contain'
                    src={meeting3}
                    alt='meeting 3'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 22 */}
          <div
            id='panel_22'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page22.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page22.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <LazyLoadImage
                      className='w-3/5 lg:w-3/4 h-auto object-contain cursor-pointer'
                      src={coaxerFrontPage}
                      alt='coaxer front page'
                      onClick={() =>
                        window.open(
                          'https://www.figma.com/proto/VV2pmxTkpHyAONnmwdfDUM/Coaxer?type=design&node-id=1-853&t=a4YHfvtiHzMJ3XdK-1&scaling=scale-down&page-id=1%3A2&starting-point-node-id=1%3A853&mode=design'
                        )
                      }
                    />
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.coaxer.page22.div1P')}
                    </p>
                  </div>
                  {/* the button array and the caption */}
                  <div classname='flex flex-col'>
                    {/* the button array */}
                    <div className='w-full flex flex-row flex-wrap gap-5 pb-10'>
                      <button
                        class='flex items-center justify-center w-32 h-12 bg-white hover:bg-black text-black font-semibold hover:text-white border border-black  shadow-md'
                        onClick={() => playSound('practical')}
                      >
                        ♪ {t('portfolio.coaxer.page22.divEarconPractical')}
                      </button>

                      <button
                        class='flex items-center justify-center w-32 h-12 bg-white hover:bg-black text-black font-semibold hover:text-white border border-black hover:border-transparent shadow-md'
                        onClick={() => playSound('leisure')}
                      >
                        ♪ {t('portfolio.coaxer.page22.divEarconLeisure')}
                      </button>

                      <button
                        class='flex items-center justify-center w-32 h-12 bg-white hover:bg-black text-black font-semibold hover:text-white border border-black hover:border-transparent shadow-md'
                        onClick={() => playSound('academic')}
                      >
                        ♪ {t('portfolio.coaxer.page22.divEarconAcademic')}
                      </button>
                    </div>

                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      {t('portfolio.coaxer.page22.divEarcons')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 23 */}
          <div
            id='panel_23'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer} w-full`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page23.title')}
                  {/* denne tittelen må være tvunget
                  venstrestilt i desktop mode */}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {t('portfolio.coaxer.page23.titleP')}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='wrapper'>
                  <ReactPlayer
                    className='player'
                    url='https://vimeo.com/889628233?share=copy'
                    controls
                    fallback={true}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 24 */}
          <div
            id='panel_24'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  - {t('portfolio.coaxer.page24.title')}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}></p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col md:flex-row`}
              >
                <div className='flex flex-col gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page24.div1Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page24.div1P')}
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      {t('portfolio.coaxer.page24.div2Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      {t('portfolio.coaxer.page24.div2P')}
                    </p>
                  </div>
                </div>
                <LazyLoadImage
                  className='w-full sm:w-3/4 lg:w-2/4 h-auto object-contain'
                  src={evaluationImpact}
                  alt='evaluation and impact'
                />
              </div>
            </div>
          </div>
          {/* panel 25 */}
          <div
            id='panel_25'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#ffffff]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1
                  className={` ${styles.projectSlideShowPageTitle} text-black`}
                >
                  - {t('portfolio.coaxer.page25.title')}
                </h1>
                {/* <p className={` ${styles.projectSlideShowPageTitleP}`}></p> */}
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col gap-10 md:flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1
                      className={` ${styles.projectSlideShowPagePTitle} text-black`}
                    >
                      {t('portfolio.coaxer.page25.div1Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 text-black`}
                    >
                      {t('portfolio.coaxer.page25.div1P')}
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1
                      className={` ${styles.projectSlideShowPagePTitle} text-black `}
                    >
                      {t('portfolio.coaxer.page25.div2Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} text-black opacity-60 `}
                    >
                      {t('portfolio.coaxer.page25.div2P')}
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1
                      className={` ${styles.projectSlideShowPagePTitle} text-black `}
                    >
                      {t('portfolio.coaxer.page25.div3Title')}
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} text-black opacity-60 `}
                    >
                      {t('portfolio.coaxer.page25.div3P')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoaxerScroll;
