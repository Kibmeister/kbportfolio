import React, { useState, useRef } from 'react';
import { globe } from '../assets';
import { LANGUAGES } from '../constants';

const CustomDropdown = ({ onChangeLang }) => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLangChange = (event) => {
    setSelectedLang(event.target.value);
    onChangeLang(event.target.value);
    setDropdownVisible(false); // Close dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className='relative '>
      {/* dropdown button */}
      <div className='relative  flex flex-row justify-start items-center gap-3'>
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
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'
            ></path>
          </svg>
        </button>
        <div className='globe-icon-container'>
          <img src={globe} width='32x' height='32px' alt='glob-icon'></img>
        </div>
      </div>

      {/*  dropdown */}
      <div
        id='dropdown'
        ref={dropdownRef}
        className={`absolute mt-2 z-10 bg-white divide-y divide-gray-100  shadow w-22
          ${dropdownVisible ? 'visible' : 'invisible h-0 overflow-hidden'}`}
      >
        <ul
          className='py-2 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownDefaultButton'
        >
          {LANGUAGES.map(({ code, label, icon }) => (
            <li
              className={
                'mr-2 flex flex-row justify-center align-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              }
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
              ></img>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomDropdown;
