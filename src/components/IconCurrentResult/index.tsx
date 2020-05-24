import React from 'react';
import { PlayerType } from '../../state/StoreTypes';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import StackCoinIcon from '../../assets/svg/stack-coin.svg';
import EmojiAngyIcon from '../../assets/svg/emoji-angry.svg';

type PlayerActionProps = {
  player: PlayerType;
  className: string;
};

export const IconCurrentResult = (props: PlayerActionProps) => {
  const { player, className } = props;
  switch (player.currentResult) {
    case 'WINNER':
      return <img src={StackCoinIcon} alt='Wine' className={className} />;
    case 'LOSER':
      return <img src={EmojiAngyIcon} alt='Wine' className={className} />;
    case 'PLAYING':
      return player.hiting ? (
        <img src={HitHandIcon} alt='Hit Hand' className={className} />
      ) : player.standing ? (
        <img src={StandHandIcon} alt='Stand Hand' className={className} />
      ) : (
        <div className={className}></div>
      );
    default:
      return <div className={className}></div>;
  }
};
