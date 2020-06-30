import React from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import Layout from './components/Layout';
import ErrorMessage from './components/ErrorMessage';
import VoteLoadingIndicator from './components/LoadingIndicator';
import { AppState } from './reducers';

const VoteListPage = React.lazy(() => import('./components/VoteListPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const VoteComposerPage = React.lazy(() => import('./components/VoteComposerPage'));

export default function App() {
  const location = useLocation();
  const loggedIn = useSelector((state: AppState) => {
    return state.login !== null;
  });

  const { loading, description, error } = useSelector((state: AppState) => state.api, shallowEqual);

  function voteComposerOrLogin() {
    return loggedIn ? (
      <VoteComposerPage />
    ) : (
      <Redirect to={{ pathname: '/login', state: { redirectAfter: location.pathname } }} />
    );
  }

  if (loading) {
    return (
      <Layout>
        <VoteLoadingIndicator title={description} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage msg={error} />
      </Layout>
    );
  }

  return (
    <Layout>
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
    </Layout>
  );
}
