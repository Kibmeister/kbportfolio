import React from 'react';
import ReactPlayer from 'react-player';

const Topico = ({ onClose, scenario, topicoDevice }) => {
  return (
    <div className='fixed inset-0 z-30 mx:auto bg-[#efefef] flex justify-center items-center h-screen w-screen overflow-y-auto '>
      <div className='bg-[#efefef] w-full h-full relative flex flex-col justify-between p-8 '>
        <div className='header'>
          <h1 className='text-4xl font-bold  mb-2 pl-12'>
            Topico - Interactive EduTech tool{' '}
          </h1>
          <h3 className='text-1xl italic mb-14 pl-12'>
            : Enhance Collaboration and Verbal Skills with Topico's Game-Based
            Approach
          </h3>
        </div>

        <div className='flex flex-wrap'>
          <button onClick={onClose} className='absolute top-4 right-4'>
            Close
          </button>
          <div className='w-full md:w-1/3 px-12 mb-8 md:mb-0'>
            <h2 className='text-2xl mb-14'>Concept</h2>
            <p className='mb-12'>
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

            <img src={scenario} alt='concept' className='w-full  mb-12' />
            <ul className='list-disc list-inside mb-12 space-y-4'>
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
          <div className='w-full md:w-2/3 px-12'>
            <h2 className='text-2xl  mb-14'>Story</h2>
            <p className='mb-12 max-w-[800px]'>
              In a classroom setting, students engage in learning English and
              collaborate with their peers using Topico, an educational tool
              that transforms language learning into an interactive and
              enjoyable experience. Topico incorporates audio descriptions, a
              user-friendly interface for teachers, and adheres to educational
              standards, effectively enhancing the students' learning process
              and engagement with language. While students utilize their native
              languages to discuss and explore English vocabulary, Topico helps
              bridge the gap between cultures, creating a welcoming learning
              environment. Topico has been thoughtfully designed to support the
              evolution of language education and foster a positive learning
              experience.
            </p>

            <div className='w-[800px] flex flex-col gap-1 md:flex-row justify-between '>
              <div className='w-[400px] h-[400px] ml-0'>
                <ReactPlayer
                  className='react-player'
                  url='https://vimeo.com/444281811'
                  width='230px'
                  height='400px'
                  controls
                />
              </div>

              <div className='mb-12 w-[400px] h-[400px]'>
                <img src={topicoDevice} alt='Feedback Design' className={''} />
              </div>
            </div>

            <div className='caption'>
              <p className='mb-4 max-w-[800px] italic'>
                Topico was developed as part of a product design project with
                the theme collaborative interaction. My team explored how this
                theme could be relevant for the EduTech domain. Hence, this is
                an interdisciplinary design project where I had the role as an
                empirical researcher (interviews and observation), designer
                (understanding, exploring, materializing), developer (the Topico
                platform for the teacher), UI designer (designing the interface
                for the Topico tool as well as the teacher platform), and
                blogger (writing weekly updates about progress and challenges in
                a self-made blog).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topico;