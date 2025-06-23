import React, { useEffect, useState } from 'react';
import { Button, Space, Table, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const users = response.data.map(user => ({
        key: user._id,
        name: user.name,
        email: user.email,
      }));
      setData(users);
    } catch (error) {
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      message.success('User deleted');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleUpdate = (record) => {
    navigate(`/user/${record.key}`); // navigate to /user/:id for editing
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
          <Button type="primary" danger onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Dashboard Table</h2>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default Dash;
