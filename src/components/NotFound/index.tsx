import React from 'react';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu-icon.svg';
import DropdownMenu from '../../components/DropdownMenu';
import { Navbar, NavItem } from '../../components/Navbar';
import '../../index.scss';

const NotFound = () => {
  return (
    <div className='main-content'>
      <h1>
        <i /> Page Not Found
      </h1>
      <p>Sorry, this page does not exist</p>
    </div>
  );
};

export default NotFound;
