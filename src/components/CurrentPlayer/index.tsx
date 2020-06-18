import React from 'react';
import CardDeck from '../CardDeck';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import './style.scss';
import { PlayerType } from '../../state/StoreTypes';

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
          <p>{selectedPlayer.name}</p>
          <div className='bet'>
            <p>$ {selectedPlayer.betAmount}</p>
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
