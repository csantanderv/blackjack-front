import React, { FC } from 'react';
import StackCoinIcon from '../../assets/svg/stack-coin.svg';
import EmojiAngyIcon from '../../assets/svg/emoji-angry.svg';
import LosingIcon from '../../assets/svg/losing.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import { PlayerType } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';
import '../../index.scss';
import './style.scss';

type PlayerMultiplayerProps = {
  player: PlayerType;
};

//TODO: Unificar tratamiento resultado
const ImgResult: FC<PlayerMultiplayerProps> = (props) => {
  switch (props.player.currentResult) {
    case 'WINNER':
      return <img src={StackCoinIcon} alt='Wine' />;
    case 'LOSER':
      return <img src={EmojiAngyIcon} alt='Wine' />;
    case 'PLAYING':
      return (
        <p>
          <strong> </strong>
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
    <div className='player-multiplayer'>
      <CardDeck cards={player.cards} />
      <div className='detail'>
        <p>{player.name}</p>
        <ImgResult player={player} />
      </div>
      <div className='total-lost'>
        <img src={LosingIcon} alt='Perdido' />
        <p>$ {player.totalAmountLost}</p>
      </div>
      <div className='bet-amount'>
        <img src={BetMoneyIcon} alt='Apostado' />
        <p>$ {player.betAmount}</p>
      </div>
    </div>
  );
};

export default PlayerMultiplayer;
