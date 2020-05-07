import React from 'react';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import PlayerBet from '../PlayerBet';
import GameButton from '../GameButton';
import '../../index.scss';

const BoardPlayer = () => {
  return (
    <div className='item-container'>
      <div className='game-options'>
        <CardDeck></CardDeck>
        <PlayerBet></PlayerBet>
        <div className='game-buttons'>
          <GameButton src={StandHandIcon} />
          <GameButton src={BetMoneyIcon} />
          <GameButton src={HitHandIcon} />
        </div>
      </div>
    </div>
  );
};

export default BoardPlayer;
