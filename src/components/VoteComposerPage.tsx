import React from 'react';
import { useHistory } from 'react-router-dom';
import { Vote } from '../types';
import { sendJson } from '../backend';
import VoteComposer from './VoteComposer';

export default function VoteComposerPage() {
  const history = useHistory();

  async function addVote(vote: Vote) {
    await sendJson('POST', '/api/votes', vote);
    closeVoteComposer();
  }

  function closeVoteComposer() {
    history.push('/');
  }

  return <VoteComposer onDeactivate={closeVoteComposer} onSave={addVote} />;
}
