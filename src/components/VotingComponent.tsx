import React from 'react';

import { Vote } from '../types';

type VotingComponentProps = Readonly<{
  vote: Vote;
}>;

export default function VotingComponent({ vote }: VotingComponentProps) {
  const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);

  return (
    <div className="Row VotingRow Spacer">
      <div className="Head">
        <h1 className="Title">
          {vote.title}
          <div className="Badge">{totalVotes} Votes</div>
        </h1>
        <div className="Description Emphasis">{vote.description}</div>
      </div>
    </div>
  );
}