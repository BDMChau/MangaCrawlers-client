import React, { Suspense } from 'react'
import "./App.css"
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from './components/routes/routes'
import SideNav from './components/Navbar/SideNav';
import TopNav from './components/Navbar/TopNav';
import { Layout } from 'antd';


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

          <Layout theme="light" style={{ minHeight: '100vh' }}>
            <TopNav />
            <Layout className="site-layout">
              {Routing()}
            </Layout>
          </Layout>
          
        </Suspense >
      </BrowserRouter>
    </Provider>
  )
}
