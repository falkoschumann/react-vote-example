import { voteListReducer } from '../VoteListPage';

test('handle START_REQUEST action correctly', () => {
  const oldState = { loading: false, error: null, allVotes: [] };

  const newState = voteListReducer(oldState, { type: 'START_REQUEST' });

  expect(newState).toEqual({ loading: true, error: null, allVotes: [] });
});
