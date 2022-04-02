import * as types from "./types";

const result = (type: any, payload: any) => {
  return {
    type: type,
    payload: payload,
  };
};

export const getHotels = (payload?: any) => result(types.GET_HOTELS, payload);
export const getHotelsSuccess = (payload?: any) => result(types.GET_HOTELS_SUCCESS, payload);
export const getHotelsError = (payload?: any) => result(types.GET_HOTELS_ERROR, payload);

export const clear = (payload?: any) => result(types.CLEAR, payload);

