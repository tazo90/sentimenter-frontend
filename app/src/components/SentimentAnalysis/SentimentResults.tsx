import React from 'react';
import styled from '@emotion/styled';
import { Card, Typography, Divider, Spin } from 'antd';

type ResultsProps = {
  isLoading: boolean;
  results: {
    tag_name: string;
    score: number;
  };
};

const { Text } = Typography;

const AlignLeftRight = styled.header`
  display: flex;
  justify-content: space-between;
`;

const SentimentResults = ({ isLoading, results }: ResultsProps) => (
  <Card title="Sentiment" bordered={false}>
    <Spin spinning={isLoading} size="large" tip="Classification...">
      <AlignLeftRight>
        <Text strong>TAG</Text>
        <Text strong>CONFIDENCE</Text>
      </AlignLeftRight>
      <Divider />
      {results && (
        <AlignLeftRight>
          <Text>{results.tag_name}</Text>
          <Text>{results.score} %</Text>
        </AlignLeftRight>
      )}
    </Spin>
  </Card>
);

export default SentimentResults;
