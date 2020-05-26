import React, { useContext, useEffect, Fragment } from 'react';
import BankIcon from '../../assets/svg/bank.svg';
import PlayerPlayingIcon from '../../assets/svg/player-playing.svg';
import LosingIcon from '../../assets/svg/losing.svg';
import { AppContext } from '../../state/Store';
import { EventTypes } from '../../services/socket/EventTypes';
import { ActionTypes, PlayerType } from '../../state/StoreTypes';
import './style.scss';

const HeaderGameInfo = () => {
  const { state, dispatch } = useContext(AppContext);
  const { bank, connectedUser, currentPlayer, socket } = state;

  useEffect(() => {
    console.log('entro use effect HeaderGameInfo');
  }, [connectedUser, bank]);

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
  }, [socket]);

  useEffect(() => {}, [currentPlayer]);

  return (
    <div className='game-info'>
      {bank && bank.id !== '' ? (
        <Fragment>
          <img src={BankIcon} alt='Carta' />
          <div className='player-info'>
            <h2 className='name'>{bank.name}</h2>
            <div className='total-lost'>
              <img src={LosingIcon} className='icon-lost' alt='Perdido' />
              <h2 className='mount'>$ {bank.totalAmountLost}</h2>
            </div>
          </div>
        </Fragment>
      ) : null}
      {connectedUser && connectedUser.profile === 'PLAYER' && currentPlayer ? (
        <Fragment>
          <img src={PlayerPlayingIcon} alt='Carta' />
          <div className='player-info'>
            <h2 className='name'>{currentPlayer.name}</h2>
            <div className='total-lost'>
              <img src={LosingIcon} className='icon-lost' alt='Perdido' />
              <h2 className='mount'>$ {currentPlayer.totalAmountLost}</h2>
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default HeaderGameInfo;
