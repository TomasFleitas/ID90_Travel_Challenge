import { AnyAction, combineReducers, Reducer } from "redux";
import hotels_reducer from "src/app/pages/hotels/redux/reducer";
import session_reducer from "../app/pages/login/redux/reducer";

export interface IAppState {
  session: any,
  hotels: any
}

const STATE_NAME = "state";

const INITIAL_STATE = {} as IAppState;

// Get Value from LocalStorage variable if it exists
export const LoadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE_NAME);

    if (serializedState === null) return INITIAL_STATE;

    return JSON.parse(serializedState);

  } catch (err) {
    return undefined;
  }
};

//Middleware to persist the state to localStorage after any action dispatched
export const PersistMiddleware = ({ getState }: any) => (next: any) => async (action: any) => {
  setTimeout(() => {
    localStorage.setItem(STATE_NAME, JSON.stringify(getState()));
  }, 0);
  next(action);
}

export const PersistedState = LoadState();

//Combine all reducers of the system
const createRootReducer = (): Reducer<IAppState, AnyAction> => combineReducers<IAppState>({ session: session_reducer, hotels: hotels_reducer });
export default createRootReducer;
