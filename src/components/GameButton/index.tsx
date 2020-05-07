import React from 'react';
import '../../index.scss';
import './style.scss';

type GameButtonProps = {
  src: string;
};

const GameButton = (props: GameButtonProps) => {
  return (
    <figure className='hand-bet'>
      <img src={props.src} alt='Boton Juego' />
    </figure>
  );
};

export default GameButton;
