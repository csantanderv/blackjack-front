import React, { useState, useEffect, useContext, Fragment } from 'react';
import Header from './components/Header';
import BoardMultiplayer from './components/BoardMultiplayer';
import BoardPlayer from './components/BoardPlayer';
import BoardBank from './components/BoardBank';
import { AppContext } from './state/Store';
import { useHistory } from 'react-router-dom';
import { ActionTypes, PlayerType } from './state/StoreTypes';
import { useGetUser } from './services/hooks/useGetUser';
import './index.scss';

const ENDPOINT = 'http://localhost:3002';

const BlackJackBoard = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
  const [user, isLoading, error] = useGetUser(state.token);
  const { currentPlayer } = state;
  const history = useHistory();

  useEffect(() => {
    if (error !== '') {
      dispatch({
        type: ActionTypes.Error,
        payload: {
          isError: true,
          msgError: 'Debe estar logeado para poder ingresar',
        },
      });
      history.push('/error');
    }
  }, [error]);

  useEffect(() => {
    console.log('use effect backjackboard');
    if (user !== null) {
      dispatch({
        type: ActionTypes.UserLoaded,
        payload: {
          currentPlayer: {
            id: '3',
            name: user.name,
            profile: user.profile,
            playing: false,
            totalAmountLost: 0,
            betAmount: 0,
            currentResult: 'PLAYING',
            cards: [],
          },
        },
      });
      //history.push('/game');
    }
  }, [user]);

  useEffect(() => {}, [currentPlayer]);

  /*   useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: any) => {
      setResponse(data);
    });
  }, []);
 */
  return (
    <div className='main-content'>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <Fragment>
          <Header></Header>
          <BoardMultiplayer />
          {currentPlayer && currentPlayer.profile === 'BANK' ? (
            <BoardBank />
          ) : (
            <BoardPlayer />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default BlackJackBoard;
