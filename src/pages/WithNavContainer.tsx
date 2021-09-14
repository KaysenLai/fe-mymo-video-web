import React from 'react';
import MainNav from '../components/MainNav';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import ProfilePage from './ProfilePages/ProfilePage';
import MyProfilePage from './ProfilePages/MyProfilePage';

import ProtectedRoute from '../routes/ProtectedRoute';
import StarPage from './StarPage';
import VideoPage from './VideoPage';
import UploadPage from './UploadPage';

const WithNavContainer: React.FC = () => {
  return (
    <>
      <MainNav />
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/profile" redirectTo="/signin" component={MyProfilePage} />
      <Route path="/profile/:userId" component={ProfilePage} />
      <Route path="/star" component={StarPage} />
      <Route path="/upload" component={UploadPage} />
      <Route exact path="/video/:videoId" component={VideoPage} />
    </>
  );
};

export default WithNavContainer;
