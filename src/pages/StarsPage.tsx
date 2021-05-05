import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import UserCard from '../components/UserCard';
import baseUrl from '../config/apis';

const StarsPage: React.FC = () => {
  const [users, setUsers] = useState([]);

  const getAll = async () => {
    const res = await axios.get(`${baseUrl}/user`);
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Container>
        <h2 style={{ margin: '30px 0' }}>Top starts with most followers.</h2>
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

export default StarsPage;
