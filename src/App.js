import React from 'react';
import { Layout } from 'antd';
import Chat from './components/Chat'; // Import the Chat component
import AppHeader from './components/Header'; 

const { Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '90vh' }}>
      <AppHeader />
      <Content style={{ padding: '10px', display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Chat /> {/* Render the Chat component */}
      </Content>
    </Layout>
  );
};

export default App;
