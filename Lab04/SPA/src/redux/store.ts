/* eslint-disable */
import { applyMiddleware, CombinedState, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { ActionType } from './action.types';
import { RootState } from './models/root.state';
import rootReducer from './root.reducer';

const middlewares: Middleware[] = [thunkMiddleware];

// #!if NODE_ENV === 'development'
import { createLogger } from 'redux-logger';
if (process.env.NODE_ENV === 'development') {
  // middlewares.push(createLogger());
}
// #!endif

const store: Store<CombinedState<RootState>, ActionType>
 = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;

