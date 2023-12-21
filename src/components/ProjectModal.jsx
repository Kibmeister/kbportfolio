import React, { useEffect, useState } from 'react';
import { feedback, scenario, topicoDevice } from '../assets';
import Coffeecan from './Projects/Coffeecan';
import Topico from './Projects/Topico';
import RingmerkingSlideshow from './Projects/RingmerkingSlideshow';
import CoaxerScroll from './Projects/CoaxerScroll';
import { useTranslation } from 'react-i18next';

const ProjectModal = ({ modalProject, onClose }) => {
  const [modalType, setModalType] = useState('svg');

  //retrieving the t object
  const { t, i18n } = useTranslation();

  
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

  return modalType === 'ringmerkingSlideshow' ? (
    <RingmerkingSlideshow onClose={onClose}></RingmerkingSlideshow>
  ) : modalType === 'coffeecan' ? (
    <Coffeecan feedback={feedback} onClose={onClose} />
  ) : modalType === 'coaxerScroll' ? (
    <CoaxerScroll onClose={onClose} />
  ) : modalType === 'topico' ? (
    <Topico
      onClose={onClose}
      scenario={scenario}
      topicoDevice={topicoDevice}
    ></Topico>
  ) : null;
};

export default ProjectModal;
