import React, { Fragment } from 'react';
import AvatarPlayer from '../AvatarPlayer';
import '../../index.scss';
import './style.scss';

type PlayerType = {
  name: string;
};

type PlayerPlayingType = {
  players: PlayerType[];
  onSelectedPlayer(player: any): void;
};

const PlayersPlaying = (props: PlayerPlayingType) => {
  const handleClick = (player: any) => {
    props.onSelectedPlayer(player);
  };
  return (
    <Fragment>
      <div className='players-avatars'>
        {props.players.map((item) => (
          <AvatarPlayer name={item.name} onClick={(e) => handleClick(item)} />
        ))}
      </div>
    </Fragment>
  );
};

export default PlayersPlaying;
