import React, { useContext, useEffect } from 'react';
import PlayerMultiplayer from '../PlayerMultiplayer';
import { AppContext } from '../../state/Store';
import { EventTypes } from '../../services/socket/EventTypes';
import { ActionTypes, PlayerType } from '../../state/StoreTypes';
import '../../index.scss';
import './style.scss';

const BoardMultiplayer = () => {
  const { state, dispatch } = useContext(AppContext);
  const { socket, players } = state;

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
    }
  }, [socket, dispatch]);

  const handlePlayer = (player: PlayerType) => {
    if (player) {
      dispatch({
        type: ActionTypes.SetSelectedPlayer,
        payload: {
          selectedPlayer: player,
        },
      });
    }
  };

  return players === null || players.length === 0 ? (
    <p>Esperando jugadores</p>
  ) : (
    <div className='row-content multiplayer-row'>
      <div className='board-multiplayer'>
        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}

        {players.map((player, index) => {
          return (
            <PlayerMultiplayer
              key={index}
              player={player}
              onClick={handlePlayer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoardMultiplayer;
