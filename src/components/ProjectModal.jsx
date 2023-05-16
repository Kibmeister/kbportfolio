import React, { useEffect, useState } from 'react';
import { feedback, scenario, topicoDevice } from '../assets';
import ReactPlayer from 'react-player';
import Coffeecan from './Projects/Coffeecan';
import Topico from './Projects/Topico';
import Coaxer from './Projects/Coaxer';
import Ringmerking from './Projects/Ringmerking';

const ProjectModal = ({ modalProject, onClose }) => {
  const [modalType, setModalType] = useState('svg');

  useEffect(() => {
    setModalType(modalProject.type);

    console.log('This is the pressed modal type');
    console.log(modalProject.type);

    // Disable scrolling on the body element while the modal is open
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalProject]);

  return modalType === 'ringmerking' ? (
    <Ringmerking onClose={onClose} modalProject={ modalProject }></Ringmerking>
  ) : modalType === 'coaxer' ? (
    <Coaxer onClose={onClose} modalProject={modalProject}>
    </Coaxer>
  ) : modalType === 'coffeecan' ? (
    <Coffeecan feedback={feedback} onClose={onClose} />
  ) : modalType === 'topico' ? (
    <Topico
      onClose={onClose}
      scenario={scenario}
      topicoDevice={topicoDevice}
    ></Topico>
  ) : null;
};

export default ProjectModal;
