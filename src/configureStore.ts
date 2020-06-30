import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
  : compose;

export default function configureStore() {
  const middleware = applyMiddleware(
    thunk
  );
  const enhancer = composeEnhancers(middleware);

  return createStore(reducer, enhancer);
}
