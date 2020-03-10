import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;
const LANGUAGES = [
  { key: 'en', name: 'English', disabled: false },
  { key: 'pl', name: 'Polish', disabled: false },
];
const MODELS: any = {
  en: [
    { key: 'vader', name: 'VADER', disabled: false },
    { key: 'linear_svc', name: 'LinearSVC', disabled: false },
    { key: 'lstm', name: 'LSTM (85%)', disabled: false },
    { key: 'bert', name: 'BERT (92%)', disabled: true },
  ],
  pl: [{ key: 'lstm', name: 'LSTM (85%)', disabled: true }],
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
        style={{ width: '30%', marginRight: 15 }}
        onChange={handleSetLanguage}>
        {LANGUAGES.map(item => (
          <Option key={item.key} disabled={item.disabled}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Select
        showSearch={true}
        mode="multiple"
        // value={model || 'Select model'}
        placeholder="Select model"
        disabled={language === ''}
        style={{ width: '68%' }}
        onChange={handleSetModel}>
        {language &&
          MODELS[language].map((item: any) => (
            <Option key={item.key} disabled={item.disabled}>
              {item.name}
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default SentimentSelectors;
