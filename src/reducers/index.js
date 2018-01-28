import { combineReducers } from 'redux';
import windowReducer from './window';
import nodeReducer from './node';
import locationReducer from './location';

const rootReducer = combineReducers({
  windowDimensions: windowReducer,
  node: nodeReducer,
  location: locationReducer
});

export default rootReducer;