import React, { useState, FC, ReactNode } from 'react';
import BankIcon from '../../assets/svg/bank.svg';
import PlayerPlayingIcon from '../../assets/svg/player-playing.svg';
import './style.scss';

export const Navbar: FC = (props) => {
  return (
    <div className='navbar-container'>
      <div className='game-info'>
        <img src={BankIcon} alt='Carta' />
        <div className='player-bank-info'>
          <h2 className='player-name'>Mauro:</h2>
          <h2 className='mount-bank'>$ 10.000</h2>
        </div>
        <img src={PlayerPlayingIcon} alt='Carta' />
        <div className='player-bank-info'>
          <h2 className='mount-bank'>Pepe</h2>
        </div>
      </div>
      <nav className='navbar'>
        <ul className='navbar-nav'>{props.children}</ul>
      </nav>
    </div>
  );
};

type NavItemProps = {
  icon: ReactNode;
};

export const NavItem: FC<NavItemProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <li className='nav-item'>
      <a href='#/' className='icon-button-menu' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
};
