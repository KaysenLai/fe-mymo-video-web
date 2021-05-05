import React from 'react';
import MainNav from '../components/MainNav';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProfilePage from './ProfilePages/ProfilePage';
import MyProfilePage from './ProfilePages/MyProfilePage';

import ProtectedRoute from '../routes/ProtectedRoute';
import StartsPage from './StarsPage';

const WithNavContainer: React.FC = () => {
  return (
    <>
      <MainNav />
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/profile" redirectTo="/signin" component={MyProfilePage} />
      <Route path="/profile/:userId" component={ProfilePage} />
      <Route path="/starts" component={StartsPage} />
    </>
  );
};

export default WithNavContainer;
