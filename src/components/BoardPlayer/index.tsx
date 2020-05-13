import React from 'react';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import PlayerBet from '../PlayerBet';
import GameButton from '../GameButton';
import '../../index.scss';

const cartas = [
  { card: '2C', hidden: false },
  { card: '2C', hidden: false },
  { card: 'X', hidden: true },
];

const BoardPlayer = () => {
  const handleStand = () => {};
  const handleBet = () => {};
  const handleHand = () => {};

  return (
    <div className='item-container'>
      <div className='game-options'>
        <CardDeck cards={cartas}></CardDeck>
        <PlayerBet></PlayerBet>
        <div className='game-buttons'>
          <GameButton src={StandHandIcon} onClick={handleStand} />
          <GameButton src={BetMoneyIcon} onClick={handleBet} />
          <GameButton src={HitHandIcon} onClick={handleHand} />
        </div>
      </div>
    </div>
  );
};

export default BoardPlayer;
