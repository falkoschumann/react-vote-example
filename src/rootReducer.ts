import { combineReducers } from 'redux';

import { apiReducer } from './api/reducers';
import { loginReducer } from './pages/LoginPage';
import { votesReducer } from './pages/VoteListPage';

const rootReducer = combineReducers({
  login: loginReducer,
  votes: votesReducer,
  api: apiReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
