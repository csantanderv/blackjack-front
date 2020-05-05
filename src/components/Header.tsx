import React from 'react';
import { ReactComponent as MenuIcon } from '../assets/svg/menu-icon.svg';
import DropdownMenu from '../components/DropdownMenu';
import { Navbar, NavItem } from '../components/Navbar';
import '../index.scss';

function Header() {
  return (
    <Navbar>
      <NavItem icon={<MenuIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

export default Header;
