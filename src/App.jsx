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
  Tech,
  Works,
  StarsCanvas,
  ProjectModal,
} from './components';

const App = () => {
  const heroRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProject, setModalProject] = useState('');

  // check the id of the pressed projectcard
  // set the project from {projects} corresponding to that id as the modalProject
  // set the showModal state to true
  const handleModalClick = (name) => {
    projects.filter((project) => { 
      if (project.name === name) {
        setModalProject(project);
        console.log('Handle modal click from APP.js');
      } 
    })
    setShowModal(true);
  };

const setBackgroundStyle = (e) => {
  const body = document.querySelector('body');

  if (e == 'off') {
    body.style.backgroundColor = 'rgba(20, 20, 20, 0.7)';
    body.style.overflowY = '';
  } else {
    body.style.backgroundColor = '';
    body.style.overflowY = 'scroll';
  }
};



  return (
    <BrowserRouter>
      <div className='relative z-0'>
        <Navbar heroRef={heroRef} />
        <Hero setBackgroundStyle={setBackgroundStyle} ref={heroRef} />

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
