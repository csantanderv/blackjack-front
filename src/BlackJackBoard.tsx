import React, { useState, useEffect, useContext, Fragment } from 'react';
import Header from './components/Header';
import BoardMultiplayer from './components/BoardMultiplayer';
import BoardPlayer from './components/BoardPlayer';
import BoardBank from './components/BoardBank';
import { AppContext } from './state/Store';
import { useHistory } from 'react-router-dom';
import { ActionTypes, PlayerType } from './state/StoreTypes';
import { useGetUser } from './services/hooks/useGetUser';
import { useSocket } from './services/hooks/useSocket';
import './index.scss';
import { EventTypes } from './services/socket/EventTypes';
import { ToastMsg, dispatchToast } from './utils/ToastUtils';

const BlackJackBoard = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
  const token = localStorage.getItem('token');
  const [user, isLoading, errorUser] = useGetUser(token);
  const [socket, errorSocket, setCurrentPlayer] = useSocket(state.token);
  const { connectedUser } = state;
  const history = useHistory();

  useEffect(() => {
    if (errorUser !== '') {
      dispatch({
        type: ActionTypes.Error,
        payload: {
          isError: true,
          msgError: 'Debe estar logeado para poder ingresar',
        },
      });
      history.push('/error');
    }
  }, [errorUser]);

  useEffect(() => {
    console.log('use effect backjackboard');
    if (user !== null) {
      dispatch({
        type: ActionTypes.SetConnectedUser,
        payload: {
          connectedUser: {
            id: user.id,
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
      setCurrentPlayer({ id: user.id, profile: user.profile, name: user.name });
    }
  }, [user]);

  //TODO: Arreglar problema de toast, quizas borrar uno de los toast container
  useEffect(() => {
    if (socket !== null) {
      if (state.socket === null) {
        dispatch({
          type: ActionTypes.ConnectSocket,
          payload: {
            socket: socket,
          },
        });
      }
      socket.on(EventTypes.Connected, (data: any) => {
        dispatchToast(data);
      });
      socket.on(EventTypes.PlayerConnected, (data: any) => {
        dispatch({
          type: ActionTypes.SetCurrentPlayer,
          payload: {
            currentPlayer: data,
          },
        });
        dispatchToast(data.name);
      });
      socket.on(EventTypes.Disconnected, (data: any) => {
        dispatchToast(data);
      });
    }
  }, [socket]);

  const handleLogout = () => {
    if (socket) {
      socket.emit(EventTypes.Logout);
    }
    localStorage.setItem('token', '');
  };

  return (
    <div className='main-content'>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <Fragment>
          <Header onLogout={handleLogout}></Header>
          <BoardMultiplayer />
          {connectedUser && connectedUser.profile === 'BANK' ? (
            <BoardBank />
          ) : (
            <BoardPlayer />
          )}
          <ToastMsg />
        </Fragment>
      )}
    </div>
  );
};

export default BlackJackBoard;
