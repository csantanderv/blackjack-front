import React, { Fragment } from 'react';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import '../../index.scss';
import './style.scss';
import AvatarPlayer from '../AvatarPlayer';
import CardDeck from '../CardDeck';

const cartas = [
  { card: '2C', hidden: false },
  { card: '2C', hidden: false },
  { card: 'X', hidden: true },
];

const DealingBank = (props: any) => {
  return (
    <Fragment>
      <div className='dealing-bank'>
        <div className='deck'>
          <CardDeck cards={cartas} />
        </div>
      </div>
    </Fragment>
  );
};

export default DealingBank;
