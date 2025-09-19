import React from 'react';
import { Card, Button, Avatar, Typography, Space, Tooltip } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled, 
  EditOutlined, 
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HomeOutlined,
  BankOutlined
} from '@ant-design/icons';
import { User } from '../types/User';
import { generateAvatarUrl } from '../services/api';

const { Text, Title } = Typography;

interface UserCardProps {
  user: User;
  onLike: (userId: number) => void;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onEdit, onDelete }) => {
  const avatarUrl = generateAvatarUrl(user.username);

  return (
    <Card
      className="user-card"
      hoverable
      cover={
        <div className="avatar-container">
          <Avatar
            size={120}
            src={avatarUrl}
            alt={`${user.name} avatar`}
            className="user-avatar"
          />
        </div>
      }
      actions={[
        <Tooltip title={user.liked ? "Unlike" : "Like"} key="like">
          <Button
            type="text"
            icon={user.liked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
            onClick={() => onLike(user.id)}
            className="action-button"
          />
        </Tooltip>,
        <Tooltip title="Edit" key="edit">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(user)}
            className="action-button"
          />
        </Tooltip>,
        <Tooltip title="Delete" key="delete">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(user.id)}
            className="action-button"
            danger
          />
        </Tooltip>,
      ]}
    >
      <div className="user-info">
        <Title level={4} className="user-name">{user.name}</Title>
        <Text type="secondary" className="username">@{user.username}</Text>
        
        <div className="contact-info">
          <Space direction="vertical" size="small" className="info-item">
            <div className="info-row">
              <MailOutlined className="info-icon" />
              <Text className="info-text">{user.email}</Text>
            </div>
            <div className="info-row">
              <PhoneOutlined className="info-icon" />
              <Text className="info-text">{user.phone}</Text>
            </div>
            <div className="info-row">
              <GlobalOutlined className="info-icon" />
              <Text className="info-text">{user.website}</Text>
            </div>
            <div className="info-row">
              <HomeOutlined className="info-icon" />
              <Text className="info-text">
                {user.address.suite}, {user.address.street}, {user.address.city} {user.address.zipcode}
              </Text>
            </div>
            <div className="info-row">
              <BankOutlined className="info-icon" />
              <Text className="info-text">{user.company.name}</Text>
            </div>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;