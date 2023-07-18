import React, { useState } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { imageMapWorks } from '../constants';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({
  index,
  type,
  description,
  tags,
  image,
  name,
  onProjectClick,
}) => {
  const iconSrc = imageMapWorks[type];
  return (
    <motion.div
      onClick={() => {
        onProjectClick(type);
      }}
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-white p-5 , sm:w-[360px] w-full cursor-pointer shadow-card'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={iconSrc}
            alt={name}
            className='w-full h-full object-cover'
          />
          <div className='absolute  inset-0 flex justify-end m-3 card-img-hover'></div>
        </div>
        <div className='mt-5 '>
          <h3 className='garet-book font-bold text-[24px]'>{name}</h3>
          <p className='garet-book mt-2 text-black text-[14px]'>{description}</p>
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
  const { t, i18n } = useTranslation();
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('portfolioTiles.p')} </p>
        <h2 className={styles.sectionHeadText}>{t('portfolioTiles.h2')}</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='garet-book mt-3 text- text-[17px] maw-w-3xl leading-[30px]'
        >
          {t('portfolioTiles.subHeader')}
        </motion.p>
      </div>

      <div className='mt-10 flex flex-wrap gap-7'>
        {t('portfolioTiles.tiles', { returnObjects: true }).map(
          (project, index) => (
            <ProjectCard
              index={index}
              {...project}
              key={`project-${index}`}
              onProjectClick={onProjectClick}
            />
          )
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'portfolio');
