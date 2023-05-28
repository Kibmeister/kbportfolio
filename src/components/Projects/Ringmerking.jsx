import React from 'react';
import { useTranslation } from 'react-i18next';


const Ringmerking = ({ onClose, ringmerkingBackground }) => {
  //retrieving the t object
  const { t, i18n } = useTranslation();

  return (
    <div className='fixed z-30 inset-0 flex justify-center items-center h-screen w-screen'>
      <div className='bg-[#F0EADA] w-full h-full relative flex flex-col justify-between'>
        <button onClick={onClose} className='absolute top-4 right-4'>
          {t('portfolio.ringmerking.buttonclose')}
        </button>
        <div id='svg-container' className='flex-1'>
          <img
            src={ringmerkingBackground}
            alt='projectimage'
            className='object-contain mx-auto my-auto w-full h-full max-h-full max-w-full'
            style={{
              maxHeight: '100vh',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Ringmerking;
