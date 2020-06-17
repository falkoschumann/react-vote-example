import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Vote, Choice } from '../types';
import { fetchJson, sendJson } from '../backend';
import ErrorMessage from './ErrorMessage';
import VoteController from './VoteController';
import VoteLoadingIndicator from './VoteLoadingIndicator';

type VoteListPageState = Readonly<{
  loading: boolean;
  error: string | null;
  allVotes: ReadonlyArray<Vote>;
}>;

const initialState: VoteListPageState = {
  loading: true,
  error: null,
  allVotes: [],
};

type StartRequestAction = Readonly<{
  type: 'START_REQUEST';
}>;

type LoadVotesFailureAction = Readonly<{
  type: 'LOAD_VOTES_FAILURE';
  error: string;
}>;

type LoadVotesSuccessAction = Readonly<{
  type: 'LOAD_VOTES_SUCCESS';
  votes: ReadonlyArray<Vote>;
}>;

type VoteListPageAction = StartRequestAction | LoadVotesFailureAction | LoadVotesSuccessAction;

export function voteListReducer(
  state: VoteListPageState,
  action: VoteListPageAction
): VoteListPageState {
  switch (action.type) {
    case 'START_REQUEST':
      return { ...state, loading: true };
    case 'LOAD_VOTES_FAILURE':
      return { ...state, loading: false, error: action.error.toString(), allVotes: [] };
    case 'LOAD_VOTES_SUCCESS':
      return { ...state, loading: false, error: null, allVotes: action.votes };
    default:
      return state;
  }
}

type VoteListPageParams = Readonly<{ voteId: string | undefined }>;

export default function VoteListPage() {
  const currentVoteId = useParams<VoteListPageParams>().voteId;
  const history = useHistory();
  const [state, dispatch] = React.useReducer(voteListReducer, initialState);

  React.useEffect(() => {
    loadVotes();
  }, []);

  async function loadVotes() {
    dispatch({ type: 'START_REQUEST' });

    try {
      const votes = await fetchJson('/api/votes?slow');
      dispatch({
        type: 'LOAD_VOTES_SUCCESS',
        votes,
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_VOTES_FAILURE',
        error,
      });
    }
  }

  async function registerVote(vote: Vote, choice: Choice) {
    dispatch({ type: 'START_REQUEST' });
    await sendJson('PUT', `/api/votes/${vote.id}/choices/${choice.id}/vote`);
    loadVotes();
  }

  if (state.loading) {
    return <VoteLoadingIndicator />;
  }

  if (state.error) {
    return <ErrorMessage msg={state.error} onRetry={loadVotes} />;
  }

  function dismissVote() {
    history.push('/');
  }

  return (
    <VoteController
      votes={state.allVotes}
      currentVoteId={currentVoteId}
      onRegisterVote={registerVote}
      onDismissVote={dismissVote}
    />
  );
}
