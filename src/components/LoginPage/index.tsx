import React, { useState, useEffect, useContext } from 'react';
import BufonIcon from '../../assets/svg/bufon.svg';
import ShuffleCardIcon from '../../assets/svg/shuffle-cards.svg';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../state/Store';
import ApiClient from '../../services/api/ApiClient';
import { ActionTypes } from '../../state/StoreTypes';
import '../../index.scss';
import '../../input.scss';
import './style.scss';

const LoginPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [msgError, setMsgError] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
      history.push('/game');
    }
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      user.email === '' || user.password === ''
        ? setMsgError('Debe ingresar el email y password')
        : setMsgError('');

      const body = JSON.stringify(user);
      const res = await ApiClient('').post('api/auth', body);
      dispatch({
        type: ActionTypes.Login,
        payload: {
          token: res.data.token + '',
        },
      });
      localStorage.setItem('token', res.data.token);
      history.push('/game');
    } catch (error) {
      dispatch({
        type: ActionTypes.Error,
        payload: {
          isError: true,
          msgError: 'El login o password no corresponde',
        },
      });
      setMsgError('Email o password incorrecto');
    }
  };

  const handleForm = (type: string, value: string) => {
    setUser((user) => ({
      ...user,
      [type]: value,
    }));
  };

  return (
    <div className='login-content'>
      <img className='logo' src={ShuffleCardIcon} alt='Boton Juego' />

      <h2>BlackJack Grumoso</h2>
      <form>
        <div className='custom-form login-form'>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={user.email}
            onChange={(e) => {
              handleForm('email', e.target.value);
            }}
            required
          />
          <input
            name='password'
            type='Password'
            placeholder='Password'
            onChange={(e) => {
              handleForm('password', e.target.value);
            }}
            value={user.password}
            required
          />
          {msgError !== '' ? <p>{msgError}</p> : null}
          <button className='btn-grid' type='button' onClick={handleClick}>
            <span className='front'>Ingresar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
