import React from 'react';

import { Vote } from '../types';
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

  if (allVotes == null) {
    return <VoteLoadingIndicator />;
  }

  return <VoteController votes={allVotes} />;
}
