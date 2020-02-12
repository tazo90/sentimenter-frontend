import React from 'react';
import { Card, Typography, Divider, Spin } from 'antd';

import { AlignLeftRight } from './SentimentStyles';

type ModelInfoProps = {
  isLoading: boolean;
  modelInfo: {
    vocab_size: number;
  };
};

const { Text } = Typography;

const SentimentModelDesc = ({ isLoading, modelInfo }: ModelInfoProps) => {
  return (
    <Card
      title="Model Description"
      bordered={false}
      bodyStyle={{ height: 335 }}>
      <Spin spinning={isLoading} size="large" tip="Classification...">
        <AlignLeftRight>
          <Text strong>Unique words</Text>
          <Text strong>{modelInfo && modelInfo.vocab_size}</Text>
        </AlignLeftRight>
        <Divider />
        <AlignLeftRight>
          <Text strong>Word cloud</Text>
        </AlignLeftRight>
        <Divider />
        {modelInfo && (
          <img
            style={{
              maxHeight: '100%',
              minWidth: '100%',
              textAlign: 'center',
              width: 340,
              height: 230,
            }}
            alt="Word Cloud"
            src="https://cdn.ilovefreesoftware.com/wp-content/uploads/2015/03/Jason-Davies-Word-Cloud-Generator.png"
          />
        )}
      </Spin>
    </Card>
  );
};

export default SentimentModelDesc;
