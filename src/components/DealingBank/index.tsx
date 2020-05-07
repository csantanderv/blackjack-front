import React from 'react';
import BankIcon from '../../assets/svg/bank.svg';
import Card2C from '../../assets/svg/cards/2C.svg';
import '../../index.scss';
import './style.scss';

const DealingBank = () => {
  return (
    <div className='dealing-bank'>
      <img className='card-player-first' src={Card2C} alt='Carta' />
      <div className='info-mount-bank'>
        <img src={BankIcon} alt='Carta' />
        <div className='bank-info'>
          <h2 className='mount-bank'>$ 10.000</h2>
        </div>
      </div>
    </div>
  );
};

export default DealingBank;
