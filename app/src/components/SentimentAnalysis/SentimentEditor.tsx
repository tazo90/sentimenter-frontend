import React from 'react';
import { Input, Form, Button, Card } from 'antd';

import SentimentSelectors from './SentimentSelectors';

const { TextArea } = Input;

type EditorProps = {
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  onSetLanguage: (e: any) => void;
  onSetModel: (e: any) => void;
  loading: boolean;
  isSentDisabled: boolean;
  value: string;
};

const SentimentEditor = ({
  onChange,
  onSubmit,
  onSetLanguage,
  onSetModel,
  loading,
  isSentDisabled,
  value,
}: EditorProps) => {
  return (
    <Card title="Text classification" bordered={false}>
      <Form.Item>
        <SentimentSelectors
          onSetLanguage={onSetLanguage}
          onSetModel={onSetModel}
        />
        <TextArea
          rows={16}
          onChange={onChange}
          value={value}
          style={{ marginTop: 15 }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          icon="search"
          size="large"
          shape="round"
          disabled={isSentDisabled}
          loading={loading}
          onClick={onSubmit}>
          Analyze
        </Button>
      </Form.Item>
    </Card>
  );
};

export default SentimentEditor;
