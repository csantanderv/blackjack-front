import React from 'react';
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
  const cards = props.cards.map((card, index) => {
    return !card.hidden ? (
      <div key={index} className='card'>
        <p>{card.card}</p>
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
