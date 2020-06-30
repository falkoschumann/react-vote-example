import { LoginAction } from './actions';

type LoginState = string | null;

export default function loginReducer(state: LoginState = null, action: LoginAction): LoginState {
  switch (action.type) {
    case 'LOGIN':
      return action.username;
    default:
      return state;
  }
}
