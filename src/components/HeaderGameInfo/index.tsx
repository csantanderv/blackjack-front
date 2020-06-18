import React, { useContext, useEffect, Fragment } from 'react';
import BankIcon from '../../assets/svg/bank.svg';
import CoinStackIncon from '../../assets/svg/coin-stack.svg';
import PlayerPlayingIcon from '../../assets/svg/player-playing.svg';
import LosingIcon from '../../assets/svg/losing.svg';
import { AppContext } from '../../state/Store';
import { EventTypes } from '../../services/socket/EventTypes';
import { ActionTypes } from '../../state/StoreTypes';
import './style.scss';

const HeaderGameInfo = () => {
  const { state, dispatch } = useContext(AppContext);
  const { bank, connectedUser, currentPlayer, socket } = state;

  useEffect(() => {}, [connectedUser, bank]);

  useEffect(() => {
    if (socket && connectedUser && connectedUser.profile === 'PLAYER') {
      socket.on(EventTypes.SetBank, (data: any) => {
        dispatch({
          type: ActionTypes.SetBank,
          payload: {
            bank: data,
          },
        });
      });
      socket.on(EventTypes.SetPlayers, (data: any) => {
        if (data) {
          dispatch({
            type: ActionTypes.SetPlayers,
            payload: {
              players: data,
            },
          });
        }
      });
    }
  }, [socket, connectedUser, dispatch]);

  useEffect(() => {}, [currentPlayer]);

  return (
    <div className='game-info'>
      {bank && bank.id !== '' ? (
        <Fragment>
          <img src={BankIcon} alt='Carta' />
          <div className='player-info'>
            <h2 className='name'>{bank.name}</h2>
            <div className='total-win'>
              <img src={CoinStackIncon} className='icon-lost' alt='Ganado' />
              <p className='mount'>$ {bank.totalAmountWin}</p>
            </div>
            <div className='total-lost'>
              <img src={LosingIcon} className='icon-lost' alt='Perdido' />
              <p className='mount'>$ {bank.totalAmountLost}</p>
            </div>
          </div>
        </Fragment>
      ) : null}
      {connectedUser && connectedUser.profile === 'PLAYER' && currentPlayer ? (
        <Fragment>
          <img src={PlayerPlayingIcon} alt='Carta' />
          <div className='player-info'>
            <h2 className='name'>{currentPlayer.name}</h2>
            <div className='total-win'>
              <img src={CoinStackIncon} className='icon-lost' alt='Ganado' />
              <p className='mount'>$ {currentPlayer.totalAmountWin}</p>
            </div>
            <div className='total-lost'>
              <img src={LosingIcon} className='icon-lost' alt='Perdido' />
              <p className='mount'>$ {currentPlayer.totalAmountLost}</p>
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default HeaderGameInfo;
