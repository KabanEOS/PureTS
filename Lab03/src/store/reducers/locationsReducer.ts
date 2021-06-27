import { LocationState, AddLocationAction } from "../types";

const initialState: LocationState = {
  locations: [],
}


export const locationReducer = (state = initialState, action: AddLocationAction): LocationState => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [...state.locations, action.payload]
      }
    default:
      return state;
  }
}