import React from 'react';
import { Card } from 'antd';

const SentimentWordCloud = () => (
  <Card title="Word Cloud" bordered={false} bodyStyle={{ height: 276 }}>
    <img
      style={{
        maxHeight: '100%',
        minWidth: '100%',
        textAlign: 'center',
      }}
      alt="Word Cloud"
      src="https://cdn.ilovefreesoftware.com/wp-content/uploads/2015/03/Jason-Davies-Word-Cloud-Generator.png"
    />
  </Card>
);

export default SentimentWordCloud;
