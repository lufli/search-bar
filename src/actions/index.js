export const UPDATE_WINDOW_DIMENSIONS = 'updata_window_dimensions';
export const UPDATE_LOCATION = 'update_location';
export const UPDATE_VIEWPORT = 'update_viewport';

export function updateWindowDimensions() {
  return {
    type: UPDATE_WINDOW_DIMENSIONS,
    payload: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

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