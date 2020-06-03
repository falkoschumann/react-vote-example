import React from 'react';

import { Vote, Choice } from '../types';
import VoteList from './VoteList';

type VoteControllerProps = Readonly<{
  initialVotes: ReadonlyArray<Vote>;
}>;

export default function VoteController({ initialVotes }: VoteControllerProps) {
  const [allVotes, setAllVotes] = React.useState(initialVotes);
  const [currentVoteId, setCurrentVoteId] = React.useState<string | null>(null);

  function setCurrentVote(vote: Vote) {
    setCurrentVoteId(vote.id);
  }

  function unsetCurrentVote() {
    setCurrentVoteId(null);
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

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onSelectVote={setCurrentVote}
        onDismissVote={unsetCurrentVote}
        onRegisterVote={registerVote}
      />
    </div>
  );
}
