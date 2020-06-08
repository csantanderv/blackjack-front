import React, { useContext } from 'react';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu-icon.svg';
import { ReactComponent as QuitIcon } from '../../assets/svg/quit.svg';
import DropdownMenu from '../../components/DropdownMenu';
import { Navbar, NavItem } from '../../components/Navbar';
import '../../index.scss';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../state/Store';
import { ActionTypes } from '../../state/StoreTypes';

type HeaderProps = {
  onLogout(): void;
};

const Header = (props: HeaderProps) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  const logout = () => {
    //localStorage.setItem('token', '');
    dispatch({
      type: ActionTypes.Login,
      payload: {
        token: '',
      },
    });
    props.onLogout();
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
