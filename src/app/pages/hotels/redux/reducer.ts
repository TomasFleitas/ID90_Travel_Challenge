

import { default_error_message } from "src/app/utility/utilities";
import createReducer from "src/store/createReducer";
import * as types from "./types";

const initialState = {
  hotels: [],
  loading_hotels: false,
  errorMessage: undefined
};


const hotels_reducer = createReducer(initialState, {
  [types.GET_HOTELS](state: any, action: any) {
    return {
      ...state,
      hotels: [],
      loading_hotels: true,
    };
  },
  [types.GET_HOTELS_SUCCESS](state: any, action: any) {
    return {
      ...state,
      loading_hotels: false,
      hotels: action.payload.hotels || [],
      total: action.payload.meta.total_pages
    };
  },
  [types.GET_HOTELS_ERROR](state: any, action: any) {
    return {
      ...state,
      loading_hotels: false,
      errorMessage: action.payload || default_error_message
    };
  },

  [types.CLEAR](state: any, action: any) {
    return {
      ...state,
      loading_hotels: false,
      errorMessage: undefined
    };
  },
});

export default hotels_reducer;
