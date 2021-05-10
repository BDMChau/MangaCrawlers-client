import React, { Suspense } from 'react'
import "./App.css"
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from './components/routes/routes'
import TopNav from './components/Navbar/TopNav';
import { Layout } from 'antd';
import LoadingPage from './components/Loading/LoadingPage/LoadingPage';
import ScrollTopBtn from './components/Button/ScrollTopBtn/ScrollTopBtn';


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
        <Layout theme="light" style={{ minHeight: '100vh' }}>
          <Layout className="site-layout">
            <TopNav />

            <Suspense fallback={<LoadingPage />}>
              {Routing()}
              <ScrollTopBtn />
            </Suspense >

          </Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}
