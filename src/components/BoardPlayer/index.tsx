import React, { useContext, useEffect, Fragment } from 'react';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import PlayerBet from '../PlayerBet';
import GameButton from '../GameButton';
import { AppContext } from '../../state/Store';
import { ActionTypes, PlayerType } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';
import { IconCurrentResult } from '../IconCurrentResult';
import BankCardsPlaying from '../BankCardsPlaying';
import UserMsgs from '../UserMsgs';
import useShowMsg from '../../services/hooks/useShowMsg';
import '../../index.scss';
import './style.scss';

const BoardPlayer = () => {
  const { state, dispatch } = useContext(AppContext);
  const [showMsg, msg, setUserMsg] = useShowMsg();
  const {
    connectedUser,
    players,
    currentPlayer,
    bank,
    socket,
    started,
  } = state;

  useEffect(() => {
    if (socket) {
      socket.on(EventTypes.SetPlayers, (data: any) => {
        if (data) {
          dispatch({
            type: ActionTypes.SetPlayers,
            payload: {
              players: data,
            },
          });
        }
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
    if (currentPlayer && socket) {
      const validMsg = validatePlay();
      if (validMsg === '') {
        setUserMsg('');
        socket.emit(EventTypes.PlayerStand, currentPlayer);
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
    if (currentPlayer && socket) {
      const validMsg = validateBet();
      if (validMsg === '') {
        setUserMsg('');
        socket.emit(EventTypes.PlayerBet, currentPlayer);
      } else {
        setUserMsg(validMsg);
      }
    }
  };

  const handleHit = () => {
    if (currentPlayer && socket) {
      const validMsg = validatePlay();
      if (validMsg === '') {
        socket.emit(EventTypes.PlayerHit, currentPlayer);
        setUserMsg('');
      } else {
        setUserMsg(validMsg);
      }
    }
  };

  return (
    <div className='item-container'>
      <div className='game-options'>
        {bank ? <BankCardsPlaying bank={bank} /> : null}
        {currentPlayer ? (
          <Fragment>
            <div className='deck'>
              <CardDeck cards={currentPlayer.cards} />
            </div>
            <div className='current-result'>
              <IconCurrentResult player={currentPlayer} className='icon' />
            </div>
          </Fragment>
        ) : null}
        {currentPlayer && currentPlayer.currentResult === 'PLAYING' ? (
          <Fragment>
            {!started ? <PlayerBet /> : null}
            <UserMsgs msg={msg} show={showMsg} />
            <div className='game-buttons'>
              <GameButton src={StandHandIcon} onClick={handleStand} />
              {!started ? (
                <GameButton src={BetMoneyIcon} onClick={handleBet} />
              ) : null}
              <GameButton src={HitHandIcon} onClick={handleHit} />
            </div>
          </Fragment>
        ) : null}
      </div>
      {/* <ToastMsg /> */}
    </div>
  );
};

export default BoardPlayer;
