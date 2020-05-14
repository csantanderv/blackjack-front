import React, { useState, FC, ReactNode } from 'react';
import './style.scss';
import HeaderGameInfo from '../HeaderGameInfo';

export const Navbar: FC = (props) => {
  return (
    <div className='navbar-container'>
      <HeaderGameInfo />
      <nav className='navbar'>
        <ul className='navbar-nav'>{props.children}</ul>
      </nav>
    </div>
  );
};

type NavItemProps = {
  icon: ReactNode;
  onClick(): void;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event: any) => {
    event.preventDefault();
    setOpen(!open);
    props.onClick();
  };

  return (
    <li className='nav-item'>
      <a
        href='#/'
        className='icon-button-menu'
        onClick={(event) => handleClick(event)}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
};
