import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import Home from './pages/Home';

import client from './ApolloClient'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/" component={() => <h1> 404 - Not found </h1>}></Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>

  );
}

export default App;
