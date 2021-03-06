import React from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from './LoginProvider';

export default function InactiveVoteComposer() {
  const { loggedIn } = useLogin();

  const loginHint = loggedIn
    ? "(You're already logged in)"
    : '(You need to be logged in to add Votings)';

  return (
    <div className="Row VotesRow Spacer">
      <Link to="/compose">
        <h1 className="Title">
          <span className="Emphasis">
            What do <b>you</b> want to know ?
          </span>
          <div className="Badge">Add Voting</div>
        </h1>
        <p>Click her to leave your own question. {loginHint}</p>
      </Link>
    </div>
  );
}
