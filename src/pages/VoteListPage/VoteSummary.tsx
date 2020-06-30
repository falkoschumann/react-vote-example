import React from 'react';
import { Link } from 'react-router-dom';

import { Vote } from '../../types';

type VoteSummaryProps = Readonly<{
  vote: Vote;
}>;

export default function VoteSummary({ vote }: VoteSummaryProps) {
  const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);

  return (
    <div className="Row VotesRow Selectable">
      <Link to={`/votes/${vote.id!}`}>
        <h1 className="Title">
          {vote.title}
          <div className="Badge">{totalVotes}</div>
        </h1>
        <p className="Emphasis">{vote.description}</p>
      </Link>
    </div>
  );
}
