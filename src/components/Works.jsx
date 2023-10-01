import React, { useState, useEffect } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { imageMapWorks } from '../constants';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProjectCard = ({
  index,
  type,
  description,
  tags,
  image,
  name,
  onProjectClick,
  activeMediaQuery,
}) => {
  const { i18n } = useTranslation();
  const [thumbnailPath, setThumbnailPath] = useState(imageMapWorks[type]['en']);


  useEffect(() => {
    const path = imageMapWorks[type][i18n.language];
    if (!path) {
      console.error(`No thumbnail found for language: ${i18n.language}`);
    }
    setThumbnailPath(path);
  }, [i18n.language]);

  return (
    <>
      {/* {activeMediaQuery === 'mobile' || activeMediaQuery === 'sm' ? (
        <div
          onClick={() => {
            onProjectClick(type);
          }}
          className='bg-white p-5 mobile:w-[360px] sm:w-[360px] w-full cursor-pointer shadow-card'
        >
          <div className='relative w-full h-[230px]'>
            <LazyLoadImage
              src={thumbnailPath}
              alt={name}
              className='w-full h-full '
            />

            <div className='absolute inset-0 flex justify-end m-3 card-img-hover'></div>
          </div>
          <div className='mt-5 '>
            <h3 className={`${styles.tilesHeader}`}>{name}</h3>
            <p className={`${styles.tilesP}`}>{description}</p>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p className={`text-[14px] ${tag.color}`} key={tag.name}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      ) : ( */}
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
            className='bg-white p-5 mobile:w-[360px] sm:w-[360px] w-full cursor-pointer shadow-card'
          >
            <div className='relative w-full h-[230px]'>
              <LazyLoadImage
                src={thumbnailPath}
                alt={name}
                className='w-full h-full '
              />

              <div className='absolute inset-0 flex justify-end m-3 card-img-hover'></div>
            </div>
            <div className='mt-5 '>
              <h3 className={`${styles.tilesHeader}`}>{name}</h3>
              <p className={`${styles.tilesP}`}>{description}</p>
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <p className={`text-[14px] ${tag.color}`} key={tag.name}>
                  #{tag.name}
                </p>
              ))}
            </div>
          </Tilt>
        </motion.div>
      {/* )} */}
    </>
  );
};

const Works = ({ onProjectClick, activeMediaQuery }) => {
  const { t } = useTranslation();
  return (
    <>
      {activeMediaQuery === 'mobile' || activeMediaQuery === 'sm' ? (
        <div>
          <p className={styles.sectionSubText}>{t('portfolioTiles.p')}</p>
          <h2 className={styles.sectionHeadText}>{t('portfolioTiles.h2')}</h2>
        </div>
      ) : (
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t('portfolioTiles.p')}</p>
          <h2 className={styles.sectionHeadText}>{t('portfolioTiles.h2')}</h2>
        </motion.div>
      )}

      {activeMediaQuery === 'mobile' || activeMediaQuery === 'sm' ? (
        <p className={`${styles.sectionP}`}>{t('portfolioTiles.subHeader')}</p>
      ) : (
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className={`${styles.sectionP}`}
        >
          {t('portfolioTiles.subHeader')}
        </motion.p>
      )}

      <div className='mt-10 flex flex-wrap gap-7'>
        {t('portfolioTiles.tiles', { returnObjects: true }).map(
          (project, index) => (
            <ProjectCard
              index={index}
              {...project}
              key={`project-${index}`}
              onProjectClick={onProjectClick}
              activeMediaQuery={activeMediaQuery}
            />
          )
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'portfolio');
