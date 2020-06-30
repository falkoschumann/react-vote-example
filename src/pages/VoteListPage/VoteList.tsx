import React from 'react';

import { Vote, Choice } from '../../types';
import VotingComponent from './VotingComponent';
import VoteSummary from './VoteSummary';

type VoteListProps = Readonly<{
  allVotes: ReadonlyArray<Vote>;
  currentVoteId?: string | null;
  onRegisterVote?: (vote: Vote, choice: Choice) => void;
  onDismissVote?: () => void;
}>;

export default function VoteList({
  allVotes,
  currentVoteId,
  onRegisterVote,
  onDismissVote,
}: VoteListProps) {
  return (
    <div>
      {allVotes.map((vote) =>
        vote.id === currentVoteId ? (
          <VotingComponent
            key={vote.id}
            vote={vote}
            onDismissVote={onDismissVote}
            onRegisterChoice={onRegisterVote}
          />
        ) : (
          <VoteSummary key={vote.id} vote={vote} />
        )
      )}
    </div>
  );
}
