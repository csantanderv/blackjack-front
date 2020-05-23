import React from 'react';
import Avatar from 'react-avatar';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import '../../index.scss';
import './style.scss';

type AvatarPlayerProps = {
  name: string;
  hiting: boolean;
  standing: boolean;
  size?: string;
  onClick(player: any): void;
};

const AvatarPlayer = (props: AvatarPlayerProps) => {
  const handleClick = () => {
    props.onClick({ player: { name: props.name } });
  };
  return (
    <div className='avatar-player'>
      {props.hiting ? (
        <img src={HitHandIcon} alt='hithand' className='hit-img' />
      ) : props.standing ? (
        <img src={StandHandIcon} alt='hithand' className='hit-img' />
      ) : (
        <div className='hit-img'></div>
      )}
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
