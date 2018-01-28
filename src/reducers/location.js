import { UPDATE_LOCATION, UPDATE_VIEWPORT, SHOW_CARD } from "../actions/index";

const initialState = {
  longitude: -122.4376,
  latitude: 37.7577,
  name: 'San Francisco',
  locality: 'San Francisco',
  viewport: {
    longitude: -122.4376,
    latitude: 37.7577,
    zoom: 8
  },
  showCard: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        longitude: action.payload.location[0],
        latitude: action.payload.location[1],
        name: action.payload.name,
        locality: action.payload.locality,
        viewport: {
          longitude: action.payload.location[0],
          latitude: action.payload.location[1],
          zoom: 15
        }
      }
    case UPDATE_VIEWPORT:
      return {
        ...state,
        viewport: action.payload
      }
    case SHOW_CARD:
      return {
        ...state,
        showCard: action.payload
      }
    default:
      return state
  }
}