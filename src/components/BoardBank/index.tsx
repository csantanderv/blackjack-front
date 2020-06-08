import React, { useState, useContext, Fragment, useEffect } from 'react';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import GivecCardIcon from '../../assets/svg/give-card.svg';
import PlayIcon from '../../assets/svg/play.svg';
import ShuffleCardsIcon from '../../assets/svg/shuffle-cards.svg';
import PlayersPlaying from '../PlayersPlaying';
import GameButton from '../GameButton';
import { CurrentPlayer } from '../CurrentPlayer';
import { AppContext } from '../../state/Store';
import CardDeck from '../CardDeck';
import { ActionTypes, PlayerType } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';
import { IconCurrentResult } from '../IconCurrentResult';
import '../../index.scss';
import './style.scss';

const BoardBank = () => {
  const { state, dispatch } = useContext(AppContext);
  const [selectedPlayer, setSeletedPlayer] = useState<PlayerType | null>(null);
  const { bank, players, socket } = state;

  useEffect(() => {
    if (socket !== null) {
      socket.on(EventTypes.SetPlayers, (data: any) => {
        dispatch({
          type: ActionTypes.SetPlayers,
          payload: {
            players: data,
          },
        });
        handleDeselectPlayer();
      });
      socket.on(EventTypes.SetBank, (data: any) => {
        dispatch({
          type: ActionTypes.SetBank,
          payload: {
            bank: data,
          },
        });
      });
    }
  }, [socket, dispatch]);

  const handleSelectedPlayer = (player: any) => {
    setSeletedPlayer(player);
  };

  const handleDeselectPlayer = () => {
    setSeletedPlayer(null);
  };

  const handlePlay = () => {
    if (socket) {
      socket.emit(EventTypes.NewGame);
    }
  };

  const handleHit = () => {
    if (bank && socket) {
      socket.emit(EventTypes.BankHit);
    }
  };

  const handleGiveCard = () => {
    if (selectedPlayer && socket) {
      socket.emit(EventTypes.GiveCard, selectedPlayer);
    }
  };

  const handleShuffleCards = () => {};

  return (
    <Fragment>
      <div className='item-container'>
        <div className='game-options'>
          {bank ? (
            <Fragment>
              <div className='deck'>
                <CardDeck cards={bank.cards} />
              </div>
              <div className='current-result'>
                <IconCurrentResult player={bank} className='icon' />
              </div>
            </Fragment>
          ) : null}
          <CurrentPlayer
            selectedPlayer={selectedPlayer}
            onDeselectPlayer={handleDeselectPlayer}
          />
          <PlayersPlaying
            players={players.filter((p) => p.betAmount > 0)}
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
    </Fragment>
  );
};

export default BoardBank;
