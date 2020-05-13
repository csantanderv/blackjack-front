import React, { useContext } from 'react';
import PlayerMultiplayer from '../PlayerMultiplayer';
import '../../index.scss';
import './style.scss';
import { AppContext } from '../../state/Store';

const BoardMultiplayer = () => {
  const { state, dispatch } = useContext(AppContext);
  const { players } = state;
  return (
    <div className='item-container'>
      <div className='item-container'>
        <div className='board-container'>
          {players.map((player) => {
            return <PlayerMultiplayer player={player} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardMultiplayer;
