import React, { useContext } from 'react';
import { AppContext } from '../state/Store';
import { ActionTypes } from '../state/StoreTypes';
import ApiClient from './api/ApiClient';

const Login = async (email: string, password: string) => {
  const { state, dispatch } = useContext(AppContext);
  try {
    const body = JSON.stringify({ email, password });
    //const respone = await ApiClient().post('api/auth', body);

    dispatch({
      type: ActionTypes.Login,
      payload: {
        ...state,
        token: 'tokenresultado',
      },
    });
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

export default Login;
