import React, { Fragment } from 'react';
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
    <Fragment>
      {selectedPlayer && selectedPlayer.hiting ? (
        <div className='current-player-info'>
          <div className='current-player'>
            <div className='player-bet'>
              <p className='player-name'>{selectedPlayer.name}</p>
              <div className='bet'>
                <img src={BetMoneyIcon} alt='Bet Money' />
                <p>$ {selectedPlayer.betAmount}</p>
              </div>
            </div>

            <div className='deck'>
              <CardDeck
                cards={selectedPlayer.cards}
                totalCards={selectedPlayer.totalCards}
              />
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
