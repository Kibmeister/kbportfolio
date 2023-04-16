import React, { useEffect, useState } from 'react';
import { handle, feedback } from '../assets';
import ReactPlayer from 'react-player';

const ProjectModal = ({ modalProject, onClose }) => {
  const [modalType, setModalType] = useState('svg');

  useEffect(() => {
    setModalType(modalProject.type);

    // Disable scrolling on the body element while the modal is open
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalProject.type]);

 
  
      

  return modalType === 'svg' ? (
    <div className='fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen w-screen'>
      <div className='bg-white w-full h-full relative flex flex-col justify-between'>
        <button onClick={onClose} className='absolute top-4 right-4'>
          Close
        </button>
        <div id='svg-container' className='flex-1'>
          <img
            src={modalProject.image}
            alt='projectimage'
            className='object-contain mx-auto my-auto w-full h-full max-h-full max-w-full'
            style={{
              maxHeight: '100vh',
            }}
          />
        </div>
      </div>
    </div>
  ) : modalType === 'html' ? (
    <div class='fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen w-screen'>
      <div class='bg-[#efefef] w-full h-full relative flex flex-col justify-between p-8'>
        <h1 class='text-4xl font-bold mb-8 pl-12'>Multimodal coffee can</h1>
        <div class='flex flex-wrap'>
          <button onClick={onClose} className='absolute top-4 right-4'>
            Close
          </button>
          <div class='w-full md:w-1/3 px-12 mb-8 md:mb-0'>
            <h2 class='text-xl font-bold mb-4'>Feedback Design</h2>
              <p class='mb-4'>
              The model to the left depicts the two different forms of feedback,
              and in what scenario these are used. Tactons are structured
              tactile messages for non-visual information display, that are used
              to inform the user through output of vibrotactile waves. Tactons
              are based on frequency, amplitude, waveform and rhythm as main
              parameters. In conjunction with tactons, the can emitts earcons
              through several of the sequences of interaction. Earcons are here
              used as in parallel with tactons. Earcons are the equivalent to
              tactons just on the auditory modality, and in this design
              presented in a concurrently manner.
            </p>

            <img src={feedback} alt='Feedback Design' class='w-full mb-4' />
            <ul class='list-disc list-inside mb-4'>
              <li>
                Grabbing the handle and receive feedback upon amount (tactile
                and auditory feedback)
              </li>
              <li>Pouring from the coffee can (tactile feedback)</li>
              <li>
                {' '}
                Confirmation of the cup successfully poured (tactile and
                auditory feedback)
              </li>
              <li>
                Confirmation that the temperature has the appropriate drinking
                temperature (auditory feedback)
              </li>
            </ul>
          </div>
          <div class='w-full md:w-2/3 px-12'>
            <h2 class='text-xl font-bold mb-4'>Story</h2>
              <p class='mb-4'>
                 This is a prototype of a multimodal coffee can, that is designed
              to assist and aid the visually impaired. Coffee can be poured,
              just as with a regular coffee can, though here it is implemented
              vibrotactile and auditory feedback to further exploit the
              perception capacity available for user. Thus, the theme for this
              project is multimodal interaction, which is how systems can be
              designed to utilize input and output through different channels of
              perception, available for the user. By heightening the level of
              tactile and auditory feedback, the goal was to see if it is
              possible for visually impaired people to make fewer errors when
              pouring, as well as shortening the pouring time. Also, how will
              the user make sense of the feedback when exposed to it, will the
              assessment of the emitted feedback be significant enough to be
              higher regarded than their own practiced techniques, or will it be
              complementary.
                

                
            </p>
            <div class='aspect-w-16 aspect-h-9'>
              <ReactPlayer
                className='react-player'
                url='https://vimeo.com/498087574'
                width='800px'
                height='600px'
                controls
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProjectModal;
