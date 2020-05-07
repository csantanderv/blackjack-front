import React from 'react';
import Avatar from 'react-avatar';
import '../../index.scss';
import './style.scss';

type AvatarPlayerProps = {
  name: string;
};

const AvatarPlayer = (props: AvatarPlayerProps) => {
  return (
    <div className='avatar-player'>
      <Avatar name={props.name} round={true} size='40' />
    </div>
  );
};

export default AvatarPlayer;
