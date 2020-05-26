import React from 'react';
import '../../index.scss';
import './style.scss';

type GameButtonProps = {
  src: string;
  onClick(): void;
};

const GameButton = (props: GameButtonProps) => {
  return (
    <figure className='game-button' onClick={props.onClick}>
      <img src={props.src} alt='Boton Juego' />
    </figure>
  );
};

export default GameButton;
