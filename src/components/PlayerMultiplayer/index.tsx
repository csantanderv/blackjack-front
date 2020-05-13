import React from 'react';
import StackCoinIcon from '../../assets/svg/stack-coin.svg';
import EmojiAngyIcon from '../../assets/svg/emoji-angry.svg';
import LosingIcon from '../../assets/svg/losing.svg';
import '../../index.scss';
import './style.scss';
import CardDeck from '../CardDeck';
import { PlayerType } from '../../state/StoreTypes';

type PlayerMultiplayerProps = {
  player: PlayerType;
};

const PlayerMultiplayer = (props: PlayerMultiplayerProps) => {
  const { player } = props;

  // TODO: Falta agregar icono para jugando
  const imgResult = (currentResult: string | undefined) => {
    switch (currentResult) {
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
        break;
    }
  };

  return (
    <div className='player-board'>
      <CardDeck cards={player.cards} />
      <div className='player-detail'>
        <p>{player.name}</p>
        {imgResult(player.currentResult)}
      </div>
      <div className='player-mount'>
        <img src={LosingIcon} alt='Wine' />
        <p>$ {player.totalAmountLost}</p>
      </div>
    </div>
  );
};

export default PlayerMultiplayer;
