import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { UnsavedVote } from '../types';
import { saveVoteOnServer } from '../actions';
import VoteComposer from './VoteComposer';

export default function VoteComposerPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  async function addVote(vote: UnsavedVote) {
    await dispatch(saveVoteOnServer(vote));
    closeVoteComposer();
  }

  function closeVoteComposer() {
    history.push('/');
  }

  return <VoteComposer onDeactivate={closeVoteComposer} onSave={addVote} />;
}
