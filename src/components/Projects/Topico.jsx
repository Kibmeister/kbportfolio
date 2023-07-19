import React from 'react';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

const Topico = ({ onClose, scenario, topicoDevice }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className='fixed inset-0 z-30 mx:auto bg-[#efefef] flex justify-center items-center h-screen w-screen overflow-y-auto '>
      <div className='bg-[#efefef] w-full h-full relative flex flex-col justify-between p-8 '>
        <div className='header'>
          <h1 className='garet-book text-4xl font-bold  mb-2 pl-12'>
            {t('portfolio.topico.title')}
          </h1>
          <h3 className='garet-book text-1xl italic mb-14 pl-12'>
            {t('portfolio.topico.caption')}
          </h3>
        </div>

        <div className='garet-book flex flex-wrap'>
          <button onClick={onClose} className='absolute top-4 right-4'>
            {t('portfolio.topico.buttonclose')}
          </button>
          <div className='w-full md:w-1/3 px-12 mb-8 md:mb-0'>
            <h2 className='garet-book text-2xl mb-14'>{t('portfolio.topico.conceptT')}</h2>
            <p className='garet-book mb-12'>{t('portfolio.topico.conceptP')}</p>

            <img src={scenario} alt='concept' className='w-full  mb-12' />
            <ul className='list-disc list-inside mb-12 space-y-4'>
              {t('portfolio.topico.ul', { returnObjects: true }).map(
                (item, index) => (
                  <li className="garet-book" key={index}> {item.value}</li>
                )
              )}
            </ul>
          </div>
          <div className='w-full md:w-2/3 px-12'>
            <h2 className='garet-book text-2xl  mb-14'>{t('portfolio.topico.storyT')}</h2>
            <p className='garet-book mb-12 max-w-[800px]'>
              {t('portfolio.topico.storyP')}
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
                {t('portfolio.topico.storyItalic')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topico;
