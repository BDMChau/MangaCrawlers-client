import React, { useEffect, Suspense, useState } from "react";
import "./App.css"
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from './components/routes/routes'
import LoadingPage from './components/Loading/LoadingPage/LoadingPage';
import ScrollTopBtn from './components/Button/ScrollTopBtn/ScrollTopBtn';
import FooterContainer from "./components/Footer/Footer";
import NavbarService from "./components/Navbar/NavbarService";
import CheckingScrollEvent from "./components/Checking/CheckingScrollEvent";
import MessengerCustomerChat from 'react-messenger-customer-chat';


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
  const [scrollYPosition, setScrollYPosition] = useState()

  useEffect(() => {
    window.addEventListener("scroll", (e) => handleScroll(e));
    return () => window.removeEventListener("scroll", (e) => handleScroll(e))
  }, [])

  const handleScroll = (e) => {
    if (window.scrollY === 0) {
      setIsVisibleScrollTopBtn(false);
    } else {
      setIsVisibleScrollTopBtn(true);
    }

    if (window.scrollY >= 86) {
      setScrollYPosition(true);
    } else {
      setScrollYPosition(false)
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Layout theme="light" style={{ minHeight: '100vh' }}>
          <Layout className="site-layout"> */}
        <NavbarService />

        <Suspense fallback={<LoadingPage />}>
          {Routing()}
          <FooterContainer />

          <CheckingScrollEvent scrollYPosition={scrollYPosition} />
          <ScrollTopBtn isVisibleProps={isVisibleScrollTopBtn} />
          <MessengerCustomerChat
            pageId="101341455476510"
            appId="https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
            htmlRef="<REF_STRING>"
          />,
        </Suspense >

        {/* </Layout>
        </Layout> */}
      </BrowserRouter>
    </Provider>
  )
}
