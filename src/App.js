import React, { Suspense } from 'react'
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignInService from './pages/SignIn/SignInService'
import SignUpService from './pages/SignUp/SignUpService'
import HomeService from './pages/Home/HomeService'
import NotFound404 from './pages/NotFound404/NotFound404'
import routes from './components/routes/routes'

const Routing = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  )
}


export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <>
            {Routing()}
          </>
        </Suspense >
      </BrowserRouter>
    </Provider>
  )
}
