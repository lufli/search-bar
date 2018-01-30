import { UPDATE_RESULT } from "../actions/index";

export default function(state=[], action) {
  switch(action.type) {
    case UPDATE_RESULT:
      return action.payload
    default:
      return state
  }
}