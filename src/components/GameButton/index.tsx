import React from 'react';
import classnames from 'classnames';
import '../../index.scss';
import './style.scss';

type GameButtonProps = {
  type: 'primary' | 'secondary';
  size: 'small' | 'medium';
  src: string;
  onClick(): void;
};

type GameButtonConfig = {
  [key: string]: string;
};

const buttonSize: GameButtonConfig = {
  small: 'button-small',
  medium: 'button-medium',
};

const buttonType: GameButtonConfig = {
  primary: 'button-primary',
  secondary: 'button-secondary',
};

const GameButton = (props: GameButtonProps) => {
  const handleClick = (event: React.FormEvent<HTMLSpanElement>) => {
    event.preventDefault();
    props.onClick();
  };

  return (
    <span
      className={classnames(
        'game-button',
        buttonSize[props.size],
        buttonType[props.type],
      )}
      onClick={handleClick}
    >
      <img src={props.src} alt='Boton Juego' />
    </span>
  );
};

export default GameButton;
