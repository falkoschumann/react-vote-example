import React from 'react';

import { Vote, Choice } from '../types';
import { fetchJson, sendJson } from '../backend';
import VoteLoadingIndicator from './VoteLoadingIndicator';
import VoteController from './VoteController';
import ErrorMessage from './ErrorMessage';

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

type AddVoteSuccessAction = Readonly<{
  type: 'ADD_VOTE_SUCCESS';
  newVote: Vote;
}>;

type VoteListPageAction =
  | StartRequestAction
  | LoadVotesFailureAction
  | LoadVotesSuccessAction
  | AddVoteSuccessAction;

export function voteListReducer(
  state: VoteListPageState,
  action: VoteListPageAction
): VoteListPageState {
  switch (action.type) {
    case 'START_REQUEST':
      return { ...state, loading: true };
    case 'LOAD_VOTES_FAILURE':
      return { ...state, loading: false, error: action.error.toString() };
    case 'LOAD_VOTES_SUCCESS':
      return { ...state, loading: false, allVotes: action.votes };
    case 'ADD_VOTE_SUCCESS':
      const newVotes = [...state.allVotes, action.newVote];
      return { ...state, loading: false, allVotes: newVotes };
    default:
      return state;
  }
}

export default function VoteListPage() {
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

  async function addVote(vote: Vote) {
    dispatch({ type: 'START_REQUEST' });
    const newVote = await sendJson('POST', '/api/votes', vote);
    dispatch({
      type: 'ADD_VOTE_SUCCESS',
      newVote,
    });
  }

  if (state.loading) {
    return <VoteLoadingIndicator />;
  }

  if (state.error) {
    return <ErrorMessage msg={state.error} onRetry={loadVotes} />;
  }

  return (
    <VoteController votes={state.allVotes} onRegisterVote={registerVote} onSaveVote={addVote} />
  );
}
