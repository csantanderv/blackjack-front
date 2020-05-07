import React from 'react';
import AvatarPlayer from '../AvatarPlayer';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import GivecCardIcon from '../../assets/svg/give-card.svg';
import PlayIcon from '../../assets/svg/play.svg';
import ShuffleIcon from '../../assets/svg/shuffle.svg';
import GameButton from '../GameButton';
import DealingBank from '../DealingBank';
import '../../index.scss';
import './style.scss';

const BoardBank = () => {
  return (
    <div className='item-container'>
      <div className='game-options'>
        <DealingBank></DealingBank>
        <div className='players-avatars'>
          <AvatarPlayer name='Mauro' />
          <AvatarPlayer name='Pepe' />
          <AvatarPlayer name='Shaggy' />
          <AvatarPlayer name='Carlos' />
          <AvatarPlayer name='Tomate' />
          <AvatarPlayer name='Negro' />
        </div>
        <div className='game-buttons'>
          <GameButton src={PlayIcon} />
          <GameButton src={HitHandIcon} />
          <GameButton src={GivecCardIcon} />
          <GameButton src={ShuffleIcon} />
        </div>
      </div>
    </div>
  );
};

export default BoardBank;
