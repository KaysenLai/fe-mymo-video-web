import React from 'react';
import WithNavContainer from './pages/WithNavContainer';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <Route exact path="/signin" component={SignInPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route path="/" component={WithNavContainer} />
    </>
  );
};

export default App;
