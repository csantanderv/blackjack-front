import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu-icon.svg';
import DropdownItem from '../DropdownItem';
import '../../index.scss';
import './style.scss';

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      const node = dropdownRef.current;
      setMenuHeight(400);
      //FIXME: Arregle la obtención del tamaño del div
      //setMenuHeight(node.firstChild.offsetHeight);
    }
  }, []);

  const handleClickItem = (goTo: string) => {
    setActiveMenu(goTo);
  };

  const calcHeight = (element: HTMLElement) => {
    const height = element.offsetHeight;
    setMenuHeight(height);
  };

  return (
    <div className='dropdown' style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames='menu-primary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem
            leftIcon={<MenuIcon />}
            goToMenu='settings'
            onClick={handleClickItem}
          >
            Settings
          </DropdownItem>
          <DropdownItem leftIcon={<MenuIcon />} onClick={handleClickItem}>
            Salir
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem
            leftIcon={<MenuIcon />}
            rightIcon={<MenuIcon />}
            onClick={handleClickItem}
          >
            HTML
          </DropdownItem>
          <DropdownItem leftIcon={<MenuIcon />} onClick={handleClickItem}>
            CSS
          </DropdownItem>
          <DropdownItem leftIcon={<MenuIcon />} onClick={handleClickItem}>
            JavaScript
          </DropdownItem>
          <DropdownItem leftIcon={<MenuIcon />} onClick={handleClickItem}>
            Awesome!
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
