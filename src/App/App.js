import React, { Suspense } from "react";
import "./App.css"
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from '../components/routes/routes'
import LoadingPage from '../components/Loading/LoadingPage/LoadingPage';
import ScrollTopBtn from '../components/Button/ScrollTopBtn/ScrollTopBtn';
import FooterContainer from "../components/Footer/Footer";
import NavbarService from "../components/Navbar/NavbarService";
import CheckingScrollEvent from "../components/Checking/CheckingScrollEvent";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Layout, { Content} from "antd/lib/layout/layout";


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


export default function App({ isVisibleScrollTopBtn, scrollYPosition }) {

  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingPage />}>

        <BrowserRouter>

          <Layout>
            <NavbarService />

            <Content style={{ minHeight: "100vh", background: "#fff" }}>
              {Routing()}
            </Content>

            <CheckingScrollEvent scrollYPosition={scrollYPosition} />
            <ScrollTopBtn isVisibleProps={isVisibleScrollTopBtn} />
            <MessengerCustomerChat
              pageId="101341455476510"
              appId="496491375126587"
            />

            <FooterContainer />
          </Layout>

        </BrowserRouter>
      </Suspense >

    </Provider>
  )
}
