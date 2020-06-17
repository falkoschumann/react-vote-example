import { voteListReducer } from '../VoteListPage';

test('handle START_REQUEST action', () => {
  const oldState = {};
  const newState = voteListReducer(oldState, { type: 'START_REQUEST' });
  expect(newState).toEqual({
    loading: true,
  });
});

test('handle LOAD_VOTES_FAILURE action', () => {
  const oldState = { allVotes: [1, 2, 3], loading: true };
  const newState = voteListReducer(oldState, {
    type: 'LOAD_VOTES_FAILURE',
    error: 'Some thing failed',
  });
  expect(newState).toEqual({
    loading: false,
    error: 'Some thing failed',
    allVotes: [],
  });
});

test('handle LOAD_VOTES_SUCCESS', () => {
  const oldState = { allVotes: [1, 2, 3], loading: true };
  const newState = voteListReducer(oldState, {
    type: 'LOAD_VOTES_SUCCESS',
    votes: [4, 5, 6],
  });
  expect(newState).toEqual({
    loading: false,
    error: null,
    allVotes: [4, 5, 6],
  });
});
