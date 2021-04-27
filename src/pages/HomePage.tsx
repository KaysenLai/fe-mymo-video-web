import React, { useEffect } from 'react';
import { userIdAxios } from '../api/axios';

const HomePage: React.FC = () => {
  useEffect(() => {
    userIdAxios.get('http://localhost:8000/api/');
  });

  return (
    <>
      <h1>homepage</h1>

      {/*<Ffmepg />*/}
    </>
  );
};

export default HomePage;
