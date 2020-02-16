import React from 'react';
import styled from '@emotion/styled';
import { Card, Typography, Divider, Spin, Tag, Collapse, Icon } from 'antd';

type ModelInfoProps = {
  vocab_size: number;
  word_cloud_url: string;
};

type ScoreProps = {
  model_name: string;
  tag_name: string;
  score: number;
  model_info: ModelInfoProps;
};

type ScoresProps = {
  isLoading: boolean;
  scores: [ScoreProps];
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

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

const SentimentResultsHeader = ({ score }: any) => {
  return (
    <AlignLeftRight>
      <Text>
        <b>{score.model_name.toUpperCase()}</b>
      </Text>
      <Text>
        <Tag color={TAG_COLOR_MAP[score.tag_name.toLowerCase()]}>
          <b>{score.tag_name}</b>
        </Tag>
      </Text>
      <Text>
        <b>{score.score.toPrecision(4)}%</b>
      </Text>
    </AlignLeftRight>
  );
};

const SentimentResultsDetails = ({ modelInfo }: any) => {
  console.log('model', modelInfo);
  return (
    <>
      {modelInfo.vocab_size && (
        <AlignLeftRight>
          <Text strong>Unique words</Text>
          <Text strong>{modelInfo && modelInfo.vocab_size}</Text>
        </AlignLeftRight>
      )}
      <Divider />
      {modelInfo.word_cloud_url && (
        <img
          style={{
            maxHeight: '100%',
            minWidth: '100%',
            textAlign: 'center',
            width: 340,
            height: 230,
          }}
          alt="Word Cloud"
          src={modelInfo.word_cloud_url}
        />
      )}
    </>
  );
};

const SentimentResults = ({ isLoading, scores }: ScoresProps) => {
  return (
    <Card title="Sentiment" bordered={false}>
      <Spin spinning={isLoading} size="large" tip="Classification...">
        <AlignLeftRight>
          <Text strong>MODEL</Text>
          <Text strong>TAG</Text>
          <Text strong>CONFIDENCE</Text>
        </AlignLeftRight>
        <Divider />
        {scores &&
          scores.map((score: ScoreProps) => (
            <>
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}>
                <Panel
                  header={<SentimentResultsHeader score={score} />}
                  key="1"
                  style={customPanelStyle}>
                  <SentimentResultsDetails modelInfo={score.model_info} />
                </Panel>
              </Collapse>
            </>
          ))}
      </Spin>
    </Card>
  );
};

export default SentimentResults;
