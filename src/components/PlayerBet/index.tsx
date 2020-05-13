import React, { useContext, useEffect } from 'react';
import CoinUpIcon from '../../assets/svg/coin-up.svg';
import CoinDownIcon from '../../assets/svg/coin-down.svg';
import { AppContext } from '../../state/Store';
import { ActionTypes } from '../../state/StoreTypes';
import '../../index.scss';
import './style.scss';

const PlayerBet = () => {
  const { state, dispatch } = useContext(AppContext);
  const { currentPlayer } = state;

  useEffect(() => {
    console.log('entro use effect PlayerBet');
  }, [currentPlayer]);

  const handleChange = (delta: number) => {
    //TODO: Se debe cambiar le 100 por un delta configurable
    if (currentPlayer) {
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
  };

  return (
    <div className='bet-container'>
      <figure
        className='icon-coin'
        onClick={(e: any) => {
          e.preventDefault();
          handleChange(100);
        }}
      >
        <img src={CoinUpIcon} alt='Apuesta Más' />
      </figure>
      <h1>$ {currentPlayer ? currentPlayer.betAmount : '0'}</h1>
      <figure
        className='icon-coin'
        onClick={(e: any) => {
          e.preventDefault();
          handleChange(-100);
        }}
      >
        <img src={CoinDownIcon} alt='Apuesta Menos' />
      </figure>
    </div>
  );
};

export default PlayerBet;
