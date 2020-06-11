import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

type LoginPageProps = Readonly<{
  onSuccessfulLogin: () => void;
}>;

type LoginPageLocationState = Readonly<{
  redirectAfter: string;
}>;

export default function LoginPage({ onSuccessfulLogin }: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const location = useLocation<LoginPageLocationState>();

  function login() {
    onSuccessfulLogin();
    const redirectTo =
      location.state && location.state.redirectAfter ? location.state.redirectAfter : '/';
    history.replace(redirectTo);
  }

  function cancel() {
    history.replace('/');
  }

  const emailValid = email.length > 3;
  return (
    <div className="Row VotesRow">
      <div className="Head">
        <h1 className="Title">You need to login to perform that action</h1>
      </div>
      <div className="LoginForm">
        <p>Please login with your E-Mail address</p>
        <input
          type="text"
          placeholder="Enter your email address here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="ButtonBar">
          <button disabled={!emailValid} className="Button" onClick={login}>
            Login
          </button>
          <button className="Button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
