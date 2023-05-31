import { BrowserRouter } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { projects } from './constants';

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
} from './components';

const App = () => {
  const heroRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProject, setModalProject] = useState('');
  const [lampToggle, setLampToggle] = useState(false);
  const [navbarAnimate, setNavbarAnimate] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

  // check the id of the pressed projectcard
  // set the project from {projects} corresponding to that id as the modalProject
  // set the showModal state to true
  const handleModalClick = (type) => {
    console.log('appjs this is name');
    console.log(type);
    projects.filter((project) => {
      if (project.type === type) {
        setModalProject(project);
      }
    });
    setShowModal(true);
  };

  useEffect(() => {
    setNavbarAnimate(!lampToggle);
    const body = document.querySelector('body');
    // if (lampToggle) {
    //   body.classList.add('lamp-off');
    // } else {
    //   body.classList.remove('lamp-off');
    // }
  }, [lampToggle]);

  return (
    <BrowserRouter>
      <div className='relative z-0'>
        {!lampToggle && (
          <Navbar
            heroRef={heroRef}
            animationClass={navbarAnimate ? 'navbar-animate' : ''}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />
        )}
        <div className='page-container'>
          <div className='relative z-0'>
            <Hero
              setLampToggleApp={() => setLampToggle(!lampToggle)}
              ref={heroRef}
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
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
