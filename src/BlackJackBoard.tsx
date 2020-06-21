import React, { useEffect, useContext, Fragment } from 'react';
import Header from './components/Header';
import BoardMultiplayer from './components/BoardMultiplayer';
import BoardPlayer from './components/BoardPlayer';
import BoardBank from './components/BoardBank';
import { AppContext } from './state/Store';
import { useHistory } from 'react-router-dom';
import { ActionTypes } from './state/StoreTypes';
import { useGetUser } from './services/hooks/useGetUser';
import { useSocket } from './services/hooks/useSocket';
import { EventTypes } from './services/socket/EventTypes';
import { ToastMsg, dispatchToast } from './utils/ToastUtils';
import './index.scss';

const BlackJackBoard = (props: any) => {
  const { state, dispatch } = useContext(AppContext);
  const token = localStorage.getItem('token');
  const [user, isLoading, errorUser] = useGetUser(token);
  const [socket, errorSocket, setSocketPlayer] = useSocket(state.token);
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
  }, [errorUser, dispatch, history]);

  useEffect(() => {
    if (errorSocket !== '') {
      dispatch({
        type: ActionTypes.Error,
        payload: {
          isError: true,
          msgError: 'El canal de comunicación presenta un problema',
        },
      });
      history.push('/error');
    }
  }, [errorSocket, dispatch, history]);

  useEffect(() => {
    if (user && connectedUser === null) {
      dispatch({
        type: ActionTypes.SetConnectedUser,
        payload: {
          connectedUser: {
            id: user.id,
            name: user.name,
            profile: user.profile,
            hiting: true,
            standing: true,
            totalAmountLost: 0,
            totalAmountWin: 0,
            totalCards: 0,
            betAmount: 0,
            currentResult: 'PLAYING',
            cards: [],
          },
        },
      });
      setSocketPlayer({ id: user.id, profile: user.profile, name: user.name });
    }
  }, [user, dispatch, setSocketPlayer, connectedUser]);

  useEffect(() => {
    if (socket && state.socket === null) {
      dispatch({
        type: ActionTypes.ConnectSocket,
        payload: {
          socket: socket,
        },
      });
    }
  }, [socket, state.socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on(EventTypes.PlayerConnected, (data: any) => {
        if (state.currentPlayer === null) {
          dispatch({
            type: ActionTypes.SetCurrentPlayer,
            payload: {
              currentPlayer: data,
            },
          });
          dispatchToast(data.name + ' se ha conectado');
        }
      });
      /*       socket.on(EventTypes.Disconnected, (data: any) => {
        dispatchToast(data);
      });
 */
    }
  }, [socket, dispatch, state.currentPlayer]);

  const handleLogout = () => {
    if (socket) {
      socket.emit(EventTypes.Logout);
      socket.disconnect();
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
