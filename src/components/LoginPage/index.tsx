import React, { useState, useEffect, useContext, Fragment } from 'react';
import ShuffleCardIcon from '../../assets/svg/shuffle-cards.svg';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../../style.scss';
import './style.scss';
import { useFirebase } from '../../firebase/Firebase';

const LoginPage = () => {
  const { googleAuthProvider, authFirebase } = useFirebase();
  const [user, loading] = useAuthState(authFirebase);
  const [msgError, setMsgError] = useState('');
  const history = useHistory();

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    authFirebase
      .signInWithPopup(googleAuthProvider)
      .then((res: any) => {
        console.log(res.user);
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  return (
    <div className='login-content'>
      <Fragment>
        <img className='logo' src={ShuffleCardIcon} alt='Boton Juego' />
        <h2>BlackJack Grumoso</h2>
        <form>
          <div className='custom-form login-form'>
            <p>Ingresar con tu cuenta Google</p>
            {msgError !== '' ? <p>{msgError}</p> : null}
            <button className='btn-grid' type='button' onClick={handleClick}>
              <span>Ingresar</span>
            </button>
          </div>
        </form>
      </Fragment>
    </div>
  );
};

export default LoginPage;
