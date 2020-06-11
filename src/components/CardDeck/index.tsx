import React from 'react';
import '../../index.scss';
import './style.scss';
import { CardValue } from '../../config/Config';

type CarType = {
  card: string;
  hidden: boolean;
};

type CardDeckType = {
  cards: CarType[];
};

const CardDeck = (props: CardDeckType) => {
  const cards = props.cards.map((card: CarType, index) => {
    const cardValue = CardValue.find((item) => item.card === card.card);

    return !card.hidden && cardValue ? (
      <div key={index} className='card'>
        <p>{cardValue.value}</p>
      </div>
    ) : (
      <div key={index} className='card card-hidden'>
        <p>X</p>
      </div>
    );
  });

  const emptyCards = (
    <div>
      <p>Sin cartas</p>
    </div>
  );

  return (
    <div className='card-deck-player'>
      {props.cards && props.cards.length > 0 ? cards : emptyCards}
    </div>
  );
};

export default CardDeck;
