import React, { useState, useEffect, useContext } from 'react';
import BufonIcon from '../../assets/svg/bufon.svg';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../state/Store';
import ApiClient from '../../services/api/ApiClient';
import { ActionTypes } from '../../state/StoreTypes';
import '../../index.scss';
import '../../input.scss';
import './style.scss';
import setAuthToken from '../../utils/Auth';

const LoginPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
      history.push('/game');
    }
  }, []);

  const history = useHistory();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
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
      <img className='bufon' src={BufonIcon} alt='Boton Juego' />
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
          <button className='btn-grid' type='button' onClick={handleClick}>
            <span className='front'>Ingresar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
