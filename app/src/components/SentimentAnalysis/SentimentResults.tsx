import React from 'react';
import styled from '@emotion/styled';
import { Card, Typography, Divider, Spin, Tag } from 'antd';

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

const TAG_COLOR_MAP: any = {
  positive: 'green',
  neutral: 'blue',
  negative: 'red',
};

const SentimentResults = ({ isLoading, results }: ResultsProps) => {
  return (
    <Card title="Sentiment" bordered={false}>
      <Spin spinning={isLoading} size="large" tip="Classification...">
        <AlignLeftRight>
          <Text strong>TAG</Text>
          <Text strong>CONFIDENCE</Text>
        </AlignLeftRight>
        <Divider />
        {results && (
          <AlignLeftRight>
            <Text>
              <Tag color={TAG_COLOR_MAP[results.tag_name.toLowerCase()]}>
                <b>{results.tag_name}</b>
              </Tag>
            </Text>
            <Text>
              <b>{results.score.toPrecision(4)}%</b>
            </Text>
          </AlignLeftRight>
        )}
      </Spin>
    </Card>
  );
};

export default SentimentResults;
