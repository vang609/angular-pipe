import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
   load: reducers.LoadState,
   msg: reducers.MessageState
}

export const appReducers: ActionReducerMap<AppState> = {
   load: reducers.loadReducer,
   msg: reducers.messageReducer
};