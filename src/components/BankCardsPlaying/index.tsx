import React from 'react';
import { PlayerType } from '../../state/StoreTypes';
import BankIcon from '../../assets/svg/bank.svg';
import CardDeck from '../CardDeck';
import { IconCurrentResult } from '../IconCurrentResult';
import './style.scss';

type BankCardsPlaying = {
  bank: PlayerType;
};

const BankCardsPlaying = (props: BankCardsPlaying) => {
  const { bank } = props;

  const isGameOver = () => {
    return (
      bank &&
      (bank.currentResult === 'LOSER' || bank.currentResult === 'WINNER')
    );
  };

  return bank ? (
    <div className='bank-cards-playing'>
      <img src={BankIcon} alt='Carta' className='bank-icon' />
      <CardDeck cards={bank.cards} />
      {isGameOver() ? (
        <div className='bank-result'>
          <IconCurrentResult player={bank} size='medium' />
        </div>
      ) : null}
    </div>
  ) : null;
};

export default BankCardsPlaying;
