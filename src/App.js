import React from 'react'
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignInService from './components/SignIn/SignInService'
import SignUpService from './components/SignUp/SignUpService'

const Routing = () => {
  return (
    <Switch>
      

      {/* <Route>
        <NotFound />
      </Route> */}

    </Switch>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <SignInService />
      <BrowserRouter>
        {Routing()}
      </BrowserRouter>
    </Provider>
  )
}
