import React, { useState } from 'react'

import LogoIcon from '../images/logo/logo-icon.svg'
import DropdownNotification from './DropdownNotification'
import DropdownMessage from './DropdownMessage'
import DropdownUser from './DropdownUser'
import DarkModeSwitcher from './DarkModeSwitcher'
import { Link } from 'react-router-dom'

const Header = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
      <div className='flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11'>
        <div onClick={()=>{
          setSidebarOpen(!sidebarOpen);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>
        </div>
        <div className='flex items-center gap-3 2xsm:gap-7'>
          <ul className='flex items-center gap-2 2xsm:gap-4'>
            {/* <DarkModeSwitcher /> */}

            {/* <DropdownNotification /> */}

            {/* <DropdownMessage /> */}
          </ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
