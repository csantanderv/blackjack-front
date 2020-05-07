import React from 'react';
import Card2C from '../../assets/svg/cards/2C.svg';
import '../../index.scss';
import './style.scss';

const CardDeck = () => {
  return (
    <div className='card-deck-player'>
      <img className='card-player-first' src={Card2C} alt='Carta' />
    </div>
  );
};

export default CardDeck;
