import React from 'react';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';
import { styles } from '../../styles';

const Topico = ({ onClose, scenario, topicoDevice }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={`${styles.projectHigherordercomponent}`}>
      <div class={` ${styles.projectWrapper} `}>
        <div class={`${styles.projectContainer}`}>
          <div className='header'>
            <h1 class={`${styles.projectHeader}`}>
              {t('portfolio.topico.title')}
            </h1>
            <h3 class={`${styles.projectSubHeader}`}>
              {t('portfolio.topico.caption')}
            </h3>
          </div>

          <div class={`${styles.projectFlex}`}>
            <button onClick={onClose} className={`${styles.projectHeaderBtn}`}>
              {t('portfolio.topico.buttonclose')}
            </button>
            <div class={`${styles.projectSection}`}>
              <h2 class={`${styles.projectSectionHeader}`}>
                {t('portfolio.topico.conceptT')}
              </h2>
              <p class={`${styles.projectSectionText}`}>
                {t('portfolio.topico.conceptP')}
              </p>

              <img src={scenario} alt='concept' className='w-full  mb-12' />
              <ul class={`${styles.projectSectionList}`}>
                {t('portfolio.topico.ul', { returnObjects: true }).map(
                  (item, index) => (
                    <li
                      className={`${styles.projectSectionListItem}`}
                      key={index}
                    >
                      {' '}
                      {item.value}
                    </li>
                  )
                )}
              </ul>

              <div className='mb-12  '>
                <img
                  src={topicoDevice}
                  alt='Feedback Design'
                  className={`${styles.projectTopcioDemoImg}`}
                />
              </div>
            </div>
            <div class={`${styles.projectSection}`}>
              <h2 class={`${styles.projectSectionHeader}`}>
                {t('portfolio.topico.storyT')}
              </h2>
              <p class={`${styles.projectSectionText} mb-12`}>
                {t('portfolio.topico.storyP')}
              </p>

              <div className={`${styles.projectTopicoSubSection}`}>
                <ReactPlayer
                  className={`${styles.projectTopicoSectionReactcplayer}`}
                  url='https://vimeo.com/444281811'
                  controls
                />
                <p class={`${styles.projectSectionText} italic`}>
                  {t('portfolio.topico.storyItalic')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topico;
