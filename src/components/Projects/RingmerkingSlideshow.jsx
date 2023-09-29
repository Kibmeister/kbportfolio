import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../../styles';
import {
  frontpage,
  designUtfall,
  empathyMapEN,
  ideGenerering,
  denGenialeIdeen,
  firstprototype,
  usertesting,
  userPrototype,
  userResearch,
  designExpression,
  designChallenge,
  designChallengeSolution,
  oldsite,
  prototypePlaceholder,
} from '../../assets';
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
      <button onClick={onClose} className='z-50 absolute  top-4 right-4'>
        {t('portfolio.ringmerking.buttonclose')}
      </button>

      {/* content container */}
      <div className='bg-[#ffffff] w-full h-full' onWheel={handleScroll}>
        {/* svg arrows */}

        <div className='footercontrollers bg-white z-100 width-1/1 '>
          <div onClick={() => paginate(-1)}>
            <svg
              id='leftArrow'
              ref={leftArrowRef}
              className=' absolute z-50 top-1/2 cursor-pointer opacity-75 w-10 h-10 left-12 mobile:left-4 mobile:top-[92%]'
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
              className=' absolute z-50 top-1/2 cursor-pointer opacity-75 w-10 h-10 right-12 mobile:right-4 mobile:top-[92%]'
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
                className={`h-2 w-8 mobile:h-1 sm:h1.5 mobile:w-4 sm:w-6  ${
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
                <div id='id-slidecontainer' className='flex flex-col gap-20'>
                  <h1 className='text-3xl sm:text-4xl md:text-6xl max-w-full sm:w-[400px] font-semibold garet-book'>
                    Ringmerking.no
                  </h1>

                  <div
                    id='id-frontcover'
                    className='flex flex-col lg:flex-col gap-5 '
                  >
                    <p className='lg:text-left lg:w-2/4 text-xl mobile:text-lg garet-book'>
                      En tjeneste for dem som er fugle- og naturinteresserte som
                      vil bidra til å bevare og beskytte mangfoldet
                    </p>
                    <img
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='paragraph flex flex-col gap-5 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      Innhold
                    </h1>
                  </div>
                  <ul className={`${styles.projectSlideShowParagraphTitle}`}>
                    <li>- Case</li>
                    <li>- Mål</li>
                    <li>- Empati</li>
                    <li>- Definer</li>
                    <li>- Ideer</li>
                    <li>- Prototype</li>
                    <li>- Test</li>
                    <li>- Evaluer</li>
                    <li>- Veien videre</li>
                    <li>- En design utfordring</li>
                    <li>- Gammel og ny tjeneste</li>
                    <li>- Figma prototype</li>
                    <li>- Erfaringer</li>
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='paragraph flex flex-col gap-5 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      Caset 🛠️
                    </h1>
                    <p className={`${styles.projectSlideShowP} `}>
                      Den norske tjenesten for ringmerking av fugler,
                      Ringmerking.no, hadde blitt meget gammel og trengte en
                      nylansering. Hvordan kan vi gi liv til en meget gammel
                      fugleregistreringstjeneste for å tiltrekke nye brukere,
                      øke brukeradopsjonen, og til slutt oppnå høyere
                      registreringsrater for nye fugler?
                    </p>
                  </div>
                  <div className='paragraph flex flex-col gap-5 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      Min Rolle 🕴🏼
                    </h1>
                    <p className={`${styles.projectSlideShowP} `}>
                      Som UX-designer i et team på to designere og fire
                      utviklere, jobbet jeg med å utføre brukerinnsiktsarbeid,
                      analysere og evaluere brukerinsikten, ideere over
                      lavfidelitets skisseprototyper og overføre disse til
                      Figma, teste prototyper med brukere, designe identiteten
                      til tjenesten, utvikle klikkbare høyfidelitetsprototyper i
                      Figma – samt kommunisere alt dette til resten av teamet
                    </p>
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                      Målet 🎯
                    </h1>
                    <p className={` ${styles.projectSlideShowP}`}>
                      Den norske tjenesten for ringmerking av fugler,
                      Ringmerking.no, hadde blitt meget gammel og trengte en
                      nylansering. Hvordan kan vi gi liv til en meget gammel
                      fugleregistreringstjeneste for å tiltrekke nye brukere,
                      øke brukeradopsjonen, og til slutt oppnå høyere
                      registreringsrater for nye fugler?
                    </p>
                  </div>

                  {/* the three row aligned paragraph */}
                  <div className='paragraphcontainer flex flex-row gap-10 mobile:flex-col'>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={` ${styles.projectSlideShowParagraphTitle} `}
                      >
                        Øke brukeradopsjon
                      </h1>
                      <p className={` ${styles.projectSlideShowP} opacity-60 `}>
                        Kunden ønsket å øke antallet brukere til 10.000 på
                        nasjonalt basis, noe som ville være en 30 % økning. Økt
                        brukeradopsjon ville ha en positiv innvirkning på
                        innsamling av data og beskyttelsen av den norske
                        fuglebestanden
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 text-lg'>
                      <h1
                        className={` ${styles.projectSlideShowParagraphTitle} `}
                      >
                        Mobile-first
                      </h1>
                      <p className={` ${styles.projectSlideShowP} opacity-60 `}>
                        Den eksisterende løsningen var kun tilgjengelig på PC,
                        noe som gjør at et svært stort antall mobilbrukere blir
                        utelatt. En mobil løsning hadde muliggjort
                        ringmerkingsregistreringer på farten
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 text-lg'>
                      <h1
                        className={` ${styles.projectSlideShowParagraphTitle} `}
                      >
                        Tiltrekke yngre brukere
                      </h1>
                      <p className={` ${styles.projectSlideShowP} opacity-60 `}>
                        Som en del av ønsket om økt brukeradopsjon, ønsket
                        kunden at tjenesten skulle være mer appellerende for
                        unge brukere. Å bruke tjenesten i skolen var et ønskelig
                        utfall?
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={` ${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                        Empati 🙇🏼‍♂️
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      For å forstå designutfordringen er første steg å vise
                      empati for brukeren som påvirkes av problemet. Dette
                      innebar at vi intervjuet to erfarne brukere som har
                      benyttet tjenesten siden den ble utviklet i 2004. I
                      tillegg var to domeneeksperter fra Sabima med for å bidra
                      med innsikt.
                    </p>
                  </div>

                  <div className='bodycontainer flex flex-row gap-10 mobile:flex-col'>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          "Tjenesten fungerer som den skal"
                        </h1>
                        <p className={`${styles.projectSlideShowP}`}>
                          Ekspertbrukeren hadde ikke mange ønsker til siden, og
                          mente den for det meste var funksjonell og effektiv
                          for sine gjøremål
                        </p>
                      </div>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          "Vi trenger flere ringmerkere"
                        </h1>
                        <p className={`${styles.projectSlideShowP}`}>
                          Det var allikevel et opprop blant ekspertbrukerene at
                          de ønsket flere brukere og ikke minst registreringer
                          til tjenesten. De mente at initiativet og ansvaret om
                          ringmerking og fugle forvalting var viktig og burde
                          være mer tilgjengelig for flere"
                        </p>
                      </div>
                    </div>

                    <img
                      className='w-3/5 h-3/5'
                      src={empathyMapEN}
                      alt='designutfall'
                    />
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={` ${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                        Empati 🙇🏼‍♂️
                      </h1>
                    </div>
                  </div>

                  <div className='midtextcontainer flex flex-row gap-10'>
                    {/* the two col aligned paragraph */}
                    <p className='garet-book text-center text-2xl  mobile:text-xl sm:text-2xl '>
                      Konflikt: hvordan kan man re-designe løsningen for å
                      appellere til flere nye brukere samtidig som man
                      respekterer de eksisterende praksisene til ekspert
                      brukerene?{' '}
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        Definere ✍🏼
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      Basert på innsikten fra ekspert bruker-intervjuene og
                      samarbeidet med domene ekspertene og resten av teamet ble
                      tre hovedområder definert for problem rommet.
                    </p>
                  </div>

                  <div className='paragraphcontainer flex flex-row gap-10 mobile:flex-col'>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Letter for flere ✅
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Tjenesten som er i dag, er for tungvindt og vanskelig å
                        bruke, noe som gjør at den ikke appellerer til nye,
                        spesielt yngre, brukere. Den er også umulig å bruke på
                        mobil, noe som igjen utelukker mange bruksområder og
                        brukere
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Attraktiv for flere 👨‍👩‍👦‍👦
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Konseptet å registrere ringmerkede fugler byr på mange
                        interaksjonsmuligheter, som å observere fuglen,
                        registrere fuglen, følge med på fuglens reise, lese
                        informasjon om arten. Det burde være en bedre flyt
                        mellom disse interaksjonsformene.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Ekspert brukere 👩🏼‍⚕️
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Ekspertbrukeren hadde ikke mange ønsker til tjenesten,
                        og mente den for det meste var funksjonell og effektiv
                        for deres behov."
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={` ${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                        Idé generering 🧠
                      </h1>
                    </div>

                    <p className={` ${styles.projectSlideShowP}`}>
                      Basert på de tre hovedområdene som var definert ved
                      problemet startet idé genererings fasen som først innebar
                      å bruke overblikket som hadde dannet seg til å oppdage
                      mulighets rommet.
                    </p>
                  </div>

                  <div className='bodycontainer flex flex-row gap-10 mobile:flex-col'>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10 '>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          Bruker interaksjonen
                        </h1>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Et tematisk kart over den generelle
                          brukerinteraksjonen ble tegnet for å forstå
                          relasjonene mellom de forskjellige interaksjonsleddene
                          og hvordan de henger sammen.
                        </p>
                      </div>
                    </div>

                    <img
                      className='w-4/4 h-3/5 sm:w-4/4 sm:h-3/4 md:w-3/5 md:h-3/5'
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        Idé generering 🧠
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      Basert på de tre hovedområdene som var definert ved
                      problemet startet idé genererings fasen som først innebar
                      å bruke overblikket som hadde dannet seg til å oppdage
                      mulighets rommet.
                    </p>
                  </div>

                  <div className='bodycontainer flex flex-row gap-10 mobile:flex-col'>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          Skissering
                        </h1>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          For å utnytte mest kreativitet og kunnskap deltok hele
                          teamet på skisserings prosessen som startet med en
                          crazy 8’s skissering på ark før vi skisserte ute en av
                          ideene over en halv time.
                        </p>
                      </div>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          Valg av idé
                        </h1>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Hver av team medlemmene gikk og vurderte hver ide og
                          skrev opp kommentarer de mente var nyttige. Til slutt
                          ble en demokratisk dot-avstemnings metode brukt for å
                          bestemme idé.
                        </p>
                      </div>
                    </div>
                    {/* //TODO: bilde karusell */}
                    <img
                      className='w-4/4 h-3/5 sm:w-4/4 sm:h-3/4 md:w-3/5 md:h-3/5'
                      src={designUtfall}
                      alt='designutfall'
                    />
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        Den geniale ideen.... 💡
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      Basert på de tre hovedområdene som var definert ved
                      problemet startet idé genererings fasen som først innebar
                      å bruke overblikket som hadde dannet seg til å oppdage
                      mulighets rommet.
                    </p>
                  </div>

                  <div className='bodycontainer flex flex-row gap-10 mobile:flex-col'>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          Hva er ringmerking (stjerne)
                        </h1>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          “Hva er ringmerking?” var ideen som vant og som vi
                          gikk videre med til prototype fasen. Den første
                          prototypen ble tegnet ut på en tavle slik at hele
                          teamet hadde overblikk over hva som skulle utvikles.
                        </p>
                      </div>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          Mobile-first
                        </h1>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Mobile-first ble også fastslått som grunnlaget for at
                          vi designet for en mobil platform og ikke desktop
                          eller tablet. Dette valget ble tatt fordi kunden,
                          Sabima, ønsket en mobile-first løsning, og fordi det
                          er større potensiale å tiltrekke nye brukere ved å
                          lage en mobil tjeneste sammenlignet med en desktop
                          tjeneste.
                        </p>
                      </div>
                    </div>

                    <img
                      className='w-4/4 h-3/5 sm:w-4/4 sm:h-3/4 md:w-3/5 md:h-3/5'
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        Prototype 🎮
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      Ideen om å øke og forbedre informasjonen omkring de
                      fuglene som kunne bli ringmerket, samt å forenkle
                      registreringsprosessen, førte til at en førsteutgave av
                      Figma-prototypen ble utviklet.
                    </p>
                  </div>

                  <div className='bodycontainer flex flex-row gap-10 mobile:flex-col'>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'>
                      <div className='paragraph flex flex-col gap-5 '>
                        <h1
                          className={`${styles.projectSlideShowParagraphTitle}`}
                        >
                          Første iterasjon
                        </h1>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Den første iterasjonen av prototypen var basert på
                          ideen, 'Hva er ringmerking?' Derfor var det første
                          fokusområdet å tilby mer relevant og presis
                          informasjon om ringmerking som en del av opplevelsen.
                        </p>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Registreringen av en fugl skulle være så enkel som
                          mulig for å gjøre det lettere for nye brukere, og
                          dette førte til at denne funksjonaliteten ble flyttet
                          frem til forsiden av appen.
                        </p>
                      </div>
                    </div>

                    <img
                      className='w-4/4 h-3/5 sm:w-4/4 sm:h-3/4 md:w-3/5 md:h-3/5'
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        Bruker testing 🗣️
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      Basert på de tre hovedområdene som var definert ved
                      problemet, startet idégenereringsfasen. Den første fasen
                      innebar å bruke oversikten som hadde dannet seg for å
                      oppdage mulighetsrommet. Brukerne ble testet med den
                      første iterasjonen av prototypen på en iPhone vi hadde
                      tilgjengelig
                    </p>
                  </div>
                  <div className='w-full h-full flex justify-center items-center'>
                    <img
                      className='w-4/4 h-3/5 sm:w-2/4 sm:h-2/4 md:w-2/5 md:h-2/5'
                      src={usertesting}
                      alt='designutfall'
                    />
                  </div>

                  <div className='paragraphcontainer flex flex-row gap-10 mobile:flex-col'>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Hvem 👨‍👩‍👦‍👦
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Da det var viktig å fokusere på både eksisterende og nye
                        fremtidige brukere, ble personer fra begge disse
                        gruppene kalt inn til brukertesting.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Hvordan 🤔
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Eksisterende brukere ble nådd ut til via
                        interessegrupper for naturvern og fuglekikkere. Nye
                        brukere ble nådd ut til via Facebook-sider for
                        universiteter og eventgrupper for byen.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Hvor 📍
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Brukerne ble kalt inn til kontoret der vi jobbet, som lå
                        sentralt i Oslo. Brukerne ble også informert på forhånd
                        om hvor brukertestene ville finne sted.
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        Resultat 🏁
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      Den første iterasjonen av prototypen hadde blitt testet
                      med nye og eksisterende brukere
                    </p>
                  </div>

                  <div className='bodycontainer flex flex-row gap-10'>
                    {/* the two col aligned paragraph */}
                    <div className='paragraphcontainer flex flex-col gap-10'></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* målet 2 */}
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <div className='titleparagraph-sub flex flex-col gap-2'>
                      <h1 className={`${styles.projectSlideShowPageSubTitle}`}>
                        Design sprint
                      </h1>
                      <h1 className={`${styles.projectSlideShowPageTitle}`}>
                        Resultat 🏁
                      </h1>
                    </div>

                    <p className={`${styles.projectSlideShowP}`}>
                      Resultatene fra første brukertestingsrunde la grunnlaget
                      for hvilke områder av appen som burde justeres. Innsikten
                      var likevel ikke 100 prosent representativ for de to
                      brukergruppene, da det totalt var kun fire brukere som ble
                      innkalt til brukertesting. Dette ga oss likevel en
                      indikasjon på deres opplevelse og bruk. Antallet brukere
                      innkalt til brukertesting burde helst vært høyere, men
                      brukertesting er tidskrevende, og dette var kun en første
                      iterasjonsprototype.
                    </p>
                  </div>

                  <div className='paragraphcontainer flex flex-row gap-10 items-baseline mobile:flex-col'>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1 className={`text-5xl mobile:text-4xl}`}>1.</h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        Registreringssekvensen for å registrere et funn var
                        lettvint, men det var elementer under denne sekvensen
                        som kunne bli designet for å gjøre registreringen mindre
                        forvirrende.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1 className={`text-4xl mobile:text-3xl}`}>2.</h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        Brukerprofilsiden var uoversiktlig. Det var vanskelig å
                        forstå forskjellen på funn, individ og art. Det var
                        heller ikke åpenbart hva favorittfunksjonaliteten var.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1 className={`text-3xl mobile:text-2xl}`}>3.</h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        Kartfunksjonen, som gjorde det mulig å følge med på
                        fuglens reise, var interessant og ble oppfattet som et
                        viktig element i brukeropplevelsen.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1 className={`text-2xl mobile:text-xl}`}>4.</h1>
                      <p className={`${styles.projectSildeShowP} opacity-60`}>
                        Informasjonssiden om hvorfor og hva ringmerking var, som
                        var implementert på første side, var nyttig for nye
                        brukere som ikke hadde kjennskap til tjenesten før
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
                <div
                  id='id-slidecontainer'
                  className='flex flex-col gap-20 mobile:flex-col '
                >
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      Veien videre etter sprinten 🚌
                    </h1>

                    <p className={`${styles.projectSlideShowP}`}>
                      Etter sprinten var prioriteringen å utvikle andre utgave
                      av Figma prototypen basert på resultatene fra bruker
                      testingen, dette var også viktig for at utviklerene kunne
                      starte med det tekniske. Samtidig var det behov for
                      ytterlig testing og intervjuer med brukere ettersom flere
                      funksjoner ble implementert.{' '}
                    </p>
                  </div>
                  {/* userPrototype, userResearch, designExpression, */}

                  <div className='paragraphcontainer flex flex-row gap-10 items-baseline mobile:flex-col'>
                    <div className='paragraph flex flex-col gap-5 '>
                      <img
                        className='w-full lg:w-4/4 h-2/4 '
                        src={userResearch}
                        alt='Description of the image'
                      />
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Innsiktsarbeid
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Etterfulgt av design sprinten var mitt ansvar å utføre
                        mer innsiktsarbeid omkring domenet ringmerking og
                        naturvern. Det ble også avholdt flere ytterligere runder
                        med brukertesting og intervjuer etter hvert som det ble
                        utviklet flere iterasjoner av prototypen. Disse var jeg
                        med på å fasilitere.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <img
                        className='w-full lg:w-4/4 h-2/4 '
                        src={designExpression}
                        alt='Description of the image'
                      />
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Design uttrykk
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Jeg jobbet også med å utvikle designuttrykket til
                        tjenesten. Dette var basert på innsiktsarbeidet som
                        tidligere ble utført, og ble mer viktig i takt med
                        fremgangen med Figma-prototypen. Dette ansvaret
                        inkluderte å jobbe med moodboards, utforske
                        fargeprofiler som kunne passe tjenesten, og jobbe med
                        merkevareassosiasjon.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <img
                        className='w-full lg:w-3/4 h-2/4 '
                        src={userPrototype}
                        alt='Description of the image'
                      />
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Figma prototype
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Sammen med min meddesigner var mitt ansvar å jobbe med å
                        utvikle Figma-prototypen gjennom flere iterasjoner etter
                        hvert som flere funksjoner ble foreslått og testet.
                        Ansvaret innebar å utvikle trådskisser, utvikle viktige
                        komponenter i designsystemet, jobbe med brukerreisen,
                        sette sammen prototypene, og kommunisere
                        designavgjørelser til resten av teamet
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
                <div
                  id='id-slidecontainer'
                  className='flex flex-col gap-20 mobile:flex-col '
                >
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      En design utfordring 🧐
                    </h1>

                    <p className={`${styles.projectSlideShowP}`}>
                      Etter sprinten var prioriteringen å utvikle andre utgave
                      av Figma prototypen basert på resultatene fra bruker
                      testingen, dette var også viktig for at utviklerene kunne
                      starte med det tekniske. Samtidig var det behov for
                      ytterlig testing og intervjuer med brukere ettersom flere
                      funksjoner ble implementert.{' '}
                    </p>
                  </div>

                  <div className='paragraphcontainer flex flex-row  gap-36 mobile:flex-col'>
                    <div className='paragraphcol flex flex-col'>
                      <div className='paragraph flex flex-row gap-5 mobile:flex-col'>
                        <img
                          className='mobile:w-3/4 lg:w-3/4 h-3/4 mobile:order-last'
                          src={designChallenge}
                          alt='Description of the image'
                        />
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Hvordan skal man skille mellom to fugle arter som har
                          lik farge på ring når man registrerer
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col justify-center align-center'>
                      <p className={`text-6xl`}>~</p>
                    </div>

                    <div className='paragraphcol2 flex flex-col '>
                      <div className='paragraph flex flex-row gap-5 mobile:flex-col '>
                        <p
                          className={`${styles.projectSlideShowP}  sm:w-2/5 opacity-60`}
                        >
                          Måten vi løste denne designutfordringen på var ved å
                          implementere en verifiseringsmodul som det første
                          brukeren ser etter å ha tastet inn ringnummeret. Dette
                          fungerte som en forebyggende funksjon for å forhindre
                          feilregistreringer, noe som var en større bekymring
                          blant ekspertbrukere
                        </p>
                        <img
                          className='object-contain mobile:w-2/4 sm:w-2/6 '
                          src={designChallengeSolution}
                          alt='Description of the image'
                        />
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      Gammel og ny tjeneste 🎁
                    </h1>

                    <p className={`${styles.projectSlideShowP}`}>
                      Etter sprinten var prioriteringen å utvikle andre utgave
                      av Figma prototypen basert på resultatene fra bruker
                      testingen, dette var også viktig for at utviklerene kunne
                      starte med det tekniske. Samtidig var det behov for
                      ytterlig testing og intervjuer med brukere ettersom flere
                      funksjoner ble implementert.{' '}
                    </p>
                  </div>

                  <div className='paragraphcontainer flex flex-row gap-10 mobile:flex-col'>
                    <div className='paragraphcol flex flex-col '>
                      <div className='paragraph flex flex-col  gap-5 '>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Ny tjeneste
                        </p>
                        <img
                          className='object-contain w-full lg:w-3/4 h-3/4 '
                          src={designUtfall}
                          alt='Description of the image'
                        />
                      </div>
                    </div>
                    <div className='paragraphcol2 flex flex-col'>
                      <div className='paragraph flex flex-col gap-5 '>
                        <p className={`${styles.projectSlideShowP} opacity-60`}>
                          Gammel tjeneste
                        </p>
                        <img
                          className='object-contain w-full '
                          src={oldsite}
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      Figma prototype 🎮
                    </h1>

                    <p className={`${styles.projectSlideShowP}`}>
                      Her er den endelig utgaven av prototypen (5) som også ble
                      utviklet som en web-app designet for mobile-first
                    </p>
                  </div>

                  <div className='paragraphcontainer flex flex-row gap-10'>
                    <div className='paragraphcol w-full flex justify-center items-center flex-col'>
                      <p
                        className={`${styles.projectSlideShowP} opacity-60`}
                      ></p>
                      <img
                        className='object-contain w-2/5 cursor-pointer'
                        src={prototypePlaceholder}
                        alt='Description of the image'
                        onClick={() =>
                          window.open(
                            'https://www.figma.com/proto/luE2AxlVtZQhwBOWhaOBWJ/Final-design-sprint---Kantega?page-id=0%3A1&node-id=1-16074&viewport=696%2C112%2C0.12&scaling=scale-down&starting-point-node-id=1%3A16074',
                            '_blank'
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
                <div id='id-slidecontainer' className='flex flex-col gap-20 '>
                  <div className='titleparagraph flex flex-col gap-10 '>
                    <h1 className={`${styles.projectSlideShowPageTitle}`}>
                      Erfaringen fra arbeidet
                    </h1>

                    <p className={`${styles.projectSlideShowP}`}>bla bla bla</p>
                  </div>

                  <div className='paragraphcontainer flex flex-row gap-10 mobile:flex-col'>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Ulike forventninger 🤷🏼
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Som designer er det umulig å imøtekomme alle
                        forventningene og ønskene til både kunden og brukerne. I
                        tillegg har man sine meninger om hvordan
                        brukeropplevelsen/brukergrensesnittet burde være. Ofte
                        ender man opp i en slags meklerrolle der det er viktig å
                        kommunisere den innsikten man har om brukeren og domenet
                        til kunden på en enkel og grei måte.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Design != produkt 🥨
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Designet av en brukeropplevelse eller et
                        brukergrensesnitt er én ting, en annen ting er de
                        tekniske implementasjonene som må til for å utvikle et
                        brukbart produkt som kunden kan bruke. Det tekniske
                        utgjør ofte en begrensning her. Derfor er det ekstra
                        viktig å ha et godt samarbeid og kommunikasjon mellom
                        designere og utviklere.
                      </p>
                    </div>
                    <div className='paragraph flex flex-col gap-5 '>
                      <h1
                        className={`${styles.projectSlideShowParagraphTitle}`}
                      >
                        Viktig testing tar tid ⏳
                      </h1>
                      <p className={`${styles.projectSlideShowP} opacity-60`}>
                        Brukertesting av en prototype er kostbart når det
                        gjelder tid og energi. Allikevel er en prototype som
                        ikke kan brukes, bortkastet tid. Brukertesting burde
                        gjøres ofte, i takt med å jobbe i hyppige iterasjoner.
                        Hvis man ikke har tid til å kalle inn brukere til
                        brukertesting, kan man alltids teste på andre kolleger
                        eller venner.
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
