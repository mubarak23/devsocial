import { setAlert, REMOVE_ALERT } from '../actions/alert';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case setAlert:
      return [...state, payload];
    //case REMOVE_ALERT:
    //return state.filter(alert => alert.id === payload);
    default:
      return state;
  }
}
