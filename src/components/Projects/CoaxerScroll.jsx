import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { styles } from '../../styles';
import {
  coaxerFrontCover,
  introductionImg,
  doubleDiamond,
  ouruserChristian,
  contactChristian,
  ultraPerosnalizedDesign,
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
  doublediamondDefine,
  coaxerscenario,
  meeting1,
  meeting2,
  meeting3,
  calendarIntegration,
  coaxerFrontPage,
  evaluationImpact,
  intersectionNO,
  doublediamondDiscover,
  relevantPunkterNO,
  uppd,
  uppdChristian,
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
  const activeSlideRef = useRef(null);
  const slideTotalRef = useRef(null);
  const upBtnRef = useRef(null);
  const downBtnRef = useRef(null);

  // Your GSAP animations using ScrollTrigger and ScrollToPlugin go here
  useEffect(() => {
    const panels = panelsRef.current;
    const activeSlide = activeSlideRef.current;
    const slideTotal = slideTotalRef.current; // the count of slides set by the span element
    const sections = sectionsRefs.current;
    const totalSlides = sections.length;
    const upBtn = upBtnRef.current;
    const downBtn = downBtnRef.current;

    const goToPanel = (thePanel) => {
      console.log('goToPanel targeting: ', '#panel_' + thePanel);

      gsap.to(panels, {
        ease: 'power4.inOut',
        duration: 0.55,
        scrollTo: {
          y: '#panel_' + thePanel,
          autoKill: false,
        },
      });
    };
    const panelDown = (event) => {
      console.log('Down button clicked');

      let nextPanel = parseInt(event.target.getAttribute('data-down'), 10);
      if (!isNaN(nextPanel) && nextPanel <= totalSlides) {
        goToPanel(nextPanel);
      }
    };

    const panelUp = (event) => {
      console.log('Up button clicked');
      let prevPanel = parseInt(event.target.getAttribute('data-up'), 10);
      console.log('Attempting to scroll to: ', '#panel_' + prevPanel);
      if (!isNaN(prevPanel) && prevPanel >= 1) {
        goToPanel(prevPanel);
      }
    };

    downBtn.addEventListener('click', panelDown);
    upBtn.addEventListener('click', panelUp);

    const updateUI = (keyIndexDown) => {
      if (keyIndexDown > 2) {
        upBtn.style.opacity = '1'; // Enabled
        upBtn.style.pointerEvents = 'all'; // Make it clickable
        upBtn.style.cursor = 'pointer'; // Make it clickable
      } else {
        upBtn.style.opacity = '0.5'; // Half opacity to show it's disabled
        upBtn.style.pointerEvents = 'none'; // Make it non-clickable
      }

      if (keyIndexDown > totalSlides) {
        downBtn.style.opacity = '0.5'; // Half opacity to show it's disabled
        downBtn.style.pointerEvents = 'none'; // Make it non-clickable
      } else {
        downBtn.style.opacity = '1'; // Enabled
        downBtn.style.pointerEvents = 'all'; // Make it clickable
        downBtn.style.cursor = 'pointer'; // Make it clickable
      }
    };

    const slidesAll = sections.length;
    slideTotal.innerHTML = slidesAll;
    // console.log('these are the sections', sections);

    sections.forEach((eachPanel, index) => {
      const realIndex = index + 1;

      ScrollTrigger.create({
        scroller: panels,
        trigger: eachPanel,
        start: 'top 50%',
        end: 'top bottom',
        onLeave: function () {
          eachPanel.classList.add('active');
          activeSlide.innerHTML = realIndex;
          let indexNext = realIndex + 1;
          let indexPrev = realIndex - 1;

          indexNext = Math.min(indexNext, slidesAll);
          indexPrev = Math.max(indexPrev, 1);
          console.log('onLeave: ', indexPrev, indexNext);

          downBtn.setAttribute('data-down', indexNext);
          upBtn.setAttribute('data-up', indexPrev);

          updateUI(indexNext);
        },
        onLeaveBack: function () {
          eachPanel.classList.remove('active');
          let realIndexBack = realIndex - 1;
          activeSlide.innerHTML = realIndexBack;
          let indexNext = realIndex;
          let indexPrev = realIndex - 2;

          console.log('onLeaveBack: ', indexPrev, indexNext);
          // Make sure to also update these buttons in your component
          downBtn.setAttribute('data-down', indexNext); // Corrected from dnBtn

          upBtn.setAttribute('data-up', indexPrev);
          // Make sure to also implement the updateUI function, or remove this if not needed
          updateUI(indexNext);
        },
      });
    });

    return () => {
      upBtn.removeEventListener('click', panelUp);
      downBtn.removeEventListener('click', panelDown);
    };
  }, []);

  const playSound = (audioFile) => {
    console.log('The audio file played: ', audioFile)

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
      <div className='bg-[#ffffff] w-full h-full'>
        {/* pagination arrows */}
        <div className={`${styles.coaxerScrollControls} `}>
          <a
            ref={upBtnRef}
            className='coaxerScrolControlsA disabled opacity-50'
            data-up='1'
          >
            &uarr;
          </a>{' '}
          <a
            ref={downBtnRef}
            className='coaxerScrolControlsA down cursor-pointer'
            data-down='2'
          >
            &darr;
          </a>
        </div>
        {/* pagination numbers */}
        <span className='text-2xl garet-book fixed bottom-10 right-[calc(20px+100px)] z-40'>
          <span ref={activeSlideRef} className='activeSlide'>
            1
          </span>
          /
          <span ref={slideTotalRef} className='slideTotal'>
            26
          </span>
        </span>

        <div ref={panelsRef} className={`${styles.coaxerScrollPanels} `}>
          {/* panel 1 */} {/* frontpage */}
          <div
            id='panel_1'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} `}
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
                <p className='lg:text-left lg:w-3/4 text-xl mobile:text-lg garet-book'>
                  Personalized task management developed through ultra
                  personalized design
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
            className={`${styles.coaxerScrollPanel} bg-[#e9f7b7]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Introduksjon
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  {/* {t('portfolio.ringmerking.page3.titleP')} */}
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className={`${styles.projectSlideShowTitleParagraph}`}>
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    Coaxer var et student prosjekt om digital helse med et
                    utgangspunkt om å utforske hvordan digital teknologi kan
                    brukes for å forbedre folks velvære. Prosjektet endte med å
                    dreie seg om mental helse og stress for yngre voksne, hvor
                    tjenesten Coaxer ble utviklet som en ultra-personlig tids
                    planlegger med henblikk på å forbedre mentalt helse og
                    redusere generell stress. De følgende sidene vil handle om
                    design prosessen bak Coaxer.
                  </p>
                </div>
                <LazyLoadImage
                  className='w-full lg:w-2/4 md:w-2/4 sm:w-2/4 h-auto'
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className={`${styles.projectSlideShowTitleParagraph}`}>
                  <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                    Min rolle
                  </h1>
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    Under prosjektet jobbet jeg i første omgang med å utføre
                    innsiktsarbeid om domenet som var valgt. Etter at ideen om
                    Coaxer ble unfanget, ble jeg hoveddesigner og utvikler for
                    prosjektet. I praksis vil det si at jeg har designet og
                    kodet hele appen (med innspill fra de andre og Christian
                    selvfølgelig)
                  </p>
                </div>
                <div className={`${styles.projectSlideShowTitleParagraph}`}>
                  <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                    Mitt ansvar
                  </h1>
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    I løpet av innsiktsarbeidet samt design og utvikling var jeg
                    ansvarlig for å formidle ny kunnskap om oppgaven til resten
                    av gruppen. Jeg var også ansvarlig for å oppdatere og
                    samarbeide med resten av design gruppen om hvilke endringer
                    som ble gjort og hvilke nye funksjoner det var verdt å
                    utforske.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* panel 4 */}
          <div
            id='panel_4'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Hva er allerede funnet ut?
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Det første vi startet med var å ta et falkeblikk over
                  litteraturen om mental helse for yngre voksne og utforske noen
                  av de konseptene og funnene vi mente var viktige og
                  interessante og kunne tenke oss å ta et dypere dykk i.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer}  `}>
                <div className='w-full h-full flex gap-10 flex-col items-center '>
                  <LazyLoadImage
                    className='w-full lg:w-2/4 md:w-2/4 sm:w-2/4 h-auto'
                    src={intersectionNO}
                    alt='Description of the image'
                  />
                  <p className={` ${styles.projectSlideShowPageP} opacity-60 `}>
                    Dette var de mest relevante funnene vi gjorde oss
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* panel 5 */}
          <div
            id='panel_5'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Formulering av design spørsmålet ⁉️
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Basert på litteratur søket og vår interesse valgte vi å gå
                  videre med hvordan tidsplanlegging kan brukes preventivt for
                  yngre voksne som føler stress.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <p className='garet-book text-center text-2xl  mobile:text-xl sm:text-2xl '>
                  Hvordan kan vi utnytte konseptet om strukturert
                  tidsplanlegging knyttet opp mot digital helse for å løse
                  problemet om stress og nedsatt velvære for studenter som oss
                  selv?
                </p>
              </div>
            </div>
          </div>
          {/* panel 6 */}
          <div
            id='panel_6'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Hva er mest relevant?
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  På grunn av den brede formuleringen av design spørsmålet ble
                  vi nødt til å snevre det inn ved å stille spørsmål om hva vi
                  mente var mest interessant.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} relative`}
              >
                <div className='w-full h-full flex flex-col gap-10 items-center'>
                  <LazyLoadImage
                    className='w-full lg:w-3/4 h-auto mx-auto'
                    src={relevantPunkterNO}
                    alt='Description of the image'
                  />

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto mx-auto'
                    src={doublediamondDiscover}
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Vår bruker
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Under oppdagelses fasen nevnte en av designerne at de hadde en
                  venn som de visste levde et veldig hektisk liv og som kunne
                  være en relevant kandidat for design spørsmålet. Etter å ha
                  vurderte muligheten i en kort stund bestemte vi oss for å gå
                  videre med dette utgangspunktet og kontakte ham.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col lg:flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Christian
                    </h1>

                    <ul className='garet-book opacity-60 text-lg mobile:text-xs sm:text-sm md:text-base'>
                      <li>
                        - Gitarist som elsker musikk og har spilt i band i flere
                        år
                      </li>
                      <li>
                        - Fortiden journaliststudent på Aarhus Universitet
                      </li>
                      <li>
                        - Kjæreste med sitt videregående crush som han bruker
                        mye tid med
                      </li>
                      <li>
                        - Deltids ansatt på det lokale supermarkedet hvor han
                        jobbet ettermiddager
                      </li>
                      <li>- Spilte ofte squash med kompiser etter skole.</li>
                      <li>
                        - Glad hundeier og satte pris på en god tur i parken når
                        tiden tillot det
                      </li>
                    </ul>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    ></p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Getting in contact with Christian
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Kontakten med Christian ble etablert gjennom et første
                  intervju med Frederik (Co-designer), som er en venn av
                  Christian. Frederik delte informasjon om Christian og deres
                  vaner og rutiner som ga oss et utgangspunkt for hvordan vi
                  skulle gå videre med design prosessen.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col lg:flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Frederik (Co-designer)
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Frederik nevnte i tillegg til temaene om digital helse og
                      stress mestring konseptet om tidsplanlegging. Utover å
                      høre med Christian om han var interessert et samarbeid,
                      var et av formålene å kartlegge hvilke områder man kunne
                      inkorporerer ultra personlig design for Christian.
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Christian
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Christian var under første møte med Frederik interessert i
                      tema om digital helse, mentalt velvære og stress mestring.
                      Dette var temaer som han mente hadde og kunne få en stor
                      innvirkning på hverdagen hans.
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Ultra personlig design
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  På nogenlunde samme tidspunkt oppdaget vi også konseptet om
                  ultra personlig design, som handler om de tre følgende
                  prosessene.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Gathering data from the end user
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Ultra-personalized design involves collecting data from
                      the user before and during the use and development of the
                      product. This data helps in understanding the user's
                      preferences, needs, and behaviors.
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Design decisions based on user data
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      The design decisions in an ultra-personalized approach are
                      based on the data gathered from the user. These decisions
                      are tailored specifically to the individual user, taking
                      into account their unique requirements and preferences.
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Customization and personalization
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Ultra-personalized design goes beyond generic
                      customization options. It aims to create a product that is
                      fully personalized and customized to fit the user's
                      specific needs and preferences. This level of
                      customization allows for a more seamless and intuitive
                      user experience.
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-3/5 h-auto object-contain'
                    src={uppd}
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  The perfect match
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  The fit between Christian (who we had in our minds from
                  earlier) and the novel and unfamiliar yet exiting design
                  methodology of ultra-personalized design, set the stage for
                  the configuration of the design process. Our idea was to
                  combine the two and explore if Christian was interested in
                  partaking in such a project.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Christian
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Christian as a busy student and musician lived a life with
                      multiple responsibilities and events that called for this
                      time. Could we utilized design thinking and digital
                      technology to have a positive influence on Christian’s
                      well being ?
                    </p>
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph}  justify-center items-center text-6xl rotate-90 md:rotate-0`}
                  >
                    =
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Ultra personlig design
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Was ultra personalized design the right design concept for
                      Christian as our end-user? This was a design concept
                      similar to user-centered design and participatory design
                      but with a greater emphasis on continuously design
                      development.
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Duo ethnography...(metodologi)
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Da dette var et akademisk bachelor prosjekt var den valgte
                  metodologien for oppgaven viktig. Duo-etnografi ble valgt som
                  en forskningsmetode der to eller flere forskere samarbeider om
                  å produsere en dialogisk fortelling basert på deres egne
                  opplevelser og perspektiver. Dataene er dermed en
                  sammenligning av de diskuterte historiene, der forskerne har
                  reflektert over og omkonseptualisert sine tidligere
                  erfaringer.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Vennskap
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Ettersom co-designeren allerede var god venn med
                      Christian, var dette et godt utgangspunkt for å etablere
                      den dialogen som duo-ethnografi krever for å utveksle
                      historier og erfaringer mellom bruker og designer.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Utforske nye ideer
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Å dele lignende erfaringer muligjorde også
                      re-konseptualiseringer av tidligere erfaringer og til å
                      utforske elementene om mennesker, aktiviteter, omgivelser,
                      og teknologi som utgjøre analyse metoden PACT.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Flere forskere
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Det var behov for flere forskere under sesjonene i felt
                      arbeidet for å dekryptere den sammenflettede flytende
                      dialogen mellom co-designer og Christian ettersom denne
                      var vanskelig å tolke på kloss hold.
                    </p>
                  </div>
                </div>
                <div className='flex flew-row gap-10'>
                  <LazyLoadImage
                    className='w-2/5 lg:w-2/5 h-auto object-contain'
                    src={pact}
                    alt='pact analysis'
                  />
                  <LazyLoadImage
                    className='w-2/5 lg:w-2/5 h-auto object-contain'
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Ultra personlig design for Christain
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Basert på Frederiks første intervju med Christian startet vi
                  med å peke ut hva som var særegent med Christian, hvilket
                  potensiale vi ville ta tak i, og hvilke forbehold vi måtte ha
                  i mente.Basert på Frederiks første intervju med Christian
                  startet vi med å peke ut hva som var særegent med Christian,
                  hvilket potensiale vi ville ta tak i, og hvilke forbehold vi
                  måtte ha i mente.
                </p>
              </div>
              {/* the three row aligned paragraph */}

              <LazyLoadImage
                className='w-full h-auto object-contain'
                src={uppdChristian}
                alt='ultra personalized design christian'
              />
            </div>
          </div>
          {/* panel 13 */}
          <div
            id='panel_13'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Sonification and nudging
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Sonification and nudging emerged as concepts during the
                  literature search, and at a second glance, seemed relevant to
                  what we knew about Christian as a busy student and musician.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Sonification
                    </h1>
                    <div className='flex flex-col md:flex-row gap-10'>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60  `}
                      >
                        Soniﬁcation is the process of mapping data relations to
                        relations between sound parameters and presenting this
                        non-speech sound as informative guidance. It involves
                        using sound to convey information or communicate events.
                        Soniﬁcation can take the form of earcons, which are
                        abstract or concrete representations of events, or
                        musicons, which are musical sounds.
                      </p>
                      <LazyLoadImage
                        className='w-2/3 md:w-1/3 h-auto object-contain'
                        src={sonification}
                        alt='sonification'
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} flex-row`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Nudging
                    </h1>
                    <div className='flex flex-col md:flex-row gap-10'>
                      {' '}
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60 `}
                      >
                        Nudging, on the other hand, is an approach to motivate
                        individuals to make certain choices or take specific
                        actions. It involves using subtle cues or prompts to
                        influence decision-making and behavior. Nudges can be
                        graphical, auditory, physical, or lyrical in nature.
                        Self-nudging is a specific type of nudging that involves
                        modifying an individual's external world, both mentally
                        and physically, to counteract a lack of self-control.
                      </p>
                      <LazyLoadImage
                        className='w-2/3 md:w-1/3 h-auto object-contain'
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Addressing an idea with Christian
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  The previous enquiry into the fields of Sonification, Nudging
                  and time management conceived an idea based on what we knew
                  about Christian. Frederik (co-designer) initiated a new
                  meeting with Christian and proposed our idea of designing an
                  ultra personalized time management app that utilizes personal
                  earcons (Sonification) as a means to nudge him to complete
                  planned according to his prioritization.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col items-center `}
              >
                <LazyLoadImage
                  className='w-full lg:w-2/4 h-auto object-contain'
                  src={addressinganidea}
                  alt='addressing an idea'
                />
                <div className='flex flex-row'>
                  {/* <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Christian as the end user
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    ></p>
                  </div> */}
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    {/* <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      the meeting that took place
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Nudging, on the other hand, is an approach to motivate
                      individuals to make certain choices or take specific
                      actions. It involves using subtle cues or prompts to
                      influence decision-making and behavior. Nudges can be
                      graphical, auditory, physical, or lyrical in nature.
                      Self-nudging is a specific type of nudging that involves
                      modifying an individual's external world, both mentally
                      and physically, to counteract a lack of self-control.
                    </p> */}
                  </div>
                  {/* <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      visualization of the idea
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    ></p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* panel 15 */}
          <div
            id='panel_15'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Sonification.. hvordan?
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Soniﬁcation is the method of mapping data relations to
                  relations of sound parameters and presenting this non-speech
                  sound as informative guidance. Sonification is composed of
                  three different types of auditory cues, and of these, we had
                  to figure out which would fit Christian the best, following an
                  ultra-personalized design practice.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-row gap-10'>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Earcons
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Earcons are abstract small messages that communicate an
                      event. They are constructed by motives, which are short
                      rhythmic sequences varying in pitch. Earcons have a longer
                      learning curve compared to auditory icons.
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-2/4 h-auto object-contain'
                      src={earcon}
                      alt='addressing an idea'
                    />
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Auditory icons
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Auditory icons are sounds that represent specific actions
                      or events in a more concrete manner. For example, when a
                      user clicks on an object, they may hear a hitting sound
                      from a source like wood or metal. Auditory icons aim to
                      mimic real-world sounds and are easier to recognize and
                      understand compared to earcons.
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-2/4 h-auto object-contain'
                      src={auditoryicon}
                      alt='addressing an idea'
                    />
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Musicons
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Musicons are another form of sonification that involves
                      using short musical sequences or songs to convey
                      information. Musicons are derived from existing songs and
                      are cut into short segments. They can be used to represent
                      different types of events or actions
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-2/4 h-auto object-contain'
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Ultra personlig tidsplanlegger
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Et ultrapersonalisert tidsplanleggingsverktøy er et verktøy
                  for tidsstyring som er spesielt designet for en individuell
                  bruker. Det tar hensyn til brukerens unike behov, preferanser
                  og atferd for å skape en personlig opplevelse. Planleggeren
                  samler inn data om brukerens aktiviteter, tidsplaner og
                  prioriteringer, og tilpasser sitt design og funksjonalitet
                  deretter.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-row'>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3 gap-10`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Focus keeper
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Spesialiserer seg på Pomodoro-teknikken, som fremmer
                      fokuserte arbeidsøkter med korte pauser. Styrken ligger i
                      å hjelpe med å opprettholde konsentrasjonen og unngå
                      utbrenthet. Imidlertid er den kanskje ikke ideell for
                      oppgaver som krever lange, uavbrutte perioder.
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-2/4 h-auto object-contain'
                      src={focuskeeper}
                      alt='addressing an idea'
                    />
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      iPhone reminders
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Integreres sømløst med iOS og tilbyr enkelhet og
                      brukervennlighet. Styrken er i den greie, ukompliserte
                      tilnærmingen til å sette påminnelser og oppgaver, med
                      stedsbaserte varslinger. Men den mangler avanserte
                      funksjoner som prosjektstyring eller detaljert sporing.
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-2/4 h-auto object-contain'
                      src={iphonereminders}
                      alt='addressing an idea'
                    />
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Microsoft To Do
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Tilbyr omfattende oppgavestyringsfunksjoner, inkludert
                      deloppgaver, frister og filvedlegg. Den passer godt for
                      detaljert prosjektplanlegging og samarbeidsarbeid.
                      Imidlertid kan kompleksiteten være overveldende for
                      brukere som søker en enklere, minimalistisk
                      oppgavebehandler.
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-2/4 h-auto object-contain'
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
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Unfangelsen av Coaxer
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Coaxer is a task management app designed to improve time
                  management and reduce stress levels. It uses sonification
                  sounds as gentle reminders to prioritize and complete tasks in
                  three categories. The three categories are based on what is
                  most personal and important to the user.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-row'>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Designed to fit Christian
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer is specifically designed to fit Christian’s
                      personal life and existing routines. The app and the
                      concept will be designed and develop in tandem with
                      Christians feedback and use.
                    </p>
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Prioritization
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer utilizes a prioritization algorithm to nudge
                      Christian to do the taks he has specified, in accordance
                      to the level of prioritization of these tasks has. This
                      entails that tasks of higher prioritization will be
                      notified more often.
                    </p>
                  </div>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Genres of tasks
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer defines tasks within three general categories,
                      these are based on what is most important for Christian.
                      Each of these categories has their own distinct earcon
                      sound which makes them easier to recognize.
                    </p>
                  </div>
                </div>
                <div className='flex flew-row'>
                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
                    src={doublediamondDefine}
                    alt='doublediamond-define'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 18*/}
          {/* <div
            id='panel_18'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Scenario of Coaxer in practice
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}></p>
              </div>

             }

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-row'>
                  <div
                    className={`${styles.projectSlideShowTitleParagraph} w-1/3`}
                  >
                  
                    <h3 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Day 1:
                    </h3>
                    <ul>
                      <li>
                        Christian is at his childhood home with his parents.
                      </li>
                      <li>
                        His father asks for his help in cleaning the garage, so
                        Christian adds this task to the Coaxer app.
                      </li>
                      <li>
                        Christian plans to meet his childhood friends to play
                        tennis, so he adds this as a leisure activity in the
                        app.
                      </li>
                      <li>
                        He also has journalism homework to rehearse, which he
                        adds as an academic task with two iterations
                      </li>
                    </ul>
                    
                    <h3 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Day 2:
                    </h3>
                    <ul>
                      <li>
                        Christian wakes up early at 09:00 and records the
                        earcons for each category in the Coaxer app
                      </li>
                      <li>
                        He adjusts the sound of the leisure activity earcon in
                        the equalizer to his preference.
                      </li>
                      <li>
                        Christian is watching Netflix in his room when he hears
                        the earcon for helping his dad with the garage. He
                        recognizes the sound and decides to take a break from
                        the show to assist his dad.
                      </li>
                      <li>
                        He marks the task as done in the app after helping his
                        dad in the garage.
                      </li>
                      <li>
                        Christian's mother asks him to help her set up her
                        iCloud profile on her new iPhone, so he adds this as a
                        new task in the app and prioritizes it over his
                        rehearsal of music homework.
                      </li>
                    </ul>
                   
                    <h3 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Day 3:
                    </h3>
                    <ul>
                      <li>
                        Christian wakes up and reads the newspaper when he hears
                        the earcon for his journalism homework. He realizes that
                        he needs to work on it and decides to change the earcon
                        in the equalizer to a more motivating tone.
                      </li>
                      <li>
                        He spends time sunbathing on the terrace when he hears
                        the earcon for playing tennis with his friends. He
                        remembers the task and plans to fulfill it later.
                      </li>
                      <li>
                        Christian goes to bed and adds a new task to the app,
                        which is to help his mother with her iCloud profile.
                      </li>
                      <li>
                        He prioritizes this task over his rehearsal of music
                        homework by dragging it up in the task list.
                      </li>
                    </ul>
                  </div>
                  <LazyLoadImage
                    className='w-1/4 lg:w-3/4 h-auto object-contain'
                    src={coaxerscenario}
                    alt='coaxer scenario'
                  />
                </div>
              </div>
            </div>
          </div> */}
          {/* panel 19 */}
          <div
            id='panel_19'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Første møte med Christian
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Utviklingen av Coaxer startet med et ønske om å skape noe
                  virkelig personlig for Christian. Vi måtte derfor vite mer om
                  hvordan han planlegger tiden sin og hva som er verdt å
                  planlegge. Når det gjelder sonifisering, måtte vi også vite
                  hvilke lyder som ville være mest personlige for ham.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Hva planlegger han for?
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Han nevnte at akademiske oppgaver var viktige for ham å
                      strukturere, men anerkjente også viktigheten av fritid og
                      praktiske oppgaver. Basert på denne informasjonen ble
                      designkonseptet utviklet for å omfavne disse tre
                      kategoriene (akademisk, fritid og praktisk) for
                      tidsstrukturering.
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Egen-lagde lyder
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      As Christian is a musician, the idea sparked to let
                      Christian design his own earcons. Christian would in his
                      home studio record three different sounds that he played
                      on his guitar. He would compose the three sounds in
                      accordance with the three categories for time management.
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
                    src={meeting1}
                    alt='meeting 1'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 20 */}
          <div
            id='panel_20'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Integrasjon med personlig kalender
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
                      Coaxer integrerer med Christians personlige kalender ved å
                      hente en komplett tidsplan for Christians uke fra hans
                      Google Kalender. Denne tidsplanen synkroniseres med
                      Coaxer-appen, noe som gjør det mulig for appen å ta hensyn
                      til Christians personlige tidsplan når den bestemmer når
                      den skal spille sonifiseringslydene.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 21 */}
          <div
            id='panel_21'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Andre møte med Christian
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Basert på øreikonene som Christian hadde designet og utviklet,
                  satte vi ham på prøve for å se hva hans gjenkjennelsesrate for
                  disse var sammenlignet med andre auditive ikoner og musikoner.
                  En grov lo-fi prototype av det som skulle bli
                  brukergrensesnittet ble også presentert for ham.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Full gjenkjennelse av personlige øreikoner
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Øreikonene som Christian hadde utviklet ble testet opp mot
                      et sett med musikoner med tanke på
                      gjenkjennelseshastighet. Basert på tre testiterasjoner var
                      det tydelig at de selvdesignede øreikonene var overlegne
                      når det gjaldt gjenkjennelse.
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
                    src={meeting2}
                    alt='meeting 2'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 22 */}
          <div
            id='panel_22'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Tredje møte med Christian
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Dette møtet fokuserte på hvordan Christian ville navigere i
                  brukergrensesnittet til den foreslåtte appen. På dette
                  tidspunktet hadde vi også en prototype bygget med React Native
                  og Expo, slik at vi i sanntid kunne se hvordan Christian
                  brukte den, og deretter endre designet.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Sanntids utvikling
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Christian ville bruke appen og sjekke flyten av
                      navigasjonen. Han ville også opprette et par
                      dummy-hendelser for å prioritere. Han kom med personlige
                      preferanser om stilen på hendelsene i listen, samt
                      prioriteringsgrafikken. Denne aktiviteten er relatert til
                      den ultrapersonaliserte designpraksisen med å designe
                      under bruk.
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
                    src={meeting3}
                    alt='meeting 3'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* panel 23 */}
          <div
            id='panel_23'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Lansering av appen på Christians telefon
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Appen ble installert på Christians personlige telefon ved å
                  integrere konseptet i en app som kunne installeres på
                  telefonen hans. Christian brukte appen i omtrent en halv uke i
                  den innledende perioden. For å evaluere om appen virkelig var
                  personlig for ham, skulle appen også brukes av Frederik som
                  testsubjekt.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <LazyLoadImage
                      className='w-2/4 lg:w-2/4 h-auto object-contain'
                      src={coaxerFrontPage}
                      alt='coaxer front page'
                    />
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      Appen var lansert på Christians personlige telefon
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <button
                      class='flex items-center justify-center bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white p-4 border border-green-500 hover:border-transparent shadow-md'
                      onClick={() => playSound('practical')}
                    >
                      ♪ Practical
                    </button>

                    <button
                      class='flex items-center justify-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-4 border border-blue-500 hover:border-transparent shadow-md'
                      onClick={() => playSound('leisure')}
                    >
                      ♪ Leisure
                    </button>

                    <button
                      class='flex items-center justify-center bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-4 border border-red-500 hover:border-transparent shadow-md'
                      onClick={() => playSound('academic')}
                    >
                      ♪ Academic
                    </button>

                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      De tre personlige øreikonene som han utviklet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 24 */}
          <div
            id='panel_24'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Video demo of the concept
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}></p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <LazyLoadImage
                      className='w-1/4 lg:w-2/4 h-auto object-contain'
                      src={coaxerFrontPage}
                      alt='coaxer front page'
                    />
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      above is a video showcasing the concept and function of
                      the application as it was designed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 25 */}
          <div
            id='panel_25'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Evaluation and impact
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}></p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Christian’s well-being
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer had a positive impact on the well-being of
                      Christian. He found the application useful in managing his
                      time and tasks, and it helped him feel more in control of
                      his day. The application's functionality, such as the
                      ability to prioritize tasks and include tasks of his own
                      preferences, was also appreciated by Christian
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Audio feature(Sonification)
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      One significant finding was the impact of the audio
                      feature in the application. When the sound was activated,
                      Christian had a more positive experience with the
                      application and found it helpful in reminding him of
                      tasks, especially for academic purposes. The sounds had a
                      significant effect on his choice of action and improved
                      his engagement with the tasks.
                    </p>
                  </div>
                </div>
                <LazyLoadImage
                  className='w-1/4 lg:w-2/4 h-auto object-contain'
                  src={evaluationImpact}
                  alt='evaluation and impact'
                />
              </div>
            </div>
          </div>
          {/* panel 26 */}
          <div
            id='panel_26'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#95dee4]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Final remarks
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}></p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Sound and nudging
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      In terms of audio, the project found that the presence of
                      sound had a significant effect on Christian's experience
                      with the application. The use of earcons and musicons as
                      self-nudging tools proved to be effective in influencing
                      Christian's actions and choices.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Duo-ethnography
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      It is worth mentioning that the duo-ethnographic approach
                      may have influenced Christian's opinions and answers, as
                      Frederik had some influence on him during the design
                      process. However, this collaborative approach also allowed
                      for a more well-reflected stance and facilitated the
                      sharing of perceptions and opinions.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Personalization
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      The personalization aspects of Coaxer especially comes to
                      show regarding the earcons. During the half week of use,
                      Christian said that he would use the app for smaller tasks
                      during the day and that he would recognize their
                      corresponding earcons and follow up on the tasks. To the
                      contrary, Frederik would also use it to a certain degree,
                      but admitted that he couldn’t distinguish between the
                      sounds to a precise degree.
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
