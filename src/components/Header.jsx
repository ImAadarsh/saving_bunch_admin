import React, { useState } from 'react'

import LogoIcon from '../images/logo/logo-icon.svg'
import DropdownNotification from './DropdownNotification'
import DropdownMessage from './DropdownMessage'
import DropdownUser from './DropdownUser'
import DarkModeSwitcher from './DarkModeSwitcher'
import { Link } from 'react-router-dom'

const Header = (props) => {  
  return (
    <header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
      <div className='flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11'>
        <div></div>
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
