import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;
const LANGUAGES = [
  { key: 'en', name: 'English' },
  { key: 'pl', name: 'Polish' },
];
const MODELS: any = {
  en: [
    { key: 'bert', name: 'BERT' },
    { key: 'lstm', name: 'LSTM' },
    { key: 'vader', name: 'VADER' },
  ],
  pl: [{ key: 'lstm', name: 'LSTM' }],
};

const SentimentSelectors = ({ onSetLanguage, onSetModel }: any) => {
  const [language, setLanguage] = useState('');
  const [model, setModel] = useState('');

  const handleSetLanguage = (value: string) => {
    setLanguage(value);
    setModel('');
    // update state in app component
    onSetLanguage(value);
  };

  const handleSetModel = (value: string) => {
    setModel(value);
    onSetModel(value);
  };

  return (
    <div>
      <Select
        defaultValue="Select language"
        showSearch={true}
        style={{ width: 180, marginRight: 15 }}
        onChange={handleSetLanguage}>
        {LANGUAGES.map(item => (
          <Option key={item.key}>{item.name}</Option>
        ))}
      </Select>
      <Select
        showSearch={true}
        value={model || 'Select model'}
        disabled={language === ''}
        style={{ width: 180 }}
        onChange={handleSetModel}>
        {language &&
          MODELS[language].map((item: any) => (
            <Option key={item.key}>{item.name}</Option>
          ))}
      </Select>
    </div>
  );
};

export default SentimentSelectors;
