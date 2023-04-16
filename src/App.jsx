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
  // const cursor4Ref = useRef(null);

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
       body.style.backgroundColor = 'rgba(20, 20, 20, 0.7)';

    } else {
      body.style.backgroundColor = '';
  
    }
  }, [lampToggle]);

  return (
    <BrowserRouter>
      <div className='relative z-0'>
        {/* sets the cursor contianer for the div */}
        {/* <div id='id_cursorcontainer'></div> */}
        <Navbar heroRef={heroRef} />
        <Hero
          setLampToggleApp={() => setLampToggle(!lampToggle)}
          ref={heroRef}
        />
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
