import React, { useState} from 'react';
import {Tilt} from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';




const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  onProjectClick,
}) => {

  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-white p-5 , sm:w-[360px] w-full cursor-pointer shadow-card'
      >
        <div
          className='relative w-full h-[230px]'
          onClick={() => {
           onProjectClick(name);
          }}
        >
          <img src={image} alt={name} className='w-full h-full object-cover' />
          <div className='absolute  inset-0 flex justify-end m-3 card-img-hover'></div>
        </div>
        <div className='mt-5 '>
          <h3 className='text-container-title font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-black text-[14px]'>{description}</p>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p key={tag.name} className={`text[14px-] ${tag.color}`}>
              # {tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = ({ onProjectClick }) => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My past work </p>
        <h2 className={styles.sectionHeadText}>My Portfolio</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text- text-[17px] maw-w-3xl leading-[30px]'
        >
          jada jada jada jada jada jada jada jada jada jada
        </motion.p>
      </div>

      <div className='mt-10 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard
            index={index}
            {...project}
            key={`project-${index}`}
            onProjectClick={onProjectClick}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'portfolio');
