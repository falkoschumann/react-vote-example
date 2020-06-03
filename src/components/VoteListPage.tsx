import React from 'react';

import { Vote, Choice } from '../types';
import { fetchJson, sendJson } from '../backend';
import VoteLoadingIndicator from './VoteLoadingIndicator';
import VoteController from './VoteController';

export default function VoteListPage() {
  const [allVotes, setAllVotes] = React.useState<ReadonlyArray<Vote> | null>(null);

  async function loadVotes() {
    const votes = await fetchJson('/api/votes');
    setAllVotes(votes);
  }

  React.useEffect(() => {
    loadVotes();
  }, []);

  async function registerVote(vote: Vote, choice: Choice) {
    await sendJson('PUT', `/api/votes/${vote.id}/choices/${choice.id}/vote`);
    loadVotes();
  }

  async function addVote(vote: Vote) {
    const newVote = await sendJson('POST', '/api/votes', vote);
    setAllVotes((currentVotes) => (currentVotes == null ? null : [...currentVotes, newVote]));
  }

  if (allVotes == null) {
    return <VoteLoadingIndicator />;
  }

  return <VoteController votes={allVotes} onRegisterVote={registerVote} onSaveVote={addVote} />;
}
