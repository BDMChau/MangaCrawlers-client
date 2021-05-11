import React, { useState, useEffect, useRef, Suspense } from "react";
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
import { debounce } from 'lodash';


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
  const [currentScrollY, setCurrentScrollY] = useState(0)

  useEffect(() => {
    const debounceScroll = debounce(handleScroll, 500);
    window.addEventListener("scroll", debounceScroll, { passive: true });
    return () => window.removeEventListener("scroll", debounceScroll);
  }, []);

  const handleScroll = () => {
    setCurrentScrollY(window.scrollY);
  };




  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout theme="light" style={{ minHeight: '100vh' }}>
          <Layout className="site-layout">
            <TopNav />

            <Suspense fallback={<LoadingPage />}>
              {Routing()}
              <ScrollTopBtn currentScrollY={currentScrollY} />
            </Suspense >

          </Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  )
}
