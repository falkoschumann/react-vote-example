import React from 'react';

import { Vote, Choice } from '../types';
import VoteList from './VoteList';
import InactiveVoteComposer from './InactiveVoteComposer';

type VoteControllerProps = Readonly<{
  currentVoteId?: string | null;
  votes: ReadonlyArray<Vote>;
  onRegisterVote?: (vote: Vote, choice: Choice) => void;
  onDismissVote?: () => void;
}>;

export default function VoteController({
  currentVoteId,
  votes,
  onRegisterVote,
  onDismissVote,
}: VoteControllerProps) {
  return (
    <div>
      <VoteList
        allVotes={votes}
        currentVoteId={currentVoteId}
        onRegisterVote={onRegisterVote}
        onDismissVote={onDismissVote}
      />
      <InactiveVoteComposer />
    </div>
  );
}
