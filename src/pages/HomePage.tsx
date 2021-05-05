import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import UserCard from '../components/UserCard';
import baseUrl from '../config/apis';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState([]);

  const getAll = async () => {
    const res = await axios.get(`${baseUrl}/user`);
    setUsers(res.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Container>
        <h2 style={{ margin: '200px 0' }}>
          Home Page <br />
          comming soon.
        </h2>
      </Container>
    </>
  );
};

export default HomePage;
