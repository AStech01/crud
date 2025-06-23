import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/users/${id}`);
          setFormData({ name: response.data.name, email: response.data.email, password: '' });
          setLoading(false);
        } catch (error) {
          message.error('Failed to load user');
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      // Clear form if no id (creating new user)
      setFormData({ name: '', email: '', password: '' });
    }
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        // Update user
        await axios.put(`http://localhost:5000/api/users/${id}`, formData);
        message.success('User updated successfully!');
      } else {
        // Create user
        await axios.post(`http://localhost:5000/api/users`, formData);
        message.success('User created successfully!');
      }
      setLoading(false);
      navigate('/dashboard'); // Redirect to dashboard after success
    } catch (error) {
      message.error('Failed to save user');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={3}>{id ? 'Edit User' : 'Create User'}</Title>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Name:</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password:</label>
          <Input.Password
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={id ? 'Leave blank to keep current password' : ''}
            required={!id} // required only for creating new user
          />
        </div>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {id ? 'Update User' : 'Create User'}
        </Button>
      </form>
    </div>
  );
};

export default User;
