import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';

import { useLogin } from './components/LoginProvider';
import VoteLoadingIndicator from './components/VoteLoadingIndicator';

const VoteListPage = React.lazy(() => import('./components/VoteListPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const VoteComposerPage = React.lazy(() => import('./components/VoteComposerPage'));

export default function App() {
  const location = useLocation();
  const { loggedIn } = useLogin();

  function voteComposerOrLogin() {
    return loggedIn ? (
      <VoteComposerPage />
    ) : (
      <Redirect to={{ pathname: '/login', state: { redirectAfter: location.pathname } }} />
    );
  }

  return (
    <div className="Background">
      <div className="Header">
        <div className="Title">Vote as a Service</div>
      </div>
      <div className="Main">
        <div className="Container">
          <React.Suspense fallback={<VoteLoadingIndicator />}>
            <Switch>
              <Route exact path="/">
                <VoteListPage />
              </Route>
              <Route exact path="/votes/:voteId">
                <VoteListPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/compose">{voteComposerOrLogin}</Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}
