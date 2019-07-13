import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRoute from "./AppRoute";
import {Layout} from "antd";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
      <Layout style={{
        minHeight: '100vh'
      }}>
        {/*<Header>*/}
          {/*header*/}
        {/*</Header>*/}
        <Content style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <AppRoute/>
        </Content>
        {/*<Footer style={{*/}
          {/*textAlign: 'center'*/}
        {/*}}>*/}
          {/*© 2019 PTIT Guitar Club*/}
        {/*</Footer>*/}
      </Layout>
  );
}

export default App;
