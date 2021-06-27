export type Action = { type: "ADD_LOCATION", payload: string }

export const addLocation = (location: string): Action => ({
  type: "ADD_LOCATION",
  payload: location
})