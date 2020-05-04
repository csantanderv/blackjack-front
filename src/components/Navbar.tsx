import React, { useState, FC, ReactNode } from 'react';

export const Navbar: FC = (props) => {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  );
};

type NavItemProps = {
  icon: ReactNode;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className='nav-item'>
      <a href='#/' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
};
