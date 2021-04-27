import React, { useEffect } from 'react';
import { userIdAxios } from '../api/axios';
import axios from "axios";

const HomePage: React.FC = () => {

  const idAxios = () => {
    userIdAxios.get('http://localhost:8000/user/');
  };

  const auAixis = () => {

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
