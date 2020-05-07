import React from 'react';
import PlayerCard from '../PlayerCard';
import '../../index.scss';
import './style.scss';

const BoardMultiplayer = () => {
  return (
    <div className='item-container'>
      <div className='item-container'>
        <div className='board-container'>
          {/* jugador 1 */}
          <PlayerCard></PlayerCard>
          {/* jugador 2 */}
          <PlayerCard></PlayerCard>
        </div>
      </div>
    </div>
  );
};

export default BoardMultiplayer;
