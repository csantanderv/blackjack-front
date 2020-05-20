import React, { FC } from 'react';
import StackCoinIcon from '../../assets/svg/stack-coin.svg';
import EmojiAngyIcon from '../../assets/svg/emoji-angry.svg';
import LosingIcon from '../../assets/svg/losing.svg';
import '../../index.scss';
import './style.scss';
import CardDeck from '../CardDeck';
import { PlayerType } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';

type PlayerMultiplayerProps = {
  player: PlayerType;
};

const ImgResult: FC<PlayerMultiplayerProps> = (props) => {
  switch (props.player.currentResult) {
    case 'WINNER':
      return <img src={StackCoinIcon} alt='Wine' />;
    case 'LOSER':
      return <img src={EmojiAngyIcon} alt='Wine' />;
    case 'PLAYING':
      return (
        <p>
          <strong>J</strong>
        </p>
      );
    default:
      return null;
  }
};

const PlayerMultiplayer = (props: PlayerMultiplayerProps) => {
  const { player } = props;

  // TODO: Falta agregar icono para jugando

  return (
    <div className='player-board'>
      <CardDeck cards={player.cards} />
      <div className='player-detail'>
        <p>{player.name}</p>
        <ImgResult player={player} />
      </div>
      <div className='player-mount'>
        <img src={LosingIcon} alt='Wine' />
        <p>$ {player.totalAmountLost}</p>
      </div>
    </div>
  );
};

export default PlayerMultiplayer;
