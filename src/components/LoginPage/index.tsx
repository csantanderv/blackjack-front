import React, { useState } from 'react';
import BufonIcon from '../../assets/svg/bufon.svg';
import '../../index.scss';
import '../../input.scss';
import './style.scss';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
  const [redirect, setRedirect] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to='/game' />;
  }

  return (
    <div className='login-content'>
      <img className='bufon' src={BufonIcon} alt='Boton Juego' />
      <h2>BlackJack Grumoso</h2>
      <div className='custom-form login-form'>
        <input type='text' placeholder='Name' required />
        <input type='Password' placeholder='Password' required />
        <button className='btn-grid' type='button' onClick={handleClick}>
          <span className='front'>Ingresar</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
