import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';

const Navbar = ({ heroRef }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [observedElements, setObservedElements] = useState([]);
  const [lastClicked, setLastClicked] = useState(null);
  

  useEffect(() => {
    setObservedElements([
      heroRef.current,
      ...navLinks.map(({ id }) => document.querySelector(`#${id}`)),
    ]);
  }, []);

  const entries = useIntersectionObserver(observedElements, {
    rootMargin: '-35% 0px',
    threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // Create an array of threshold values from 0 to 1 with 0.05 increments
  });
  

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !lastClicked) {
        if (entry.target === heroRef.current) {
          setActive('');
        } else {
          setActive(entry.target.id);
        }
      }
    });
  }, [entries, heroRef, lastClicked]);


  return (
    <nav
      id='navbar'
      className={`${styles.paddingX} w-full flew items-center py-5 fixed top-0 z-20  bg-primary`}
    >
      <div
        className={`${styles.paddingX} w-full flex justify-between items-center max-w-7xl mx-auto`}
      >
        {/* The title and the logo of the navbar */}
        <Link
          id='navbar'
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt='logo'
            width='100'
            height='50'
            className='w-9 h-9 object-container'
          />
          <p className='text-black text-[18px] font-bold cursor-pointer flex'>
             &nbsp;
            <span className='sm:block hidden'> | Interaction design </span>
          </p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              className={`${
                active === link.id
                  ? 'text-black active-underline'
                  : 'text-secondary'
              } hover:text-black- text-[18px] font-medium cursor-pointer hover-underline`}
              onClick={() => {
                setActive(link.id);
                setLastClicked(link.id);
              }}
            >
              <a data-target={`#${link.id}`} href={`#${link.id}`}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger menu containing the link elements when in mobile mode */}
        <div className='sm:hidden flex jusstify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px]
            object-contain cursor-pointer '
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 `}
          >
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.id
                      ? 'text-black active-underline'
                      : 'text-secondary'
                  } hover:text-black- text-[18px] font-medium cursor-pointer hover-underline`}
                  onClick={() => {
                    setActive(link.id);
                    setLastClicked(link.id);

                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
