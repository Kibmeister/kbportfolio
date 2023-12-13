import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import ReactPlayer from 'react-player';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { styles } from '../../styles';
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
  doublediamondDefine,
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
  const [currentPanel, setCurrentPanel] = useState(1);
  const scrollTriggersRef = useRef([]);
  const upBtnRef = useRef(null);
  const downBtnRef = useRef(null);

  // Event listener setup
  useEffect(() => {
    const upBtn = upBtnRef.current;
    const downBtn = downBtnRef.current;

    const panelDown = () => {
      console.log('panel down is pressed');
      setCurrentPanel((prevPanel) =>
        Math.min(prevPanel + 1, sectionsRefs.current.length)
      );
    };

    const panelUp = () => {
      console.log('panel Up is pressed');
      setCurrentPanel((prevPanel) => Math.max(prevPanel - 1, 1));
    };

    downBtn.addEventListener('click', panelDown);
    upBtn.addEventListener('click', panelUp);

    return () => {
      downBtn.removeEventListener('click', panelDown);
      upBtn.removeEventListener('click', panelUp);
    };
  }, []);

  // Your GSAP animations using ScrollTrigger and ScrollToPlugin go here
  useEffect(() => {
    const panels = panelsRef.current;
    const activeSlide = activeSlideRef.current;
    const slideTotal = slideTotalRef.current; // the count of slides set by the span element
    const sections = sectionsRefs.current;
    const totalSlides = sections.length;

    const slidesAll = sections.length;
    slideTotal.innerHTML = slidesAll;
    

    if (scrollTriggersRef.current.length > 0) {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    }

    sections.forEach((eachPanel, index) => {
      console.log('the scroll trigger index', index);

      const trigger = ScrollTrigger.create({
        scroller: panels,
        trigger: eachPanel,
        start: 'top 50%',
        end: 'top bottom',
        onLeave: function () {
          // eachPanel.classList.add('active');

          activeSlide.innerHTML = currentPanel;
        },
        onLeaveBack: function () {
          activeSlide.innerHTML = currentPanel;
        },
      });
      scrollTriggersRef.current.push(trigger);
    });
    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    };
  }, []);

  // Scroll to panel effect
  useEffect(() => {
    const panels = panelsRef.current;
    const goToPanel = (panelNumber) => {
      gsap.to(panels, {
        scrollTo: {
          y: '#panel_' + panelNumber,
          autoKill: false,
        },
        duration: 0.55,
        ease: 'power4.inOut',
      });
    };

    goToPanel(currentPanel);
  }, [currentPanel]);

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
            25
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Formulering av design spørsmålet
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                    className='w-full md:w-3/4 h-auto mx-auto'
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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

                    <ul className='garet-book opacity-60 text-lg mobile:text-xs sm:text-sm md:text-base '>
                      <li className='mt-2'>
                        - Gitarist som elsker musikk og har spilt i band i flere
                        år
                      </li>
                      <li className='mt-2'>
                        - Fortiden journaliststudent på Aarhus Universitet
                      </li>
                      <li className='mt-2'>
                        - Kjæreste med sitt videregående crush som han bruker
                        mye tid med
                      </li>
                      <li className='mt-2'>
                        - Deltids ansatt på det lokale supermarkedet hvor han
                        jobbet ettermiddager
                      </li>
                      <li className='mt-2'>
                        - Spilte ofte squash med kompiser etter skole.
                      </li>
                      <li className='mt-2'>
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Første kontakt med Christian
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                <div className='flex flex-col lg:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      På nogenlunde samme tidspunkt oppdaget vi også konseptet
                      om
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Ultra-personlig design involverer innsamling av data fra
                      brukeren både før og under bruk og utvikling av produktet.
                      Disse dataene hjelper til med å forstå brukerens
                      preferanser, behov og atferd.
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Designbeslutninger basert på brukerdata
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Designbeslutningene i en ultra-personlig tilnærming er
                      basert på data samlet inn fra brukeren. Disse
                      beslutningene er skreddersydd spesielt for den enkelte
                      bruker, med tanke på deres unike krav og preferanser.
                    </p>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Tilpasning og personliggjøring
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Ultra-personlig design går utover generiske
                      tilpasningsmuligheter. Målet er å skape et produkt som er
                      fullstendig personlig tilpasset og skreddersydd for å
                      passe brukerens spesifikke behov og preferanser. Dette
                      nivået av tilpasning tillater en mer sømløs og intuitiv
                      brukeropplevelse.
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Den perfekte matchen
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Samsvar mellom Christian (som vi hadde i tankene fra før) og
                  den nye, ukjente, men spennende designmetodikken for
                  ultra-personlig design, la grunnlaget for konfigurasjonen av
                  designprosessen. Vår idé var å kombinere de to og undersøke om
                  Christian var interessert i å delta i et slikt prosjekt.
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
                      Christian, som en travel student og musiker, levde et liv
                      med mange ansvarsområder og hendelser som krevde hans tid.
                      Kunne vi utnytte design tenkning og digital teknologi til
                      å ha en positiv innflytelse på Christians velvære?
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
                      Var ultra-personlig design det riktige designkonseptet for
                      Christian som vår sluttbruker? Dette var et designkonsept
                      lik brukersentrert design og deltakende design, men med
                      større vekt på kontinuerlig designutvikling.
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                <div className='flex mobile:flex-col flew-row gap-10'>
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Ultra personlig design for Christian
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Sonifisering og nudging
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Sonifisering og nudging dukket opp som konsepter under
                  litteratursøket, og ved nærmere ettersyn virket relevante for
                  det vi visste om Christian som en travel student og musiker.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Sonifisering
                    </h1>
                    <div className={`${styles.projectSlideShowTitleParagraph}`}>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60  `}
                      >
                        Sonifisering er prosessen med å kartlegge datarelasjoner
                        til relasjoner mellom lydparametere og presentere denne
                        ikke-talelyden som informativ veiledning. Det innebærer
                        å bruke lyd til å formidle informasjon eller kommunisere
                        hendelser. Sonifisering kan ta form av earcons, som er
                        abstrakte eller konkrete representasjoner av hendelser,
                        eller musicons, som er musikalske lyder.
                      </p>
                      <LazyLoadImage
                        className='w-2/3 md:w-4/5 h-auto object-contain'
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
                    <div className={`${styles.projectSlideShowTitleParagraph}`}>
                      <p
                        className={` ${styles.projectSlideShowPageP} opacity-60 `}
                      >
                        Nudging, på den andre siden, er en tilnærming for å
                        motivere individer til å gjøre visse valg eller ta
                        spesifikke handlinger. Det innebærer å bruke subtile
                        hint eller påminnelser for å påvirke beslutningstaking
                        og atferd. Nudges kan være grafiske, auditive, fysiske
                        eller lyriske. Selv-nudging er en spesifikk type nudging
                        som innebærer å endre en persons eksterne verden, både
                        mentalt og fysisk, for å motvirke mangel på
                        selvkontroll.
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Presentasjon av ideen til Christian
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Den tidligere undersøkelsen av feltene sonifisering, nudging
                  og tidsstyring førte til en idé basert på det vi visste om
                  Christian. Frederik (meddesigner) initierte et nytt møte med
                  Christian og foreslo vår idé om å designe en ultra-personlig
                  tidsstyringsapp som bruker personlige earcons (sonifisering)
                  som et middel for å nudge ham til å fullføre planlagte
                  oppgaver i henhold til hans prioritering.
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Sonifisering.. hvordan?
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Sonifisering er metoden for å kartlegge datarelasjoner til
                  lydparametres relasjoner og presentere denne ikke-talelyden
                  som informativ veiledning. Sonifisering består av tre
                  forskjellige typer lydsignal, og av disse måtte vi finne ut
                  hvilken som ville passe best for Christian, i tråd med en
                  ultra-personlig designpraksis.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Earcons
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Earcons er abstrakte små meldinger som kommuniserer en
                      hendelse. De er konstruert av motiver, som er korte
                      rytmiske sekvenser som varierer i tonehøyde. Earcons har
                      en lengre læringskurve sammenlignet med auditive ikoner.
                    </p>
                    <LazyLoadImage
                      className='w-full lg:w-2/4 h-auto object-contain'
                      src={earcon}
                      alt='addressing an idea'
                    />
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Auditive ikoner
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Auditive ikoner er lyder som representerer spesifikke
                      handlinger eller hendelser på en mer konkret måte. For
                      eksempel kan en bruker som klikker på et objekt, høre en
                      slaglyd fra en kilde som tre eller metall. Auditive ikoner
                      har som mål å etterligne lyder fra den virkelige verden og
                      er lettere å gjenkjenne og forstå sammenlignet med
                      earcons.
                    </p>
                    <LazyLoadImage
                      className='w-4/5 lg:w-2/4 h-auto object-contain'
                      src={auditoryicon}
                      alt='addressing an idea'
                    />
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Musicons
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Musicons er en annen form for sonifisering som innebærer
                      bruk av korte musikalsekvenser eller sanger for å formidle
                      informasjon. Musicons er hentet fra eksisterende sanger og
                      er kuttet opp i korte segmenter. De kan brukes til å
                      representere forskjellige typer hendelser eller
                      handlinger.
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Hvilke digitale tidsplanleggings apper finnes?
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  En analyse av de tre tidsplanleggingsappene som var mest brukt
                  på mobile platformer ble utført for å vurdere hvilke av deres
                  elementer som ville være relevant å ta med seg videre i
                  prosessen om å designe et ultrapersonalisert
                  tidsplanleggingsverktøy for Christian.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
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
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
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
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                  Coaxer er en oppgavehåndteringsapp designet for å forbedre
                  tidsstyring og redusere stressnivåer. Den bruker
                  sonifiseringslyder som milde påminnelser for å prioritere og
                  fullføre oppgaver i tre kategorier. De tre kategoriene er
                  basert på hva som er mest personlig og viktig for brukeren.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div
                className={`${styles.projectSlideShowBodyContainer} flex-col `}
              >
                <div className='flex flex-col md:flex-row gap-5'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Designet for å passe til Christian
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer er spesifikt designet for å passe til Christians
                      personlige liv og eksisterende rutiner. Appen og konseptet
                      vil bli designet og utviklet i samspill med Christians
                      tilbakemeldinger og bruk.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Prioritering
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer benytter en prioritetsalgoritme for å nudge
                      Christian til å utføre de oppgavene han har spesifisert, i
                      henhold til prioriteringsnivået disse oppgavene har. Dette
                      innebærer at oppgaver med høyere prioritet vil bli varslet
                      oftere.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph} `}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Sjangre av oppgaver
                    </h1>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer definerer oppgaver innenfor tre generelle
                      kategorier, disse er basert på hva som er viktigst for
                      Christian. Hver av disse kategoriene har sin egen
                      distinkte earcon-lyd, noe som gjør dem lettere å
                      gjenkjenne.
                    </p>
                  </div>
                </div>
                <div className='flex flew-row w-full justify-center '>
                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto object-contain'
                    src={doublediamondDefine}
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                <div className='flex flex-col md:flex-row gap-10'>
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
                      Siden Christian er musiker, oppsto ideen om å la Christian
                      designe sine egne earcons. Christian ville i sitt
                      hjemmestudio spille inn tre forskjellige lyder som han
                      spilte på gitaren sin. Han ville komponere de tre lydene i
                      samsvar med de tre kategoriene for tidsstyring.
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
          {/* panel 20 */}
          <div
            id='panel_20'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                <div className='flex flex-col md:flex-row gap-10'>
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                <div className='flex flex-col md:flex-row gap-10 '>
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
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
                  Coaxer, en oppgavehåndteringsapp utviklet gjennom å anvende en
                  ultrapersonlig designprosess, var nå klar for å installeres på
                  Christians personlige telefon. Christian brukte appen i
                  omtrent en halv uke i den innledende perioden. For å evaluere
                  om appen virkelig var personlig for ham, skulle appen også
                  brukes av Frederik som testsubjekt.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <LazyLoadImage
                      className='w-3/5 lg:w-3/4 h-auto object-contain'
                      src={coaxerFrontPage}
                      alt='coaxer front page'
                    />
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      Christians telefon med Coaxer appen
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
                        ♪ Practical
                      </button>

                      <button
                        class='flex items-center justify-center w-32 h-12 bg-white hover:bg-black text-black font-semibold hover:text-white border border-black hover:border-transparent shadow-md'
                        onClick={() => playSound('leisure')}
                      >
                        ♪ Leisure
                      </button>

                      <button
                        class='flex items-center justify-center w-32 h-12 bg-white hover:bg-black text-black font-semibold hover:text-white border border-black hover:border-transparent shadow-md'
                        onClick={() => playSound('academic')}
                      >
                        ♪ Academic
                      </button>
                    </div>

                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      De tre personlige øreikonene som han utviklet
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
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer} w-full`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Video demo av konseptet -
                  {/* denne tittelen må være tvunget
                  venstrestilt i desktop mode */}
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Her er en video som viser konseptet og funksjonen til
                  applikasjone slik som den ble designet.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <ReactPlayer
                      className=''
                      width='vw'
                      url='https://vimeo.com/889628233?share=copy'
                      controls
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* panel 24 */}
          <div
            id='panel_24'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#FCFCFC]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1 className={` ${styles.projectSlideShowPageTitle}`}>
                  Evaluering og innvirkning
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
                      Christians velvære
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Coaxer hadde en positiv innvirkning på velværet til
                      Christian. Han fant applikasjonen nyttig i å håndtere sin
                      tid og oppgaver, og den hjalp ham til å føle seg mer i
                      kontroll over dagen sin. Applikasjonens funksjonalitet,
                      som muligheten til å prioritere oppgaver og inkludere
                      oppgaver etter egne preferanser, ble også satt pris på av
                      Christian.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Lyd-funksjon (Sonifisering)
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      En betydelig oppdagelse var effekten av lydfunksjonen i
                      applikasjonen. Når lyden var aktivert, hadde Christian en
                      mer positiv opplevelse med applikasjonen og fant den
                      hjelpsom i å minne ham om oppgaver, spesielt for
                      akademiske formål. Lydene hadde en betydelig effekt på
                      hans valg av handling og forbedret hans engasjement i
                      oppgavene.
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
            className={`${styles.coaxerScrollPanel} bg-[#000000]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.projectSlideShowContainer}`}
            >
              <div className={`${styles.projectSlideShowTitleParagraph}`}>
                <h1
                  className={` ${styles.projectSlideShowPageTitle} text-white`}
                >
                  Avsluttende tanker
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}></p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col gap-10 md:flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1
                      className={` ${styles.projectSlideShowPagePTitle} text-white`}
                    >
                      Lyd og nudging
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 text-white`}
                    >
                      Når det gjelder lyd, fant prosjektet at tilstedeværelsen
                      av lyd hadde en betydelig effekt på Christians opplevelse
                      med applikasjonen. Bruken av øreikonene og musicons som
                      selv-nudging-verktøy viste seg å være effektive i å
                      påvirke Christians handlinger og valg.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1
                      className={` ${styles.projectSlideShowPagePTitle} text-white `}
                    >
                      Duo-etnografi
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} text-white opacity-60 `}
                    >
                      Det er verdt å nevne at den duo-etnografiske tilnærmingen
                      kan ha påvirket Christians meninger og svar, ettersom
                      Frederik hadde en viss innflytelse på ham under
                      designprosessen. Imidlertid tillot denne
                      samarbeidstilnærmingen også en mer velreflektert holdning
                      og fasiliterte deling av oppfatninger og meninger.
                    </p>
                  </div>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1
                      className={` ${styles.projectSlideShowPagePTitle} text-white `}
                    >
                      Personliggjøring
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} text-white opacity-60 `}
                    >
                      De personliggjørende aspektene av Coaxer kommer spesielt
                      til syne når det gjelder earcons. I løpet av den halve
                      uken med bruk, sa Christian at han ville bruke appen til
                      mindre oppgaver i løpet av dagen og at han ville
                      gjenkjenne deres tilsvarende earcons og følge opp
                      oppgavene. I motsetning til dette ville også Frederik
                      bruke den til en viss grad, men innrømmet at han ikke
                      kunne skille mellom lydene til en nøyaktig grad.
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
