import React, { useState } from 'react';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import GivecCardIcon from '../../assets/svg/give-card.svg';
import PlayIcon from '../../assets/svg/play.svg';
import ShuffleCardsIcon from '../../assets/svg/shuffle-cards.svg';
import PlayersPlaying from '../PlayersPlaying';
import GameButton from '../GameButton';
import DealingBank from '../DealingBank';
import '../../index.scss';
import './style.scss';
import { CurrentPlayer } from '../CurrentPlayer';

const BoardBank = () => {
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const handleSelectedPlayer = (player: any) => {
    setCurrentPlayer(player);
  };

  const handleDeselectPlayer = () => {
    setCurrentPlayer(null);
  };

  return (
    <div className='item-container'>
      <div className='game-options'>
        <DealingBank></DealingBank>
        <CurrentPlayer
          currentPlayer={currentPlayer}
          onDeselectPlayer={handleDeselectPlayer}
        />
        <PlayersPlaying
          players={[{ name: 'A' }, { name: 'C' }, { name: 'D' }, { name: 'E' }]}
          onSelectedPlayer={handleSelectedPlayer}
        />
        <div className='game-buttons'>
          <GameButton src={PlayIcon} />
          <GameButton src={HitHandIcon} />
          <GameButton src={GivecCardIcon} />
          <GameButton src={ShuffleCardsIcon} />
        </div>
      </div>
    </div>
  );
};

export default BoardBank;
