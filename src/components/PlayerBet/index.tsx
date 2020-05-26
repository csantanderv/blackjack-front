import React, { useContext, useEffect } from 'react';
import CoinUpIcon from '../../assets/svg/coin-up.svg';
import CoinDownIcon from '../../assets/svg/coin-down.svg';
import { AppContext } from '../../state/Store';
import { ActionTypes } from '../../state/StoreTypes';
import '../../index.scss';
import './style.scss';

type PlayerBetProps = {
  onBetAmount(): void;
};

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
      <div className='icon-coin'>
        <img
          src={CoinUpIcon}
          onClick={(e: any) => {
            e.preventDefault();
            handleChange(100);
          }}
          alt='Apuesta Más'
        />
      </div>

      <div className='bet-amount'>
        <h1>$ {currentPlayer.betAmount}</h1>
      </div>

      <div className='icon-coin'>
        <img
          src={CoinDownIcon}
          onClick={(e: any) => {
            e.preventDefault();
            handleChange(-100);
          }}
          alt='Apuesta Menos'
        />
      </div>
    </div>
  ) : null;
};

export default PlayerBet;
