import React, { useEffect, useState } from 'react';

const LampCanvas = ({lampToggle}) => {

  return (
    <>
      <div className='w-[600px] h-[400px] bg-[#efefef] relative flex items-center justify-center'>
        <p>
          This is soon transforming into a 3D lamp object that can toggle the
          view of the site
        </p>
        <button
          id="id_lamp"
          className='bg-secondary py-3 px-8 outline-none w-fit text-white font-bold shadow-md'
          onClick={lampToggle}
        >
          This is the lamp toggle
        </button>
      </div>
    </>
  );
};

export default LampCanvas;
