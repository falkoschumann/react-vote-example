import { ApiRequestFailureAction, ApiRequestStartAction, ApiRequestSuccessAction } from './actions';

type ApiState = {
  loading: boolean;
  description: string | null;
  error: string | null;
};

const intialApiState: ApiState = {
  loading: false,
  description: null,
  error: null,
};

export function apiReducer(
  state: ApiState = intialApiState,
  action: ApiRequestStartAction | ApiRequestFailureAction | ApiRequestSuccessAction
) {
  switch (action.type) {
    case 'API_REQUEST_START':
      return {
        description: action.description,
        loading: true,
        error: null,
      };
    case 'API_REQUEST_SUCCESS':
      return { ...state, loading: false, error: null };
    case 'API_REQUEST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error.toString(),
      };
    default:
  }

  return state;
}
