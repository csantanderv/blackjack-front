import React from 'react';
import CoinUpIcon from '../../assets/svg/coin-up.svg';
import CoinDownIcon from '../../assets/svg/coin-down.svg';
import '../../index.scss';
import './style.scss';

const PlayerBet = () => {
  return (
    <div className='bet-container'>
      <figure className='icon-coin'>
        <img src={CoinUpIcon} alt='Apuesta Más' />
      </figure>
      <h1>$ 2000</h1>
      <figure className='icon-coin'>
        <img src={CoinDownIcon} alt='Apuesta Menos' />
      </figure>
    </div>
  );
};

export default PlayerBet;
