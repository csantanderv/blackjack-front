import React from 'react';
import LosingIcon from '../../assets/svg/losing.svg';
import BetMoneyIcon from '../../assets/svg/bet-money.svg';
import CardDeck from '../CardDeck';
import { PlayerType } from '../../state/StoreTypes';
import CoinStackIncon from '../../assets/svg/coin-stack.svg';
import { IconCurrentResult } from '../IconCurrentResult';
import classnames from 'classnames';
import '../../style.scss';
import './style.scss';

type PlayerMultiplayerProps = {
  player: PlayerType;
  onClick(player: PlayerType): void;
};

const PlayerMultiplayer = (props: PlayerMultiplayerProps) => {
  const { player, onClick } = props;
  const handleClick = () => {
    onClick(player);
  };
  return (
    <div
      className={classnames({
        'player-multiplayer': true,
        'player-hiting': player.hiting,
        'player-standing': player.standing,
      })}
      onClick={handleClick}
    >
      <CardDeck cards={player.cards} totalCards={player.totalCards} />
      <IconCurrentResult player={player} size='small' />
      <div className='detail'>
        <p>{player.name}</p>
      </div>
      <div className='total-win'>
        <img src={CoinStackIncon} alt='Ganado' />
        <p>$ {player.totalAmountWin}</p>
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
