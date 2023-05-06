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
        <h1 class='text-4xl font-bold mb-2 pl-12'>Multimodal coffee can</h1>
        <h3 class='text-1xl italic mb-14 pl-12'>
          : haptic and auditory feedback for the visually impaired
        </h3>
        <div class='flex flex-wrap'>
          <button onClick={onClose} className='absolute top-4 right-4'>
            Close
          </button>
          <div class='w-full md:w-1/3 px-12 mb-8 md:mb-0'>
            <h2 class='text-xl font-bold mb-4'>Concept</h2>
            <p class='mb-4'>
              Topico is an innovative EduTech tool tailored for sixth grade
              English classes, designed to facilitate language learning and
              engagement through audio-based interactions. As an EduTech
              solution, Topico bridges the gap between technology and education,
              creating a unique platform that enables the teacher to direct the
              themes of the vocabulary curriculum for the students. The students
              are encouraged to learn the vocabulary through engaging in a
              collaborative practice where they are to come up with and thought
              of word and practice their pronunciation.
            </p>

            <img src={feedback} alt='Feedback Design' class='w-full mb-4' />
            <ul class='list-disc list-inside mb-4'>
              <li>
                Audio Descriptions: Topico stores audio files of important words
                and topics discussed in class, providing an accessible resource
                for students to review and reinforce their learning.
              </li>
              <li>
                Teacher-friendly Interface: Topico's website is designed to be
                simple and user-friendly, allowing teachers to focus on
                educational content instead of technical complexities.
              </li>
              <li>
                Aligned with Educational Standards: Topico's game meets the
                Danish Ministry of Education's requirements, ensuring students
                develop necessary verbal skills for their curriculum.
              </li>
              <li>
                Multilingual Support: Topico encourages multilingual
                communication and learning, allowing students to use their
                native language when discussing word meanings.
              </li>
            </ul>
          </div>
          <div class='w-full md:w-2/3 px-12'>
            <h2 class='text-xl font-bold mb-4'>Story</h2>
            <p class='mb-4 w-[800px]'>
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
