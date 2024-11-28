import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  return (
    <Header style={{ backgroundColor: 'skyblue', display: 'flex', justifyContent: 'center', alignItems: 'center',  padding: '0 20px' }}>
      <Text style={{ fontSize: '24px', color: 'white', margin: 0 }}>Real-Time Chat App</Text>
    </Header>
  );
};

export default AppHeader;
