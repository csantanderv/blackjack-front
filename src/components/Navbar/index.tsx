import React, { FC, ReactNode } from 'react';
import './style.scss';

export const Navbar: FC = (props) => {
  return <div className='navbar-container'>{props.children}</div>;
};

type NavItemProps = {
  icon: ReactNode;
  onClick(): void;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const handleClick = (event: any) => {
    event.preventDefault();
    props.onClick();
  };

  return (
    <div className='nav-item'>
      <a
        href='#/'
        className='icon-button-menu'
        onClick={(event) => handleClick(event)}
      >
        {props.icon}
      </a>
    </div>
  );
};
