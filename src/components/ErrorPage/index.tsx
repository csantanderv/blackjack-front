import React, { useContext } from 'react';
import { AppContext } from '../../state/Store';
import '../../style.scss';

const ErrorPage = () => {
  const { state } = useContext(AppContext);

  return (
    <div className='main-content'>
      <h1>
        <i /> {state.msgError}
      </h1>
    </div>
  );
};

export default ErrorPage;
