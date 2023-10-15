import React, { useEffect, useState } from 'react';
import { feedback, scenario, topicoDevice } from '../assets';
import Coffeecan from './Projects/Coffeecan';
import Topico from './Projects/Topico';
import Coaxer from './Projects/Coaxer';
import RingmerkingSlideshow from './Projects/RingmerkingSlideshow';
import CoaxerScroll from './Projects/CoaxerScroll';
import { useTranslation } from 'react-i18next';
import { imageMapCoaxer } from '../constants';
import { imageMapRingmerking } from '../constants';

const ProjectModal = ({ modalProject, onClose }) => {
  const [modalType, setModalType] = useState('svg');
  const [coaxerBackground, setcoaxerBackground] = useState('');
  const [ringmerkingBackground, setRingmerkingBackground] = useState('');

  //retrieving the t object
  const { t, i18n } = useTranslation();

  // listener for the t language updater
  useEffect(() => {
    const svgCoaxer = imageMapCoaxer[i18n.language];
    const svgRingmerking = imageMapRingmerking[i18n.language];
    setcoaxerBackground(svgCoaxer);
    setRingmerkingBackground(svgRingmerking);
  }, [t, i18n]);

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
  ) : modalType === 'coaxer' ? (
    <Coaxer onClose={onClose} coaxerBackground={coaxerBackground}></Coaxer>
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
