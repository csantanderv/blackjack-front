import React, { useState, useEffect, useContext, Fragment } from 'react';
import ShuffleCardIcon from '../../assets/svg/shuffle-cards.svg';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../state/Store';
import { ActionTypes } from '../../state/StoreTypes';
import { useLoginUser } from '../../services/hooks/useLoginUser';
import '../../style.scss';
import './style.scss';

const LoginPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [msgError, setMsgError] = useState('');
  const [token, setLoginUser, isLoading, error] = useLoginUser();
  const history = useHistory();

  useEffect(() => {
    if (state && state.token && state.token !== '') {
      history.push('/game');
    }
  }, [state, history]);

  useEffect(() => {
    if (token !== '') {
      dispatch({
        type: ActionTypes.Login,
        payload: {
          token: token + '',
        },
      });
      localStorage.setItem('token', token);
      history.push('/game');
    }
  }, [token, dispatch, history]);

  useEffect(() => {
    if (error !== '') {
      dispatch({
        type: ActionTypes.Error,
        payload: {
          isError: true,
          msgError: error + '',
        },
      });
    }
  }, [error, dispatch]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user.email !== '' && user.password !== '') {
      const body = JSON.stringify(user);
      setLoginUser(body);
    } else {
      setMsgError('Debe ingresar el email y password');
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
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <Fragment>
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
                <span>Ingresar</span>
              </button>
            </div>
          </form>
        </Fragment>
      )}
    </div>
  );
};

export default LoginPage;
