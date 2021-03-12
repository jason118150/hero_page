import React from 'react';
import { render } from 'react-dom';
import { ResetStyle, GlobalStyle } from './style/globalstyle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Hero } from './page/heroList';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { rootReducer } from './store/reducer/rootReducer'
import { HeroDetail } from './page/heroDetail';

const store = createStore(rootReducer)

const App = () => {
  return (
    <div>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/heroes" exact component={Hero} />
          <Route path="/heroes/:id" component={HeroDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>
,document.getElementById('root'));
