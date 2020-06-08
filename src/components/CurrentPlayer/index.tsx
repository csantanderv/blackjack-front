import React from 'react';
import AvatarPlayer from '../AvatarPlayer';
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
  const handleClick = () => {
    props.onDeselectPlayer();
  };

  return (
    <div className='current-player-info'>
      {selectedPlayer !== null ? (
        <div className='current-player'>
          <AvatarPlayer
            player={selectedPlayer}
            size='40'
            onClick={handleClick}
          />
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
          <h3> Selecciona un jugador </h3>
        </div>
      )}
    </div>
  );
};
