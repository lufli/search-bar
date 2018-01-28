import { UPDATE_WINDOW_DIMENSIONS } from '../actions';

const initialState = {
  width: 1000,
  height: 1000
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_WINDOW_DIMENSIONS:
      return {
        width: action.payload.width,
        height: action.payload.height
      }
    default:
      return state;
  }
}