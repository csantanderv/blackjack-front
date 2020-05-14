import React, { useContext, useEffect } from 'react';
import BankIcon from '../../assets/svg/bank.svg';
import PlayerPlayingIcon from '../../assets/svg/player-playing.svg';
import { AppContext } from '../../state/Store';

const HeaderGameInfo = () => {
  const { state } = useContext(AppContext);
  const { bank, currentPlayer } = state;
  useEffect(() => {
    console.log('entro use effect HeaderGameInfo');
  }, [currentPlayer, bank]);

  // TODO: Revisar qué se mostrará para el jugador actual, en este momento muestra el conectado
  return (
    <div className='game-info'>
      <img src={BankIcon} alt='Carta' />
      <div className='player-bank-info'>
        <h2 className='player-name'>{bank ? bank.name : ''}:</h2>
        <h2 className='mount-bank'>$ {bank ? bank.totalAmountLost : '0'}</h2>
      </div>
      <img src={PlayerPlayingIcon} alt='Carta' />
      <div className='player-bank-info'>
        <h2 className='mount-bank'>
          {currentPlayer ? currentPlayer.name : ''}
        </h2>
      </div>
    </div>
  );
};

export default HeaderGameInfo;
