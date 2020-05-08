import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import BoardMultiplayer from './components/BoardMultiplayer';
import BoardPlayer from './components/BoardPlayer';
import BoardBank from './components/BoardBank';
import LoginPage from './components/LoginPage';
import './index.scss';

const ENDPOINT = 'http://127.0.0.1:4001';

function BlackJackBoard() {
  const [response, setResponse] = useState('');

  /*   useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: any) => {
      setResponse(data);
    });
  }, []);
 */
  return (
    <div className='main-content'>
      <Header></Header>
      <BoardMultiplayer />
      <BoardPlayer />
      <BoardBank></BoardBank>
    </div>
  );
}

export default BlackJackBoard;
