import React from 'react';
import CardDeck from '../CardDeck';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import { PlayerType } from '../../state/StoreTypes';
import './style.scss';

type CurrentPlayerProps = {
  selectedPlayer: PlayerType | null;
  onDeselectPlayer(): void;
};

export const CurrentPlayer = (props: CurrentPlayerProps) => {
  const { selectedPlayer } = props;

  return (
    <div className='current-player-info'>
      {selectedPlayer && selectedPlayer.hiting ? (
        <div className='current-player'>
          <h2 className='player-name'>{selectedPlayer.name}</h2>
          <div className='bet'>
            <h2 className='player-name'>$ {selectedPlayer.betAmount}</h2>
            <img src={BetMoneyIcon} alt='Bet Money' />
          </div>
          <div className='deck'>
            <CardDeck cards={selectedPlayer.cards} />
          </div>
        </div>
      ) : (
        <div className='msg-no-player'>
          <p> Selecciona jugador que esté pidiendo </p>
        </div>
      )}
    </div>
  );
};
