import React, { useContext, useEffect, Fragment } from 'react';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import PlayerBet from '../PlayerBet';
import GameButton from '../GameButton';
import { AppContext } from '../../state/Store';
import { ActionTypes, PlayerType } from '../../state/StoreTypes';
import { IconCurrentResult } from '../IconCurrentResult';
import BankCardsPlaying from '../BankCardsPlaying';
import UserMsgs from '../UserMsgs';
import useShowMsg from '../../services/hooks/useShowMsg';
import usePlayerMoves from '../../services/hooks/usePlayerMoves';
import '../../style.scss';
import './style.scss';

const BoardPlayer = () => {
  const { state, dispatch } = useContext(AppContext);
  const [showMsg, msg, setUserMsg] = useShowMsg();
  const [stand, bet, hit] = usePlayerMoves();
  const { connectedUser, players, currentPlayer, bank, started } = state;

  useEffect(() => {
    if (players && connectedUser) {
      players.map((player: PlayerType) => {
        if (player.id === connectedUser.id) {
          dispatch({
            type: ActionTypes.SetCurrentPlayer,
            payload: {
              currentPlayer: player,
            },
          });
        }
        return true;
      });
    }
  }, [players, dispatch, connectedUser]);

  const validatePlay = () => {
    if (currentPlayer) {
      if (currentPlayer.betAmount === 0) {
        return 'Primero apuesta, luego juegas';
      }
      if (currentPlayer.cards.length === 0) {
        return 'La banca te tiene que dar cartas primero';
      }
    }
    return '';
  };

  const handleStand = () => {
    if (currentPlayer) {
      const validMsg = validatePlay();
      if (validMsg === '') {
        setUserMsg('');
        stand(currentPlayer);
      } else {
        setUserMsg(validMsg);
      }
    }
  };

  const validateBet = () => {
    if (currentPlayer) {
      if (currentPlayer.betAmount === 0) {
        return 'Apuesta moneas primero';
      }
    }
    return '';
  };

  const handleBet = () => {
    if (currentPlayer) {
      const validMsg = validateBet();
      if (validMsg === '') {
        setUserMsg('');
        bet(currentPlayer);
      } else {
        setUserMsg(validMsg);
      }
    }
  };

  const handleHit = () => {
    if (currentPlayer) {
      const validMsg = validatePlay();
      if (validMsg === '') {
        hit(currentPlayer);
        setUserMsg('');
      } else {
        setUserMsg(validMsg);
      }
    }
  };

  const isGameOver =
    currentPlayer &&
    (currentPlayer.currentResult === 'WINNER' ||
      currentPlayer.currentResult === 'LOSER');

  return (
    <div className='row-content'>
      <div className='board-for-playing'>
        {bank && bank.cards && bank.cards.length > 0 ? (
          <BankCardsPlaying bank={bank} />
        ) : null}
        {currentPlayer && isGameOver ? (
          <IconCurrentResult player={currentPlayer} size='medium' />
        ) : null}
        <UserMsgs msg={msg} show={showMsg} />

        {currentPlayer && currentPlayer.currentResult === 'PLAYING' ? (
          <Fragment>
            {started ? (
              <div className='buttons-playing'>
                <Fragment>
                  <GameButton
                    type='primary'
                    size='medium'
                    src={StandHandIcon}
                    onClick={handleStand}
                  />
                  <div className='current-game'>
                    <CardDeck
                      cards={currentPlayer.cards}
                      totalCards={currentPlayer.totalCards}
                    />
                    <IconCurrentResult player={currentPlayer} size='medium' />
                  </div>
                  <GameButton
                    type='primary'
                    size='medium'
                    src={HitHandIcon}
                    onClick={handleHit}
                  />
                </Fragment>
              </div>
            ) : (
              <div className='buttons-beting'>
                <Fragment>
                  <PlayerBet />
                  <GameButton
                    type='primary'
                    size='medium'
                    src={BetMoneyIcon}
                    onClick={handleBet}
                  />
                </Fragment>
              </div>
            )}
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default BoardPlayer;
