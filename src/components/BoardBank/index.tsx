import React, { useState, useContext } from 'react';
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
import { AppContext } from '../../state/Store';
import { ActionTypes } from '../../state/StoreTypes';

const BoardBank = () => {
  const { state, dispatch } = useContext(AppContext);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const handleSelectedPlayer = (player: any) => {
    setCurrentPlayer(player);
  };

  const handleDeselectPlayer = () => {
    setCurrentPlayer(null);
  };

  const handlePlay = () => {
    // TODO: newGame() -> Socket
    dispatch({
      type: ActionTypes.NewGame,
      payload: {
        newGame: true,
        players: [
          {
            id: '1',
            name: 'jugador1',
            profile: 'PLAYER',
            playing: false,
            totalAmountLost: 0,
            betAmount: 0,
            currentResult: 'PLAYING',
            cards: [
              { card: '2C', hidden: false },
              { card: '3C', hidden: false },
              { card: '4C', hidden: false },
            ],
          },

          {
            id: '2',
            name: 'jugador2',
            profile: 'PLAYER',
            playing: false,
            totalAmountLost: 0,
            betAmount: 0,
            currentResult: 'PLAYING',
            cards: [
              { card: '2C', hidden: false },
              { card: '5J', hidden: false },
              { card: '10M', hidden: false },
            ],
          },
        ],
      },
    });
  };

  const handleHit = () => {};

  const handleGiveCard = () => {};

  const handleShuffleCards = () => {};

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
          <GameButton src={PlayIcon} onClick={handlePlay} />
          <GameButton src={HitHandIcon} onClick={handleHit} />
          <GameButton src={GivecCardIcon} onClick={handleGiveCard} />
          <GameButton src={ShuffleCardsIcon} onClick={handleShuffleCards} />
        </div>
      </div>
    </div>
  );
};

export default BoardBank;
