import React from 'react';
import Card2C from '../../assets/svg/cards/2C.svg';
import StackCoinIcon from '../../assets/svg/stack-coin.svg';
import LosingIcon from '../../assets/svg/losing.svg';
import '../../index.scss';
import './style.scss';
import CardDeck from '../CardDeck';

const cartas = [
  { card: '2C', hidden: false },
  { card: '2C', hidden: false },
  { card: 'X', hidden: true },
];

const PlayerMultiplayer = () => {
  return (
    <div className='player-board'>
      <CardDeck cards={cartas} />
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

export default PlayerMultiplayer;
