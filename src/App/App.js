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
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SideNav from "../components/Navbar/SideNav";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
  )
}


export default function App({ isVisibleScrollTopBtn, scrollYPosition }) {
  const [collapsed, setCollapsed] = React.useState(false)

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
};

  
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingPage />}>
        <BrowserRouter>




        <Layout style={{ minHeight: '100vh' }}>
        <SideNav/>
         
        <Layout className="site-layout">
         
          <Content style={{ margin: '0 0' }}>
            {Routing()}
            <ScrollTopBtn isVisibleProps={isVisibleScrollTopBtn} />
          </Content>
         <FooterContainer/>
        </Layout>
      </Layout>




        </BrowserRouter>
      </Suspense >
    </Provider>
  )
}
