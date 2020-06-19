import React from 'react';
import Avatar from 'react-avatar';
import { PlayerType } from '../../state/StoreTypes';
import { IconCurrentResult } from '../IconCurrentResult';
import '../../index.scss';
import './style.scss';

type AvatarPlayerProps = {
  player: PlayerType | null;
  size: string;
  onClick(player: any): void;
};

const AvatarPlayer = (props: AvatarPlayerProps) => {
  const { player, size } = props;
  const handleClick = () => {
    if (player) {
      props.onClick({ player: { name: player.name } });
    }
  };

  return player ? (
    <div className='avatar-player'>
      <IconCurrentResult player={player} size='small' />
      <Avatar
        name={player.name}
        round={true}
        size={size ? size : '40'}
        onClick={handleClick}
      />
    </div>
  ) : null;
};

export default AvatarPlayer;
