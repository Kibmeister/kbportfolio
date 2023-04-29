import { BrowserRouter } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { projects } from './constants';
import { Cursor4 } from './scripts/cursors/cursor4';

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  ProjectModal,
} from './components';

const App = () => {
  const heroRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProject, setModalProject] = useState('');
  const [lampToggle, setLampToggle] = useState(false);

  // check the id of the pressed projectcard
  // set the project from {projects} corresponding to that id as the modalProject
  // set the showModal state to true
  const handleModalClick = (name) => {
    projects.filter((project) => {
      if (project.name === name) {
        setModalProject(project);
      }
    });
    setShowModal(true);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (lampToggle) {
      body.style.backgroundColor = 'rgba(10, 10, 10, 1)';
      body.style.overflow = 'hidden';
    } else {
      body.style.backgroundColor = '';
      body.style.overflow = '';
     
    }
  }, [lampToggle]);

  return (
    <BrowserRouter>
      <div className='relative z-0'>
        {/* sets the cursor contianer for the div */}

        {!lampToggle && <Navbar heroRef={heroRef} />}

        <div className='relative z-0'>
          <Hero
            setLampToggleApp={() => setLampToggle(!lampToggle)}
            ref={heroRef}
          />
        </div>

        <About />
        <Experience />
        <Tech />
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
    </BrowserRouter>
  );
};

export default App;
