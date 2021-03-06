import React from 'react';

import { Vote, Choice } from '../types';
import ChoiceBar from './ChoiceBar';

type VotingComponentProps = Readonly<{
  vote: Vote;
  onRegisterChoice?: (vote: Vote, choice: Choice) => void;
  onDismissVote?: () => void;
}>;

export default function VotingComponent({
  vote,
  onRegisterChoice,
  onDismissVote,
}: VotingComponentProps) {
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
      <div>
        {vote.choices.map((choice) => (
          <ChoiceBar
            key={choice.id}
            title={choice.title}
            percent={choice.count * (100 / totalVotes)}
            count={choice.count}
            onClickHandler={() => onRegisterChoice?.(vote, choice)}
          />
        ))}
      </div>
      <div className="ButtonBar">
        <div className="Button" onClick={onDismissVote}>
          Vote later
        </div>
      </div>
    </div>
  );
}
