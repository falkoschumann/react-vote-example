import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Vote, Choice } from '../../types';
import * as actions from './voteListActions';
import { AppState } from '../../rootReducer';
import VoteList from './VoteList';
import InactiveVoteComposer from './InactiveVoteComposer';

type VoteListPageParams = Readonly<{ voteId: string | undefined }>;

export default function VoteListPage() {
  const dispatch = useDispatch();
  const allVotes = useSelector((state: AppState) => state.votes);
  const currentVoteId = useParams<VoteListPageParams>().voteId;
  const history = useHistory();

  React.useEffect(() => {
    dispatch(actions.loadVotesFromServer());
  }, [dispatch]);

  function registerVote(vote: Vote, choice: Choice) {
    dispatch(actions.registerVoteOnServer(vote, choice));
  }

  function dismissVote() {
    history.push('/');
  }

  return (
    <div>
      <VoteList
        allVotes={allVotes}
        currentVoteId={currentVoteId}
        onRegisterVote={registerVote}
        onDismissVote={dismissVote}
      />
      <InactiveVoteComposer />
    </div>
  );
}
