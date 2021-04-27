import React, { useEffect } from 'react';
import { authAxios, userIdAxios } from '../api/axios';
import axios from 'axios';

const HomePage: React.FC = () => {
  const idAxios = () => {
    userIdAxios.get('http://localhost:8000/user');
  };

  const auAixis = () => {
    authAxios.get('http://localhost:8000/user/token');
  };
  return (
    <>
      <h1>homepage</h1>
      <button onClick={idAxios}>idAxios</button>
      <button onClick={auAixis}>auAixis</button>
      {/*<Ffmepg />*/}
    </>
  );
};

export default HomePage;
