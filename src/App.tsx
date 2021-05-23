import React from 'react';
import WithNavContainer from './pages/WithNavContainer';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { Switch, Route } from 'react-router-dom';
import VerifyPage from './pages/VerifyPage';

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/verify/:token" component={VerifyPage} />
        <Route path="/" component={WithNavContainer} />
      </Switch>
    </>
  );
};

export default App;
