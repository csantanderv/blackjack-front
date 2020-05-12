import React from 'react';
import Card2C from '../../assets/svg/cards/2C.svg';
import '../../index.scss';
import './style.scss';

type CarType = {
  card: string;
  hidden: boolean;
};

type CardDeckType = {
  cards: CarType[];
};

const CardDeck = (props: CardDeckType) => {
  return (
    <div className='card-deck-player'>
      {props.cards.map((card) => {
        return !card.hidden ? (
          <div className='card'>
            <p>{card.card}</p>
          </div>
        ) : (
          <div className='card card-hidden'>
            <p>X</p>
          </div>
        );
      })}
    </div>
  );
};

export default CardDeck;
