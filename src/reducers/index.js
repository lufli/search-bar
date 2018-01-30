import { combineReducers } from 'redux';
import windowReducer from './window';
import nodeReducer from './node';
import locationReducer from './location';
import resultReducer from './result';

const rootReducer = combineReducers({
  windowDimensions: windowReducer,
  node: nodeReducer,
  location: locationReducer,
  result: resultReducer
});

export default rootReducer;