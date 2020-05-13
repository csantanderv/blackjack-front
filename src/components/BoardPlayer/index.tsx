import React, { useContext, useState } from 'react';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import PlayerBet from '../PlayerBet';
import GameButton from '../GameButton';
import { dispatchToast, ToastMsg } from '../../utils/ToastUtils';
import { AppContext } from '../../state/Store';
import { PlayerType, ActionTypes } from '../../state/StoreTypes';
import '../../index.scss';
import './style.scss';

const BoardPlayer = () => {
  const { state, dispatch } = useContext(AppContext);
  const { bank, players, currentPlayer } = state;
  const handleStand = () => {};
  const handleBet = () => {};
  const handleHit = () => {
    if (currentPlayer) {
      currentPlayer.cards.push({ card: 'X1', hidden: false });
      dispatch({
        type: ActionTypes.PlayerHitCard,
        payload: {
          currentPlayer: currentPlayer,
        },
      });
    } else {
      dispatchToast('No hay banco definido');
    }
  };

  return (
    <div className='item-container'>
      <div className='game-options'>
        <div className='deck'>
          {currentPlayer ? <CardDeck cards={currentPlayer.cards} /> : null}
        </div>
        <PlayerBet></PlayerBet>
        <div className='game-buttons'>
          <GameButton src={StandHandIcon} onClick={handleStand} />
          <GameButton src={BetMoneyIcon} onClick={handleBet} />
          <GameButton src={HitHandIcon} onClick={handleHit} />
        </div>
      </div>
      <ToastMsg />
    </div>
  );
};

export default BoardPlayer;
