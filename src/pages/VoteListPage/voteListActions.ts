import { ThunkAction } from 'redux-thunk';

import { Vote, Choice } from '../../types';
import { AppState } from '../../rootReducer';
import {
  ApiAction,
  apiRequestStart,
  apiRequestSuccess,
  apiRequestFailure,
} from '../../api/actions';
import { fetchJson, sendJson } from '../../api/backend';

function setVotes(votes: Vote[]) {
  return {
    type: 'SET_VOTES',
    votes,
  } as const;
}

export type SetVotesAction = ReturnType<typeof setVotes>;

function updateVote(vote: Vote) {
  return {
    type: 'UPDATE_VOTE',
    vote,
  } as const;
}

export type UpdateVoteAction = ReturnType<typeof updateVote>;

export function loadVotesFromServer(): ThunkAction<
  void,
  AppState,
  void,
  ApiAction | SetVotesAction
> {
  return (dispatch, getState) => {
    if (getState().votes.length > 0) {
      return;
    }
    dispatch(apiRequestStart('Loading Votes'));
    fetchJson('/api/votes').then(
      (votes) => {
        dispatch(setVotes(votes));
        dispatch(apiRequestSuccess());
      },
      (error) => dispatch(apiRequestFailure(error))
    );
  };
}

export function registerVoteOnServer(
  vote: Vote,
  choice: Choice
): ThunkAction<void, AppState, void, ApiAction | UpdateVoteAction> {
  return (dispatch) => {
    dispatch(apiRequestStart('Registering your Choice'));

    sendJson('put', `/api/votes/${vote.id}/choices/${choice.id}/vote`).then(
      (vote) => {
        dispatch(updateVote(vote));
        dispatch(apiRequestSuccess());
      },
      (error) => dispatch(apiRequestFailure(error))
    );
  };
}
