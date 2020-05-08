import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound';
import BlackJackBoard from '../BlackJackBoard';

const Routes = (props: any) => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/game' component={BlackJackBoard} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
