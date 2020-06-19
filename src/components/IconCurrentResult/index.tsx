import React from 'react';
import { PlayerType } from '../../state/StoreTypes';
import classnames from 'classnames';
import HitHandIcon from '../../assets/svg/hit-hand.svg';
import StandHandIcon from '../../assets/svg/stand-hand.svg';
import StackCoinIcon from '../../assets/svg/stack-coin.svg';
import EmojiAngyIcon from '../../assets/svg/emoji-angry.svg';
import './style.scss';

type PlayerActionProps = {
  player: PlayerType;
  size: 'small' | 'medium' | 'big';
};

type IconConfig = {
  [key: string]: string;
};

const iconSize: IconConfig = {
  small: 'icon-small',
  medium: 'icon-medium',
  big: 'icon-big',
};

export const IconCurrentResult = (props: PlayerActionProps) => {
  const { player, size } = props;

  switch (player.currentResult) {
    case 'WINNER':
      return (
        <img
          src={StackCoinIcon}
          alt='Wine'
          className={classnames(iconSize[size])}
        />
      );
    case 'LOSER':
      return (
        <img
          src={EmojiAngyIcon}
          alt='Wine'
          className={classnames(iconSize[size])}
        />
      );
    case 'PLAYING':
      return player.hiting ? (
        <img
          src={HitHandIcon}
          alt='Hit Hand'
          className={classnames(iconSize[size])}
        />
      ) : player.standing ? (
        <img
          src={StandHandIcon}
          alt='Stand Hand'
          className={classnames(iconSize[size])}
        />
      ) : (
        <div className={classnames(iconSize[size])} />
      );
    default:
      return <div className={classnames(iconSize[size])} />;
  }
};
