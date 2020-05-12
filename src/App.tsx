import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import './index.scss';
import { AppProvider } from './state/Store';
import BlackJackBoard from './BlackJackBoard';
import NotFound from './components/NotFound';
import setAuthToken from './utils/Auth';
import ErrorPage from './components/ErrorPage';

const ENDPOINT = 'http://127.0.0.1:4001';

function App() {
  /*   useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: any) => {
      setResponse(data);
    });
  }, []);
 */
  useEffect(() => {
    //setAuthToken(localStorage.token);
  }, []);

  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/game' component={BlackJackBoard} />
          <Route exact path='/error' component={ErrorPage} />
          <Route component={NotFound} />
          {/*           <PrivateRoute
            path='/private'
            isAuthenticated={this.props.state.session.isAuthenticated}
            component={PrivateContainer}
          />
 */}
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
