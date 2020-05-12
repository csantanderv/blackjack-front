import React from 'react';
import PlayerMultiplayer from '../PlayerMultiplayer';
import '../../index.scss';
import './style.scss';

const BoardMultiplayer = () => {
  return (
    <div className='item-container'>
      <div className='item-container'>
        <div className='board-container'>
          {/* jugador 1 */}
          <PlayerMultiplayer></PlayerMultiplayer>
          {/* jugador 2 */}
          <PlayerMultiplayer></PlayerMultiplayer>
        </div>
      </div>
    </div>
  );
};

export default BoardMultiplayer;
