import React from 'react';

import { Vote, Choice } from '../types';
import VoteList from './VoteList';
import InactiveVoteComposer from './InactiveVoteComposer';
import VoteComposer from './VoteComposer';

type VoteControllerProps = Readonly<{
  votes: ReadonlyArray<Vote>;
  onSaveVote: (vote: Vote) => void;
  onRegisterVote: (vote: Vote, choice: Choice) => void;
}>;

export default function VoteController({ votes, onSaveVote, onRegisterVote }: VoteControllerProps) {
  const [currentVoteId, setCurrentVoteId] = React.useState<string | null>(null);
  const [voteComposerActive, setVoteComposerActive] = React.useState(false);

  function setCurrentVote(vote: Vote) {
    closeVoteComposer();
    setCurrentVoteId(vote.id!);
  }

  function unsetCurrentVote() {
    setCurrentVoteId(null);
  }

  function openVoteComposer() {
    unsetCurrentVote();
    setVoteComposerActive(true);
  }

  function closeVoteComposer() {
    setVoteComposerActive(false);
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
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={onRegisterVote}
      />
      {voteComposerActive ? (
        <VoteComposer onSave={saveVote} onDeactivate={closeVoteComposer} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
