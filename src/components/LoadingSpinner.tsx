import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />;

  return (
    <div className="loading-container">
      <Spin indicator={antIcon} />
      <p className="loading-text">Loading user profiles...</p>
    </div>
  );
};

export default LoadingSpinner;