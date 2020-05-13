import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import BoardMultiplayer from './components/BoardMultiplayer';
import BoardPlayer from './components/BoardPlayer';
import BoardBank from './components/BoardBank';
import { AppContext } from './state/Store';
import './index.scss';
import { useHistory } from 'react-router-dom';
import ApiClient from './services/api/ApiClient';
import { ActionTypes } from './state/StoreTypes';
import setAuthToken from './utils/Auth';

const ENDPOINT = 'http://127.0.0.1:4001';

const BlackJackBoard = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [currentPlayer, setCurrentPlayer] = useState({ name: '', profile: '' });

  useEffect(() => {
    if (currentPlayer.name === '') {
      getUser();
    }
  }, [currentPlayer]);

  const getUser = async () => {
    try {
      setAuthToken(localStorage.token);
      const res = await ApiClient(state.token).get('api/auth');
      const user = {
        profile: res.data.profile + '',
        name: res.data.name + '',
      };
      setCurrentPlayer(user);
      dispatch({
        type: ActionTypes.UserLoaded,
        payload: user,
      });
      history.push('/game');
    } catch (error) {
      setAuthToken('');
      dispatch({
        type: ActionTypes.Error,
        payload: {
          isError: true,
          msgError: 'Debe estar logeado para poder ingresar',
        },
      });
      history.push('/error');
    }
  };

  /*   useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: any) => {
      setResponse(data);
    });
  }, []);
 */
  // TODO: Falta agregar un loading
  return (
    <div className='main-content'>
      <Header></Header>
      <BoardMultiplayer />
      {currentPlayer.profile === 'BANK' ? <BoardBank /> : <BoardPlayer />}
    </div>
  );
};

export default BlackJackBoard;
