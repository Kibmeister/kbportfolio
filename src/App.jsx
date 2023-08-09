import { BrowserRouter } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { projects } from './constants';

import './i18n';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
  ProjectModal,
  Footer,
} from './components';

const App = () => {
  const heroRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProject, setModalProject] = useState('');
  const [lampToggle, setLampToggle] = useState(false);
  const [navbarAnimate, setNavbarAnimate] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [activeMediaQuery, setActiveMediaQuery] = useState('');

  useEffect(() => {
    const mediaQueries = {
      mobile: '(max-width: 639px)',
      sm: '(min-width: 640px) and (max-width: 767px)',
      md: '(min-width: 768px) and (max-width: 1023px)',
      lg: '(min-width: 1024px) and (max-width: 1279px)',
      xl: '(min-width: 1280px) and (max-width: 1535px)',
      '2xl': '(min-width: 1536px)',
    };

    const handleMediaQueryChange = () => {
      for (const [key, query] of Object.entries(mediaQueries)) {
        if (window.matchMedia(query).matches) {
          setActiveMediaQuery(key);
          break;
        }
      }
    };

    // Listen for media query changes and set the initial value
    const mediaQueryLists = Object.values(mediaQueries).map((q) =>
      window.matchMedia(q)
    );

    for (const mql of mediaQueryLists) {
      mql.addEventListener('change', handleMediaQueryChange);
    }

    handleMediaQueryChange();

    return () => {
      for (const mql of mediaQueryLists) {
        mql.removeEventListener('change', handleMediaQueryChange);
      }
    };
  }, []);

  const handleModalClick = (type) => {
    console.log('appjs this is name');
    console.log(type);

    if (type == 'oldwebsite') {
      window.open('https://www.kasperborgbjerg.online');
    } else {
      projects.filter((project) => {
        if (project.type === type) {
          setModalProject(project);
        }
      });
    }

    setShowModal(true);
  };

  useEffect(() => {
    setNavbarAnimate(!lampToggle);
    const body = document.querySelector('body');
    if (lampToggle) {
      body.classList.add('lamp-off');
    } else {
      body.classList.remove('lamp-off');
    }
  }, [lampToggle]);

  return (
    <BrowserRouter>
      <div className='relative z-0 flex flex-col min-h-screen '>
        {!lampToggle && (
          <Navbar
            heroRef={heroRef}
            animationClass={navbarAnimate ? 'navbar-animate' : ''}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />
        )}
        <div className='flex-grow-1 page-container '>
          <div className='relative z-0'>
            <Hero
              setLampToggleApp={() => setLampToggle(!lampToggle)}
              ref={heroRef}
              activeMediaQuery={activeMediaQuery}
            />
          </div>

          <About />
          <Experience />

          <Works onProjectClick={handleModalClick} />

          {showModal && (
            <ProjectModal
              modalProject={modalProject}
              onClose={() => setShowModal(false)}
            />
          )}
          <Feedbacks />

          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
