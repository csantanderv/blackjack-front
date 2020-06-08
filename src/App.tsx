import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { AppProvider } from './state/Store';
import BlackJackBoard from './BlackJackBoard';
import NotFound from './components/NotFound';
import ErrorPage from './components/ErrorPage';
import './index.scss';

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/game' component={BlackJackBoard} />
          <Route exact path='/error' component={ErrorPage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
