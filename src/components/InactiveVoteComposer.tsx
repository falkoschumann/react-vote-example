import React from 'react';

type InactiveVoteComposer = Readonly<{
  onActivate: () => void;
}>;

export default function InactiveVoteComposer({ onActivate }: InactiveVoteComposer) {
  return (
    <div className="Row VotesRow Spacer" onClick={onActivate}>
      <h1 className="Title">
        <span className="Emphasis">
          What do <b>you</b> want to know ?
        </span>
        <div className="Badge">Add Voting</div>
      </h1>
      <p>Click her to leave your own question.</p>
    </div>
  );
}
