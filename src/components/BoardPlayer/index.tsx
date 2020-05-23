import React, { useContext, useState, useEffect } from 'react';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import PlayerBet from '../PlayerBet';
import GameButton from '../GameButton';
import { dispatchToast, ToastMsg } from '../../utils/ToastUtils';
import { AppContext } from '../../state/Store';
import { ActionTypes, PlayerType } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';
import '../../index.scss';
import './style.scss';

const BoardPlayer = () => {
  const { state, dispatch } = useContext(AppContext);
  const { connectedUser, players, currentPlayer, socket } = state;

  useEffect(() => {
    if (socket) {
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

  useEffect(() => {
    if (players && connectedUser) {
      players.map((player: PlayerType) => {
        if (player.id === connectedUser.id) {
          dispatch({
            type: ActionTypes.SetCurrentPlayer,
            payload: {
              currentPlayer: player,
            },
          });
        }
      });
    }
  }, [players]);

  const handleStand = () => {
    if (currentPlayer && socket) {
      socket.emit(EventTypes.PlayerStand, currentPlayer);
    }
  };

  const handleBet = () => {
    if (currentPlayer && socket) {
      socket.emit(EventTypes.PlayerBet, currentPlayer);
    }
  };

  const handleHit = () => {
    if (currentPlayer && socket) {
      socket.emit(EventTypes.PlayerHit, currentPlayer);
    }
  };

  return (
    <div className='item-container'>
      <div className='game-options'>
        <div className='deck'>
          {currentPlayer ? <CardDeck cards={currentPlayer.cards} /> : null}
        </div>
        <PlayerBet />
        <div className='game-buttons'>
          <GameButton src={StandHandIcon} onClick={handleStand} />
          <GameButton src={BetMoneyIcon} onClick={handleBet} />
          <GameButton src={HitHandIcon} onClick={handleHit} />
        </div>
      </div>
      {/* <ToastMsg /> */}
    </div>
  );
};

export default BoardPlayer;
