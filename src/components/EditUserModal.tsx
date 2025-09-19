import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { User } from '../types/User';

interface EditUserModalProps {
  visible: boolean;
  user: User | null;
  onCancel: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  user,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user && visible) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        companyName: user.company.name,
      });
    }
  }, [user, visible, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (user) {
        const updatedUser: User = {
          ...user,
          name: values.name,
          email: values.email,
          phone: values.phone,
          website: values.website,
          company: {
            name: values.companyName,
          },
        };
        onSave(updatedUser);
        message.success('User updated successfully!');
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Edit User Profile"
      open={visible}
      onCancel={handleCancel}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save Changes
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        className="edit-user-form"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter the full name' }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter the email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please enter the phone number' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: 'Please enter the website' }]}
        >
          <Input placeholder="Enter website URL" />
        </Form.Item>

        <Form.Item
          name="companyName"
          label="Company"
          rules={[{ required: true, message: 'Please enter the company name' }]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;