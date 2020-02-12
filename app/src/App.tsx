import React, { useState } from 'react';
import { useFetch } from 'react-async';
import { Layout, Menu, Icon, Row, Col } from 'antd';

import {
  SentimentHeader,
  SentimentEditor,
  SentimentModelDesc,
  SentimentResults,
} from 'components/SentimentAnalysis';

import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [model, setModel] = useState('');

  const { isPending, data, run }: any = useFetch(
    `${process.env.REACT_APP_API_ROOT}/language/analyze_sentiment/`,
    { method: 'POST' },
    { json: true }
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const payload = JSON.stringify({
      text,
      language,
      model,
    });
    run({ body: payload });
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Sentiment Analysis</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Topic Analysis</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
            <img src="logo.png" alt="Logo" style={{ height: 50 }} />
          </Header>
          <Content style={{ margin: '8px 16px', minHeight: 280 }}>
            <Row gutter={[0, 44]}>
              <Col span={22} offset={1}>
                <SentimentHeader />
              </Col>
            </Row>
            <Row gutter={[0, 44]}>
              <Col span={12} offset={1}>
                <SentimentEditor
                  onChange={(event: any) => setText(event.target.value)}
                  onSubmit={handleSubmit}
                  onSetLanguage={setLanguage}
                  onSetModel={setModel}
                  loading={isPending}
                  isSentDisabled={text === '' || model === ''}
                  value={text}
                />
              </Col>
              <Col span={9} offset={1}>
                <SentimentResults isLoading={isPending} results={data} />
              </Col>
              <Col span={9} offset={1}>
                <SentimentModelDesc
                  isLoading={isPending}
                  modelInfo={data && data.model_info}
                />
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>AmAI © 2020</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
