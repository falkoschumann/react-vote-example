import React from 'react';

import { Vote } from '../types';

type VoteSummaryProps = Readonly<{
  vote: Vote;
  onActive: (vote: Vote) => void;
}>;

export default function VoteSummary({ vote, onActive }: VoteSummaryProps) {
  const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);

  function handleClick() {
    onActive(vote);
  }

  return (
    <div onClick={handleClick} className="Row VotesRow Selectable">
      <h1 className="Title">
        {vote.title}
        <div className="Badge">{totalVotes}</div>
      </h1>
      <p className="Emphasis">{vote.description}</p>
    </div>
  );
}
