import React, { useContext, useEffect } from 'react';
import PlusIcon from '../../assets/svg/plus.svg';
import RestIcon from '../../assets/svg/rest.svg';
import { AppContext } from '../../state/Store';
import { ActionTypes } from '../../state/StoreTypes';
import '../../style.scss';
import './style.scss';
import GameButton from '../GameButton';

const PlayerBet = () => {
  const { state, dispatch } = useContext(AppContext);
  const { currentPlayer } = state;

  useEffect(() => {}, [currentPlayer]);

  const handleChange = (delta: number) => {
    //TODO: Se debe cambiar le 100 por un delta configurable
    if (currentPlayer) {
      if (currentPlayer.betAmount + delta >= 0) {
        dispatch({
          type: ActionTypes.ChangeBet,
          payload: {
            currentPlayer: {
              ...currentPlayer,
              betAmount: currentPlayer.betAmount + delta,
            },
          },
        });
      }
    }
  };

  return currentPlayer ? (
    <div className='bet-container'>
      <GameButton
        type='primary'
        size='small'
        src={PlusIcon}
        onClick={() => {
          handleChange(100);
        }}
      />
      <div className='bet-amount'>
        <h1>$ {currentPlayer.betAmount}</h1>
      </div>
      <GameButton
        type='primary'
        size='small'
        src={RestIcon}
        onClick={() => {
          handleChange(-100);
        }}
      />
    </div>
  ) : null;
};

export default PlayerBet;
