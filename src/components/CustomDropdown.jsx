import React, { useState, useRef, useEffect } from 'react';
import { globe } from '../assets';
import { LANGUAGES } from '../constants';

const CustomDropdown = ({
  onChangeLang,
  selectedLang,
  setSelectedLang,
  setToggle,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(LANGUAGES[0]?.code);
  const dropdownRef = useRef(null);

  const handleLangChange = (event) => {
    // console.log('the dropdownvisibility', dropdownVisible);
    setToggle(false);
    setSelectedLang(event.target.value);
    setActiveItem(event.target.value);
    onChangeLang(event.target.value);
    setDropdownVisible(false); // Close dropdown after selecting an option
  };

  const toggleDropdown = () => {
    // console.log('the dropdownvisibility', dropdownVisible);
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <div className='relative '>
      {/* dropdown button */}
      <div
        id='id_dropdowncontainer'
        className=' relative  flex flex-row justify-start items-center gap-3'
      >
        <button
          id='dropdownDefaultButton'
          data-dropdown-toggle='dropdown'
          className='bg-black text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2.5 text-center inline-flex items-center '
          type='button'
          onClick={toggleDropdown}
        >
          {LANGUAGES.find((lang) => lang.code === selectedLang)?.label}
          <svg
            className='w-4 h-4 ml-2'
            aria-hidden='true'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='100%' height='100%' fill='#1E1E1D' stroke='#1E1E1D' />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>
        <div className='globe-icon-container'>
          <img
            src={globe}
            style={{ width: '2em', height: '2em' }}
            alt='glob-icon'
          ></img>
        </div>
      </div>

      {/*  dropdown */}
      <div
        id='dropdown'
        ref={dropdownRef}
        className={`bg-primary absolute mt-2 z-10  divide-y divide-black dropdown w-22 shadow-dropdown
          ${dropdownVisible ? 'visible' : 'invisible h-0 overflow-hidden'}`}
      >
        <ul
          className='py-2 text-sm text-black'
          aria-labelledby='dropdownDefaultButton'
        >
          {LANGUAGES.map(({ code, label, icon }) => (
            <li
              className={`flex flex-row justify-center align-center hover:border-secondary relative 
    ${
      activeItem === code
        ? 'text-black border-b-2 border-secondary'
        : 'text-lightblack border-b-2 border-transparent'
    }`}
              key={code}
            >
              <button
                className='block px-4 py-2  w-full text-left'
                value={code}
                onClick={handleLangChange}
              >
                {label}
              </button>
              <img
                src={icon}
                width='32px'
                height='32x'
                alt='language-icon'
                className={'mr-2'}
              ></img>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomDropdown;
