import React from 'react';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu-icon.svg';
import { ReactComponent as QuitIcon } from '../../assets/svg/quit.svg';
import DropdownMenu from '../../components/DropdownMenu';
import { Navbar, NavItem } from '../../components/Navbar';
import '../../index.scss';
import { useHistory } from 'react-router-dom';

const Header = (props: any) => {
  const history = useHistory();

  const logout = () => {
    localStorage.setItem('token', '');
    history.push('/');
  };

  return (
    <Navbar>
      <NavItem icon={<MenuIcon />} onClick={() => {}}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
      <NavItem icon={<QuitIcon />} onClick={logout} />
    </Navbar>
  );
};

export default Header;
