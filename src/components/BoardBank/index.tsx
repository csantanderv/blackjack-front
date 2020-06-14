import React, { useContext, Fragment, useEffect } from 'react';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import GivecCardIcon from '../../assets/svg/give-card.svg';
import PlayIcon from '../../assets/svg/play.svg';
import ShuffleCardsIcon from '../../assets/svg/shuffle-cards.svg';
import GameButton from '../GameButton';
import { CurrentPlayer } from '../CurrentPlayer';
import { AppContext } from '../../state/Store';
import CardDeck from '../CardDeck';
import { ActionTypes } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';
import { IconCurrentResult } from '../IconCurrentResult';
import useShowMsg from '../../services/hooks/useShowMsg';
import UserMsgs from '../UserMsgs';
import '../../index.scss';
import './style.scss';

const BoardBank = () => {
  const { state, dispatch } = useContext(AppContext);
  const [showMsg, msg, setUserMsg] = useShowMsg();
  const { bank, players, socket, started, selectedPlayer } = state;

  const handleDeselectPlayer = () => {
    dispatch({
      type: ActionTypes.SetSelectedPlayer,
      payload: {
        selectedPlayer: null,
      },
    });
  };

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
      socket.on(EventTypes.GameStarted, (data: any) => {
        dispatch({
          type: ActionTypes.SetStarted,
          payload: {
            started: true,
          },
        });
      });
      socket.on(EventTypes.GameFinished, (data: any) => {
        dispatch({
          type: ActionTypes.SetStarted,
          payload: {
            started: false,
          },
        });
      });
    }
  }, [socket, dispatch]);

  const validatePlay = () => {
    if (players) {
      const isBetIncomplete =
        players.findIndex((item) => item.betAmount === 0) !== -1;
      const isSomeonePlaying =
        players.findIndex((item) => item.hiting || item.standing) !== -1;

      if (isBetIncomplete) {
        return 'Hay jugadores que no han apostado';
      }
      if (isSomeonePlaying) {
        return 'Aún hay jugadores jugando';
      }

      if (started) {
        return 'Hay un juego en curso';
      }

      return '';
    }
  };

  const validateHit = () => {
    if (bank) {
      const isNotCards = bank.cards && bank.cards.length === 0;
      const isSomeonePlaying =
        players.findIndex(
          (item) =>
            item.hiting || (item.currentResult === 'PLAYING' && !item.standing),
        ) !== -1;
      const isBetIncomplete =
        players.findIndex((item) => item.betAmount === 0) !== -1;

      if (isBetIncomplete) {
        return 'Hay jugadores sin apuesta';
      }

      if (isNotCards) {
        return 'Aun no recibes cartas, debe iniciar una partida primero';
      }

      if (isSomeonePlaying) {
        return 'Hay jugadores aún jugando';
      }

      if (!started) {
        return 'Aún no comienza la partida';
      }

      return '';
    }
  };
  // TODO: validar que los jugadores standing tengan cartas <= al límite de jugador (16?)
  const validateGiveCard = () => {
    if (bank && selectedPlayer) {
      if (!selectedPlayer.hiting) {
        return 'El jugador no está pidiendo una carta';
      }
      if (selectedPlayer.standing) {
        return 'El jugador se quiere quedar';
      }
      if (selectedPlayer.currentResult === 'LOSER') {
        return 'Este weón ya perdió';
      }
      if (selectedPlayer.currentResult === 'WINNER') {
        return 'Este jugador ya te ganó';
      }

      if (!started) {
        return 'Aún no comienza la partida';
      }

      return '';
    }
  };

  const validateShuffle = () => {
    // TODO: Falta validar cuando la banca gana y los jugadores quedan en estado PLAYING, en ese caso la weá caga porque no se puede entregar la carta pa terminar con el juego
    const isSomeonePlaying =
      players.findIndex((item) => item.currentResult === 'PLAYING') !== -1;

    if (isSomeonePlaying) {
      return 'El juego está en curso aún';
    }

    return '';
  };

  const handlePlay = () => {
    if (socket && players && players.length > 0) {
      const validMsg = validatePlay();
      setUserMsg(validMsg);
      if (validMsg === '') {
        socket.emit(EventTypes.NewGame);
      }
    } else {
      setUserMsg('Falta que se conecten los jugadores');
    }
  };

  const handleHit = () => {
    if (bank && socket) {
      const validMsg = validateHit();
      setUserMsg(validMsg);
      if (validMsg === '') {
        socket.emit(EventTypes.BankHit);
      }
    }
  };

  const handleGiveCard = () => {
    if (selectedPlayer && socket) {
      const validMsg = validateGiveCard();
      setUserMsg(validMsg);
      if (validMsg === '') {
        socket.emit(EventTypes.GiveCard, selectedPlayer);
      }
    } else {
      setUserMsg('Selecciona un jugador primero');
    }
  };

  const handleShuffleCards = () => {
    if (socket) {
      const validMsg = validateShuffle();
      setUserMsg(validMsg);
      if (validMsg === '') {
        socket.emit(EventTypes.ResetGame);
      }
    }
  };

  return (
    <Fragment>
      <div className='row-content'>
        <div className='board-for-playing'>
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
          <UserMsgs msg={msg} show={showMsg} />
          <div className='game-buttons'>
            {started ? (
              <Fragment>
                <GameButton src={HitHandIcon} onClick={handleHit} />
                <GameButton src={GivecCardIcon} onClick={handleGiveCard} />
                <GameButton
                  src={ShuffleCardsIcon}
                  onClick={handleShuffleCards}
                />
              </Fragment>
            ) : (
              <Fragment>
                <GameButton src={PlayIcon} onClick={handlePlay} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BoardBank;
