import * as types from "./types";

const result = (type: any, payload: any) => {
  return {
    type: type,
    payload: payload,
  };
};

export const login = (payload?: any) => result(types.LOGIN, payload);
export const loginSuccess = (payload?: any) => result(types.LOGIN_SUCCESS, payload);
export const loginError = (payload?: any) => result(types.LOGIN_ERROR, payload);

export const getAirlines = (payload?: any) => result(types.GET_AIRLINES, payload);
export const getAirlinesSuccess = (payload?: any) => result(types.GET_AIRLINES_SUCCESS, payload);
export const getAirlinesError = (payload?: any) => result(types.GET_AIRLINES_ERROR, payload);

export const logout = (payload?: any) => result(types.LOGOUT, payload);

export const clear = (payload?: any) => result(types.CLEAR, payload);

