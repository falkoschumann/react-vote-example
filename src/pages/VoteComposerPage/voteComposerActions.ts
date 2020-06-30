import { Vote, UnsavedVote } from '../../types';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../rootReducer';
import {
  ApiAction,
  apiRequestStart,
  apiRequestSuccess,
  apiRequestFailure,
} from '../../api/actions';
import { sendJson } from '../../api/backend';

function addVote(newVote: Vote) {
  return {
    type: 'ADD_VOTE',
    newVote,
  } as const;
}

export type AddVoteAction = ReturnType<typeof addVote>;

export function saveVoteOnServer(
  newVote: UnsavedVote
): ThunkAction<void, AppState, void, ApiAction | AddVoteAction> {
  return (dispatch) => {
    dispatch(apiRequestStart('Saving your Vote'));
    sendJson('post', '/api/votes', newVote).then(
      (savedVote) => {
        dispatch(addVote(savedVote));
        dispatch(apiRequestSuccess());
      },
      (error) => dispatch(apiRequestFailure(error))
    );
  };
}
