import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Layout, Menu, Icon, Input, Row, Col, Form, Button, Card, Typography, Tag, Divider, Spin } from 'antd';
import { useFetch } from 'react-async';

import './App.css';


const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Text, Paragraph } = Typography;

const AlignLeftRight = styled.header`
  display: flex;
  justify-content: space-between;
`;

type EditorProps = {
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  loading: boolean;
  value: string;
}

const Editor = ({ onChange, onSubmit, loading, value }: EditorProps) => (
  <Card title="Classify text" bordered={false}>
    <Form.Item>
      <TextArea rows={16} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" type="primary" icon="search" size="large" shape="round" loading={loading} onClick={onSubmit}>
        Analyze
      </Button>
    </Form.Item>
  </Card>
);

const App: React.FC = () => {
  const [text, setText] = useState('');
  const { isPending, error, data, run } = useFetch("http://localhost:8000/api/language/analyze_sentiment/", { method: "POST" }, { json: true })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const payload = JSON.stringify({
      text,
      language: 'en'
    });
    run({ body: payload })
  }

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
          <Sider
              collapsible
              >
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
                <img src="logo.png" alt="Logo" style={{height: 50}} />
              </Header>
              <Content style={{ margin: '8px 16px', minHeight: 280 }}>
                <Row gutter={[0, 44]}>
                  <Col span={22} offset={1}>
                    <Card bordered={false} className="text-left" bodyStyle={{padding: "0px 24px", marginTop: 10}}>
                      <Row type="flex" style={{alignItems: "center", padding: "16px 0"}}>
                        <Col span={2} offset={2}>
                          <Icon type="smile" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 36 }} />
                        </Col>
                        <Col span={6}>
                          <h2>Sentiment Analysis</h2>
                          <Text type="secondary">English</Text>
                        </Col>
                        <Col span={12}>
                          <Paragraph>
                            This is a generic sentiment analysis classifier for texts in English. It works great in any kind of texts. If you are not sure of which sentiment analysis classifier to use, use this one.
                          </Paragraph>
                          <Tag color="red">Negative</Tag>
                          <Tag color="blue">Neutral</Tag>
                          <Tag color="green">Positive</Tag>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Row gutter={[0, 44]}>
                  <Col span={12} offset={1}>
                  <div>
                      <Editor
                        onChange={event => setText(event.target.value)}
                        onSubmit={handleSubmit}
                        loading={isPending}
                        value={text} />
                    </div>
                  </Col>
                  <Col span={9} offset={1}>
                    <Card title="Sentiment" bordered={false}>
                      <Spin spinning={isPending} size="large" tip="Classification...">
                        <AlignLeftRight>
                          <Text strong>TAG</Text>
                          <Text strong>CONFIDENCE</Text>
                        </AlignLeftRight>
                        <Divider />
                        <AlignLeftRight>
                          <Text>Positive</Text>
                          <Text>99%</Text>
                        </AlignLeftRight>
                      </Spin>
                    </Card>
                  </Col>
                  <Col span={9} offset={1}>
                    <Card title="Word Cloud" bordered={false} bodyStyle={{height: 276}}>
                      <img
                        style={{maxHeight: '100%', minWidth: '100%', textAlign: 'center'}}
                        src="https://cdn.ilovefreesoftware.com/wp-content/uploads/2015/03/Jason-Davies-Word-Cloud-Generator.png" />
                    </Card>
                  </Col>
                </Row>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                  AmAI © 2020
              </Footer>
          </Layout>
      </Layout>

    </div>
  );
}

export default App;
