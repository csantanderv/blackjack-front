import React from 'react';
import Avatar from 'react-avatar';
import '../../index.scss';
import './style.scss';

type AvatarPlayerProps = {
  name: string;
  size?: string;
  onClick(player: any): void;
};

const AvatarPlayer = (props: AvatarPlayerProps) => {
  const handleClick = () => {
    props.onClick({ player: { name: props.name } });
  };
  return (
    <div className='avatar-player'>
      <Avatar
        name={props.name}
        round={true}
        size={props.size ? props.size : '40'}
        onClick={handleClick}
      />
    </div>
  );
};

export default AvatarPlayer;
