import React, { useContext } from 'react';
import { ReactComponent as QuitIcon } from '../../assets/svg/quit.svg';
import { Navbar, NavItem } from '../../components/Navbar';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../state/Store';
import { ActionTypes } from '../../state/StoreTypes';
import '../../index.scss';
import HeaderGameInfo from '../HeaderGameInfo';

type HeaderProps = {
  onLogout(): void;
};

const Header = (props: HeaderProps) => {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  const logout = () => {
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
      <HeaderGameInfo />
      <NavItem icon={<QuitIcon />} onClick={logout} />
    </Navbar>
  );
};

export default Header;
