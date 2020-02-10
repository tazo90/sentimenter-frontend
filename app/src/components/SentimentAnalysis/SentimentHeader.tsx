import React from 'react';
import { Icon, Row, Col, Card, Typography, Tag } from 'antd';

const { Text, Paragraph } = Typography;

const SentimentHeader = () => (
  <Card
    bordered={false}
    className="text-left"
    bodyStyle={{ padding: '0px 24px', marginTop: 10 }}>
    <Row type="flex" style={{ alignItems: 'center', padding: '16px 0' }}>
      <Col span={2} offset={2}>
        <Icon
          type="smile"
          theme="twoTone"
          twoToneColor="#52c41a"
          style={{ fontSize: 36 }}
        />
      </Col>
      <Col span={6}>
        <h2>Sentiment Analysis</h2>
        <Text type="secondary">English</Text>
      </Col>
      <Col span={12}>
        <Paragraph>
          This is a generic sentiment analysis classifier for texts in English.
          It works great in any kind of texts. If you are not sure of which
          sentiment analysis classifier to use, use this one.
        </Paragraph>
        <Tag color="red">Negative</Tag>
        <Tag color="blue">Neutral</Tag>
        <Tag color="green">Positive</Tag>
      </Col>
    </Row>
  </Card>
);

export default SentimentHeader;
