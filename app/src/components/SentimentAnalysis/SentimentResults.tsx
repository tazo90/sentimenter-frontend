import React from 'react';
import styled from '@emotion/styled';
import { Card, Typography, Divider, Spin, Tag, Collapse, Icon } from 'antd';

type ModelInfoProps = {
  vocab_size: number;
  dataset: string;
  word_cloud_url: string;
};

type ScoreProps = {
  model_name: string;
  tag_name: string;
  score: number;
  model_info: ModelInfoProps;
};

type ResultsProps = {
  isLoading: boolean;
  scores: [ScoreProps];
  wordCloudUrl: string;
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
      <Text style={{ width: 50 }}>
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
      {modelInfo.dataset && (
        <AlignLeftRight>
          <Text strong>Dataset</Text>
          <Text strong>{modelInfo.dataset}</Text>
        </AlignLeftRight>
      )}
      <Divider />
      {modelInfo.vocab_size && (
        <AlignLeftRight>
          <Text strong>Unique words</Text>
          <Text strong>{modelInfo.vocab_size}</Text>
        </AlignLeftRight>
      )}
      {/* <Divider />
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
      )} */}
    </>
  );
};

const SentimentResults = ({ isLoading, scores, wordCloudUrl }: ResultsProps) => {
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
          scores.map((score: ScoreProps) => {
            return (
              <>
                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) =>
                    score.model_info && (
                      <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                    )
                  }>
                  <Panel
                    header={<SentimentResultsHeader score={score} />}
                    key="1"
                    style={customPanelStyle}>
                    {score.model_info && (
                      <SentimentResultsDetails modelInfo={score.model_info} />
                    )}
                  </Panel>
                </Collapse>
              </>
            );
          })
        }
        <Divider />
        {wordCloudUrl &&
          <img
            style={{
              maxHeight: '100%',
              minWidth: '100%',
              textAlign: 'center',
              width: 340,
              height: 230,
            }}
            alt="Word Cloud"
            src={wordCloudUrl}
          />
        }
      </Spin>
    </Card>
  );
};

export default SentimentResults;
