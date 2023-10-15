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
} from '../../assets';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const CoaxerScroll = ({ onClose, coaxerBackground }) => {
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
    console.log('these are the sections', sections);

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
            6
          </span>
        </span>

        <div ref={panelsRef} className={`${styles.coaxerScrollPanels}`}>
          {/* panel 1 */} {/* frontpage */}
          <div
            id='panel_1'
            ref={(el) => sectionsRefs.current.push(el)}
            className={`${styles.coaxerScrollPanel} bg-[#cf9090]`}
          >
            <div
              id='id-slidecontainer'
              className={`${styles.coaxerScrollClip}`}
            >
              <h1 className='text-3xl sm:text-4xl md:text-6xl max-w-full sm:w-[400px] font-semibold garet-book'>
                Coaxer
              </h1>

              <div
                id='id-frontcover'
                className='flex flex-col lg:flex-col gap-5 '
              >
                <p className='lg:text-left lg:w-2/4 text-xl mobile:text-lg garet-book'>
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
                    brukes for å forbedre og kurere folks velvære. Prosjektet
                    endte med å dreie seg om mental helse og stress for yngre
                    voksne, hvor tjenesten Coaxer ble utviklet som en
                    ultra-personlig tids planlegger med henblikk på å forbedre
                    mentalt helse og redusere generell stress. De følgende
                    sidene vil handle om hvordan denne tjenesten ble unfanget.
                  </p>
                </div>
                <LazyLoadImage
                  className='w-full lg:w-2/4 h-auto'
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
                    Under prosjektet jobbet jeg i første omgang med å drive
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
                    ansvarlig for å formidle ny viten om oppgaven til resten av
                    gruppen. Jeg var også ansvarlig for å oppdatere og
                    samarbeide med resten av design gruppen om hvilke endringer
                    som ble gjort og hvilke nye funksjoner det var verdt å
                    eksperimentere med.
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

              <div className={`${styles.projectSlideShowBodyContainer} `}></div>
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
                  Formulering av design spørsmålet
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Basert på litteratur søket og vår interesse valgte vi å få
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
                  vi nødt til å snevre det inn ved å stille spørsmål om hva som
                  kunne være meste interessant å ta for seg.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-col'>
                  <div className='flex flew-row'>
                    {' '}
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      Hvilken gruppe av yngre skal vi fokusere på?
                    </p>
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      Hva vil det si å tidsplanlegge ?
                    </p>
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      Hvordan når vi ut til brukergruppen?
                    </p>
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      Hvilke metoder finnes det for tidsplanlegging idag?
                    </p>
                    <p className={` ${styles.projectSlideShowPageTitleP}`}>
                      Hvordan finner vi ut hva som er relevant for den enkelte?`
                    </p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto'
                    src={doubleDiamond}
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
                  Vår bruker - Christian
                </h1>
                <p className={` ${styles.projectSlideShowPageTitleP}`}>
                  Under oppdagelses fasen nevnte en av designerne at det hadde
                  en venn som de visste levde et veldig hektisk liv og som kunne
                  være en relevant kandidat for design spørsmålet. Etter å ha
                  vurderte muligheten i en kort stund bestemte vi oss for å gå
                  videre med dette utgangspunktet og kontakte ham.
                </p>
              </div>

              {/* the three row aligned paragraph */}

              <div className={`${styles.projectSlideShowBodyContainer} `}>
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Christian
                    </h1>

                    <ul className=' list-disc'>
                      <li>
                        Gitarist som elsket musikk og hadde spilt i et band i
                        flere år.
                      </li>
                      <li>
                        {' '}
                        Han var også en student som var påmeldt i
                        journalistutdanning.
                      </li>
                      <li>
                        {' '}
                        Hadde en kjæreste som han elsket dypt siden videregående
                        skole.
                      </li>
                      <li>
                        Jobbet deltid som en ansatt i den nærliggende
                        supermarkedet.
                      </li>
                      <li>
                        Spilte squash med vennene sine på ettermiddagene.{' '}
                      </li>
                      <li>
                        {' '}
                        Glad hundeier og satte pris på en god tur i parken når
                        tiden tillot det.
                      </li>
                    </ul>
                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    ></p>
                  </div>

                  <LazyLoadImage
                    className='w-full lg:w-2/4 h-auto'
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
                <div className='flex flex-row'>
                  <div className={`${styles.projectSlideShowTitleParagraph}`}>
                    <h1 className={` ${styles.projectSlideShowPagePTitle} `}>
                      Frederik (Co-designer)
                    </h1>

                    <p
                      className={` ${styles.projectSlideShowPageP} opacity-60 `}
                    >
                      Frederik nevnte i tillegg til temaene om digital helse og
                      stress mestring konseptet om universelt design og hva det
                      innebar. Utover å høre med Christian om han var
                      interessert i å samarbeide, var et av formålene å
                      kartlegge hvilke områder man kunne inkorporerer ultra
                      personlig design for Christian.{' '}
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
                    className='w-full lg:w-2/4 h-auto'
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
                <div className='flex flex-row'>
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
                    className='w-full lg:w-2/4 h-auto object-contain'
                    src={ultraPerosnalizedDesign}
                    alt='Description of the image'
                  />
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
