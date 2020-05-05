import React from 'react';
import Header from './components/Header';
import CoinUpIcon from './assets/svg/coin-up.svg';
import CoinDownIcon from './assets/svg/coin-down.svg';
import StandHandIcon from './assets/svg/stand-hand.svg';
import HitHandIcon from './assets/svg/hit-hand.svg';
import Card2C from './assets/svg/cards/2C.svg';
import StackCoinIcon from './assets/svg/stack-coin.svg';
import EmojiAngryIcon from './assets/svg/emoji-angry.svg';
import LosingIcon from './assets/svg/losing.svg';
import './index.scss';

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className='main-content'>
        <div className='item-container'>
          <div className='board-container'>
            {/* jugador 1 */}
            <div className='player-board'>
              <div className='player-cards'>
                <img src={Card2C} alt='Carta' />
              </div>
              <div className='player-detail'>
                <p>Jugador 1</p>
                <img src={StackCoinIcon} alt='Wine' />
              </div>
              <div className='player-mount'>
                <img src={LosingIcon} alt='Wine' />
                <p>$ 5000</p>
              </div>
            </div>
            {/* jugador 2 */}
            <div className='player-board'>
              <div className='player-cards'>
                <img src={Card2C} alt='Carta' />
              </div>
              <div className='player-detail'>
                <p>Shaggy</p>
                <img src={EmojiAngryIcon} alt='Wine' />
              </div>
              <div className='player-mount'>
                <img src={LosingIcon} alt='Wine' />
                <p>$ 5000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor mano de jugador */}
        <div className='item-container'>
          <div className='board-player-container'>
            <div className='bet-container'>
              <figure className='icon-coin'>
                <img src={CoinUpIcon} alt='Apuesta Más' />
              </figure>
              <h1>$ 2000</h1>
              <figure className='icon-coin'>
                <img src={CoinDownIcon} alt='Apuesta Menos' />
              </figure>
            </div>

            <div className='hand-bet-container'>
              <figure className='hand-bet'>
                <img src={StandHandIcon} alt='Apuesta Más' />
              </figure>
              <div className='card-deck-player'>
                <img className='card-player-first' src={Card2C} alt='Carta' />
                <img className='card-player-second' src={Card2C} alt='Carta' />
              </div>
              <figure className='hand-bet'>
                <img src={HitHandIcon} alt='Apuesta Menos' />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
