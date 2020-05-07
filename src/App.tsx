import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BoardMultiplayer from './components/BoardMultiplayer';
import BoardPlayer from './components/BoardPlayer';
import BoardBank from './components/BoardBank';
import './index.scss';

const ENDPOINT = 'http://127.0.0.1:4001';

function App() {
  const [response, setResponse] = useState('');

  /*   useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: any) => {
      setResponse(data);
    });
  }, []);
 */
  return (
    <React.Fragment>
      <Header />
      <div className='main-content'>
        <BoardMultiplayer />
        <BoardPlayer />
        <BoardBank></BoardBank>
      </div>
    </React.Fragment>
  );
}

export default App;
