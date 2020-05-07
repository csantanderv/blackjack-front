import React from 'react';
import Card2C from '../../assets/svg/cards/2C.svg';
import StackCoinIcon from '../../assets/svg/stack-coin.svg';
import LosingIcon from '../../assets/svg/losing.svg';
import '../../index.scss';
import './style.scss';

const PlayerCard = () => {
  return (
    <div className='player-board'>
      <div className='player-cards'>
        <img src={Card2C} alt='Carta' />
      </div>
      <div className='player-detail'>
        <p>Jugador 1</p>
        <img src={StackCoinIcon} alt='Wine' />
      </div>
      <div className='player-mount'>
        <img src={LosingIcon} alt='Wine' />
        <p>$ 5000</p>
      </div>
    </div>
  );
};

export default PlayerCard;
