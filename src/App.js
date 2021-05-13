import React, { useEffect, Suspense, useState } from "react";
import "./App.css"
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from './components/routes/routes'
import TopNav from './components/Navbar/TopNav';
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
  const [isVisibleScrollTopBtn, setIsVisibleScrollTopBtn] = useState()

  useEffect(() => {    
    window.addEventListener("scroll", (e) => handleScroll(e));
    return () => window.removeEventListener("scroll", (e) => handleScroll(e))
    },[])

  const handleScroll = (e) => {
    if (window.scrollY === 0) {
      setIsVisibleScrollTopBtn(false)
    } else {
      setIsVisibleScrollTopBtn(true)
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Layout theme="light" style={{ minHeight: '100vh' }}>
          <Layout className="site-layout"> */}
        <div id="app" className="app" onScroll={(e) => handleScroll(e)}>
          <TopNav />

          <Suspense fallback={<LoadingPage />}>
            {Routing()}
            <ScrollTopBtn isVisibleProps={isVisibleScrollTopBtn} />
          </Suspense >
        </div>

        {/* </Layout>
        </Layout> */}
      </BrowserRouter>
    </Provider>
  )
}
