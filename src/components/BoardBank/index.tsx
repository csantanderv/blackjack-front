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
import { dispatchToast, ToastMsg } from '../../utils/ToastUtils';
import { EventTypes } from '../../services/socket/EventTypes';
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
  }, [socket]);

  const handleSelectedPlayer = (player: any) => {
    setSeletedPlayer(player);
  };

  const handleDeselectPlayer = () => {
    setSeletedPlayer(null);
  };

  const handlePlay = () => {
    // TODO: newGame() -> Socket
    // TODO: Se deben agregar solamente los players de profile PLAYER
    if (socket) {
      socket.emit(EventTypes.NewGame);
    }
  };

  const handleHit = () => {
    /*     if (bank) {
      bank.cards.push({ card: 'X1', hidden: false });
      dispatch({
        type: ActionTypes.BankHitCard,
        payload: {
          bank: bank,
        },
      });
    } else {
      dispatchToast('No hay banco definido');
    }
 */
  };

  const handleGiveCard = () => {
    if (selectedPlayer) {
      // TODO: Debe obtener el nuevo listado de jugadores con la carta ya agregada en back
      /*       players.map((player) => {
        if (player.id == selectedPlayer.id) {
          player.cards.push({ card: 'X1', hidden: false });
        }
      });
      dispatch({
        type: ActionTypes.GiveCard,
        payload: {
          players: players,
        },
      });
 */
    } else {
      dispatchToast('Debe selecccionar un jugador');
    }
  };

  const handleShuffleCards = () => {};

  return (
    <Fragment>
      <div className='item-container'>
        <div className='game-options'>
          <div className='deck'>
            {bank !== null ? <CardDeck cards={bank.cards} /> : null}
          </div>
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
      {/* <ToastMsg /> */}
    </Fragment>
  );
};

export default BoardBank;
