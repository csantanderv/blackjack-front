import React, { Fragment } from 'react';
import { CardValue } from '../../config/Config';
import ArrowIncon from '../../assets/svg/arrow.svg';
import '../../index.scss';
import './style.scss';

type CarType = {
  card: string;
  hidden: boolean;
};

type CardDeckType = {
  totalCards: number;
  cards: CarType[];
};

const CardDeck = (props: CardDeckType) => {
  const { cards, totalCards } = props;
  const lastCard = cards && cards.length > 0 ? cards[cards.length - 1] : null;

  const emptyCards = (
    <div className='empty-cards'>
      <p>Sin cartas</p>
    </div>
  );

  const CurrentCard = (card: CarType | null) => {
    let cardValue: { card: string; value: string } | undefined;
    if (card && cards && cards.length > 0) {
      cardValue = CardValue.find((item) => item.card === card.card);
    }

    return card && !card.hidden ? (
      <div className='card'>
        <p>{cardValue ? cardValue.value : ''}</p>
      </div>
    ) : (
      <div className='card card-hidden'>
        <p>X</p>
      </div>
    );
  };

  return (
    <div className='card-deck-player'>
      {props.cards && props.cards.length > 0 ? (
        <Fragment>
          <div className='card card-total'>
            <p>{totalCards}</p>
          </div>
          <img src={ArrowIncon} alt='flecha' className='arrow' />
          {lastCard ? <CurrentCard {...lastCard} /> : null}
        </Fragment>
      ) : (
        emptyCards
      )}
    </div>
  );
};

export default CardDeck;
