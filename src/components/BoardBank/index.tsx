import React, { useContext, Fragment } from 'react';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import GivecCardIcon from '../../assets/svg/give-card.svg';
import PlayIcon from '../../assets/svg/play.svg';
import ShuffleCardsIcon from '../../assets/svg/shuffle-cards.svg';
import GameButton from '../GameButton';
import { CurrentPlayer } from '../CurrentPlayer';
import { AppContext } from '../../state/Store';
import CardDeck from '../CardDeck';
import { ActionTypes } from '../../state/StoreTypes';
import { IconCurrentResult } from '../IconCurrentResult';
import useShowMsg from '../../services/hooks/useShowMsg';
import UserMsgs from '../UserMsgs';
import useBankMoves from '../../services/hooks/useBankMoves';
import '../../style.scss';
import './style.scss';

const BoardBank = () => {
  const { state, dispatch } = useContext(AppContext);
  const [showMsg, msg, setUserMsg] = useShowMsg();
  const { bank, players, started, selectedPlayer } = state;
  const [playCard, hitCard, giveCard, shuffleCards] = useBankMoves();

  const handleDeselectPlayer = () => {
    dispatch({
      type: ActionTypes.SetSelectedPlayer,
      payload: {
        selectedPlayer: null,
      },
    });
  };

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
    const isSomeonePlaying =
      players.findIndex((item) => item.currentResult === 'PLAYING') !== -1;

    if (isSomeonePlaying) {
      return 'El juego está en curso aún';
    }

    return '';
  };

  const handlePlay = () => {
    if (players && players.length > 0) {
      const validMsg = validatePlay();
      setUserMsg(validMsg);
      if (validMsg === '') {
        playCard();
      }
    } else {
      setUserMsg('Falta que se conecten los jugadores');
    }
  };

  const handleHit = () => {
    if (bank) {
      const validMsg = validateHit();
      setUserMsg(validMsg);
      if (validMsg === '') {
        hitCard();
      }
    }
  };

  const handleGiveCard = () => {
    if (selectedPlayer) {
      const validMsg = validateGiveCard();
      setUserMsg(validMsg);
      if (validMsg === '') {
        giveCard(selectedPlayer);
      }
    } else {
      setUserMsg('Selecciona un jugador primero');
    }
  };

  const handleShuffleCards = () => {
    const validMsg = validateShuffle();
    setUserMsg(validMsg);
    if (validMsg === '') {
      shuffleCards();
    }
  };

  const isGameOver =
    bank && (bank.currentResult === 'LOSER' || bank.currentResult === 'WINNER');

  return (
    <Fragment>
      <div className='row-content'>
        <div className='board-for-playing'>
          {bank ? (
            <div className='bank-play-info'>
              <CurrentPlayer
                selectedPlayer={selectedPlayer}
                onDeselectPlayer={handleDeselectPlayer}
              />
              <div className='deck'>
                <CardDeck cards={bank.cards} totalCards={bank.totalCards} />
              </div>
              {isGameOver ? (
                <div className='current-result'>
                  <IconCurrentResult player={bank} size='big' />
                </div>
              ) : null}
            </div>
          ) : null}
          <UserMsgs msg={msg} show={showMsg} />
          <div className='game-buttons'>
            {started ? (
              <Fragment>
                <GameButton
                  type='primary'
                  size='medium'
                  src={HitHandIcon}
                  onClick={handleHit}
                />
                <GameButton
                  type='primary'
                  size='medium'
                  src={GivecCardIcon}
                  onClick={handleGiveCard}
                />
                <GameButton
                  type='primary'
                  size='medium'
                  src={ShuffleCardsIcon}
                  onClick={handleShuffleCards}
                />
              </Fragment>
            ) : (
              <Fragment>
                <GameButton
                  type='primary'
                  size='medium'
                  src={PlayIcon}
                  onClick={handlePlay}
                />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BoardBank;
