import React, { Suspense, useState } from "react";
import "./App.css";
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from '../components/routes/routes';
import LoadingPage from '../components/Loading/LoadingPage/LoadingPage';
import ScrollTopBtn from '../components/Button/ScrollTopBtn/ScrollTopBtn';
import FooterContainer from "../components/Footer/Footer";
import NavbarService from "../components/Navbar/NavbarService";
import CheckingScrollEvent from "../components/Checking/CheckingScrollEvent";
// import MessengerCustomerChat from 'react-messenger-customer-chat';
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


export default function App({ isVisibleScrollTopBtn, scrollYPosition }) {
  const renderMangaComponentPages = () => (
    <Layout>
      <NavbarService />

      <Content style={{ background: "#fff" }}>
        {Routing()}
      </Content>

      <CheckingScrollEvent scrollYPosition={scrollYPosition} />
      <ScrollTopBtn isVisibleProps={isVisibleScrollTopBtn} />

      <AddOnsBtn />


      <FooterContainer />
    </Layout>
  );



  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        {renderMangaComponentPages()}

      </BrowserRouter>
    </Suspense >
  );
};