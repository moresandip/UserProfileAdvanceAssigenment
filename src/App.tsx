import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UserCard from './components/UserCard';
import EditUserModal from './components/EditUserModal';
import LoadingSpinner from './components/LoadingSpinner';
import { User } from './types/User';
import { fetchUsers } from './services/api';

const { Header, Content } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (error) {
      message.error('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (userId: number) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, liked: !user.liked } : user
      )
    );
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setEditModalVisible(false);
    setEditingUser(null);
  };

  const handleDelete = (userId: number) => {
    const user = users.find(u => u.id === userId);
    
    confirm({
      title: 'Delete User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${user?.name}? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        message.success('User deleted successfully');
      },
    });
  };

  const handleModalCancel = () => {
    setEditModalVisible(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <Layout className="app-layout">
        <Content className="app-content">
          <LoadingSpinner />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <Title level={2} className="app-title">
            User Profiles Directory
          </Title>
          <p className="app-subtitle">
            Discover and connect with our community members
          </p>
        </div>
      </Header>
      
      <Content className="app-content">
        <div className="content-container">
          <Row gutter={[24, 24]} justify="center">
            {users.map(user => (
              <Col
                key={user.id}
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={6}
              >
                <UserCard
                  user={user}
                  onLike={handleLike}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Content>

      <EditUserModal
        visible={editModalVisible}
        user={editingUser}
        onCancel={handleModalCancel}
        onSave={handleSaveUser}
      />
    </Layout>
  );
};

export default App;