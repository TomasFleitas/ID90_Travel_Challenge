

import { default_error_message } from "src/app/utility/utilities";
import { AerolineasI, CurrentUserI } from "src/interfaces/session.interface";
import createReducer from "src/store/createReducer";
import * as types from "./types";

export interface SessionReducerI {
  currentUser?: CurrentUserI,
  airlines: AerolineasI[],
  loading_airline: boolean,
  loading: boolean,
  remember: boolean,
  errorMessage?: string
}

const initialState: SessionReducerI = {
  currentUser: undefined,
  airlines: [],
  loading_airline: false,
  loading: false,
  remember: false,
  errorMessage: undefined
};


const session_reducer = createReducer(initialState, {
  [types.LOGIN](state: any, action: any) {
    return {
      ...state,
      loading: true,
    };
  },
  [types.LOGIN_SUCCESS](state: any, action: any) {
    if (!action.payload.remember) sessionStorage.setItem("remember", "1");
    return {
      ...state,
      loading: false,
      currentUser: action.payload.member,
      remember: action.payload.remember
    };
  },
  [types.LOGIN_ERROR](state: any, action: any) {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload || default_error_message
    };
  },
  /* ----- */
  [types.GET_AIRLINES](state: any, action: any) {
    return {
      ...state,
      loading_airline: true,
    };
  },
  [types.GET_AIRLINES_SUCCESS](state: any, action: any) {
    return {
      ...state,
      loading_airline: false,
      airlines: action.payload || []
    };
  },
  [types.GET_AIRLINES_ERROR](state: any, action: any) {
    return {
      ...state,
      loading_airline: false,
      errorMessage: action.payload || default_error_message
    };
  },
  /* ----- */
  [types.CLEAR](state: any, action: any) {
    return {
      ...state,
      loading: false,
      loading_airline: false,
      errorMessage: undefined
    };
  },
  /* ----- */
  [types.LOGOUT](state: any, action: any) {
    sessionStorage.removeItem("remember");
    return {
      ...state,
      currentUser: undefined,
      loading_airline: false,
      loading: false,
      remember: false
    };
  },
});

export default session_reducer;
