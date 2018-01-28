export const UPDATE_WINDOW_DIMENSIONS = 'updata_window_dimensions';
export const UPDATE_LOCATION = 'update_location';
export const UPDATE_VIEWPORT = 'update_viewport';
export const SHOW_CARD = 'show_card';
const ROOT_URL = 'https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/';
const TOKEN = 'pk.eyJ1IjoibGx1ZmFuIiwiYSI6ImNqY3h0dGpxeTA2c2UzM3A3eXF0cW1xNGoifQ.AiV1hlzIXF2F6AfXUzqDyw';

// window
export function updateWindowDimensions() {
  return {
    type: UPDATE_WINDOW_DIMENSIONS,
    payload: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

// location
export function updateLocation(location, name, locality) {
  return {
    type: UPDATE_LOCATION,
    payload: {
      location,
      name,
      locality
    }
  }
}

export function updateViewport(viewport) {
  return {
    type: UPDATE_VIEWPORT,
    payload: viewport
  }
}

export function showCard(showCard) {
  return {
    type: SHOW_CARD,
    payload: showCard
  }
}

// search
export function search(term) {
  return (dispatch) => {
    fetch(ROOT_URL+encodeURIComponent(term)+'.json?access_token='+TOKEN).then(res => res.json())
    .then(res => {
      const { center, text, place_name } = res.features[0];
      dispatch(updateLocation(center, text, place_name));
    })
  }
}