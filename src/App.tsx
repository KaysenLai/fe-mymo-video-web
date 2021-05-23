import React from 'react';
import WithNavContainer from './pages/WithNavContainer';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { Switch, Route } from 'react-router-dom';
import VerifyPage from './pages/VerifyPage';
import ForgetPage from './pages/ForgetPage';
import ResetPage from './pages/ResetPage';
import VideoPage from './pages/VideoPage';

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/verify/:token" component={VerifyPage} />
        <Route exact path="/forget" component={ForgetPage} />
        <Route exact path="/reset/:token" component={ResetPage} />

        <Route path="/" component={WithNavContainer} />
      </Switch>
    </>
  );
};

export default App;
