import React from 'react';

import { Vote, Choice } from '../types';
import VoteList from './VoteList';
import InactiveVoteComposer from './InactiveVoteComposer';
import VoteComposer from './VoteComposer';

type VoteControllerProps = Readonly<{
  votes: ReadonlyArray<Vote>;
}>;

export default function VoteController({ votes }: VoteControllerProps) {
  const [allVotes, setAllVotes] = React.useState(votes);
  const [currentVoteId, setCurrentVoteId] = React.useState<string | null>(null);
  const [voteComposerActive, setVoteComposerActive] = React.useState(false);

  function setCurrentVote(vote: Vote) {
    closeVoteComposer();
    setCurrentVoteId(vote.id);
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

  function registerVote(vote: Vote, choice: Choice) {
    const newVotes = allVotes.map((v) =>
      v.id !== vote.id
        ? v
        : {
            ...vote,
            choices: vote.choices.map((c) =>
              c.id !== choice.id ? c : { ...c, count: c.count + 1 }
            ),
          }
    );
    setAllVotes(newVotes);
  }

  function addVote(vote: Vote) {
    setAllVotes([...allVotes, vote]);
    closeVoteComposer();
  }

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={registerVote}
      />
      {voteComposerActive ? (
        <VoteComposer onSave={addVote} onDeactivate={closeVoteComposer} />
      ) : (
        <InactiveVoteComposer onActivate={openVoteComposer} />
      )}
    </div>
  );
}
