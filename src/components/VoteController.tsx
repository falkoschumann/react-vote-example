import React from 'react';

import { Vote, Choice } from '../types';
import VoteList from './VoteList';
import InactiveVoteComposer from './InactiveVoteComposer';
import VoteComposer from './VoteComposer';

type VoteControllerProps = Readonly<{
  currentVoteId: string;
  votes: ReadonlyArray<Vote>;
  onSaveVote: (vote: Vote) => void;
  onRegisterVote: (vote: Vote, choice: Choice) => void;
  onDismissVote: () => void;
}>;

export default function VoteController({
  currentVoteId,
  votes,
  onSaveVote,
  onRegisterVote,
  onDismissVote,
}: VoteControllerProps) {
  const [voteComposerActive, setVoteComposerActive] = React.useState(false);

  function closeVoteComposer() {
    setVoteComposerActive(false);
  }

  function openVoteComposer() {
    setVoteComposerActive(true);
  }

  function saveVote(vote: Vote) {
    closeVoteComposer();
    onSaveVote(vote);
  }

  return (
    <div>
      <VoteList
        allVotes={votes}
        currentVoteId={currentVoteId}
        onRegisterVote={onRegisterVote}
        onDismissVote={onDismissVote}
      />
      {voteComposerActive ? (
        <VoteComposer onSave={saveVote} onDeactivate={closeVoteComposer} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
