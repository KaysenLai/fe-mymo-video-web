import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import UserCard from '../components/UserCard';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState([]);

  const getAll = async () => {
    const res = await axios.get('http://localhost:8000/user');
    console.log(res.data[0]);
    setUsers(res.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Container>
        <h2 style={{ margin: '30px 0' }}>A temporary homepage for testing. Just simply show all users.</h2>
        {users !== [] &&
          users.map((item: any, index: any) => (
            <div key={index}>
              <UserCard
                _id={item._id}
                avatar={item.avatar}
                fullName={item.name}
                followerNum={item.followerNum}
                desc={item.description}
              />
            </div>
          ))}
      </Container>
    </>
  );
};

export default HomePage;
