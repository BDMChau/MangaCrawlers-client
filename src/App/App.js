import React, { Suspense, useState } from "react";
import "./App.css";
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from './routes/routes';
import LoadingPage from '../components/Loading/LoadingPage/LoadingPage';
import ScrollTopBtn from '../components/Button/ScrollTopBtn/ScrollTopBtn';
import FooterContainer from "../components/Footer/Footer";
import NavbarService from "../components/Navbar/NavbarService";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Layout, { Content } from "antd/lib/layout/layout";
import AddOnsBtn from "../components/Button/AddOnsBtn/AddOnsBtn";


const Routing = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
};


export default function App() {
  const ComponentPages = () => (
    <Suspense fallback={<LoadingPage />}>

      <Content style={{ background: "#fff", minHeight: "100vh" }}>
        <Routing />
      </Content>

      <ScrollTopBtn />

      {/* <MessengerCustomerChat
        pageId="101341455476510"
        appId="496491375126587"
      /> */}

      <AddOnsBtn />

      <FooterContainer />
    </Suspense >
  );



  return (
    <BrowserRouter>
      <Layout>
        
        <NavbarService />
        <ComponentPages />

      </Layout>
    </BrowserRouter>
  );
};