import React, { useState } from 'react';
import AvatarPlayer from '../AvatarPlayer';
import CardDeck from '../CardDeck';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import './style.scss';

type CurrentPlayerType = {
  currentPlayer: any;
  onDeselectPlayer(): void;
};

const cartas = [
  { card: '2C', hidden: false },
  { card: '2C', hidden: false },
  { card: 'X', hidden: true },
];

export const CurrentPlayer = (props: CurrentPlayerType) => {
  const handleClick = () => {
    props.onDeselectPlayer();
  };

  return (
    <div className='current-player-info'>
      {props.currentPlayer ? (
        <div className='current-player'>
          <AvatarPlayer
            name={props.currentPlayer.name}
            size='40'
            onClick={handleClick}
          />
          <div className='bet'>
            <p>$ 5.000</p>
            <img src={BetMoneyIcon} />
          </div>
          <div className='deck'>
            <CardDeck cards={cartas} />
          </div>
        </div>
      ) : (
        <div className='msg-no-player'>
          <h3> Selecciona un jugador </h3>
        </div>
      )}
    </div>
  );
};
