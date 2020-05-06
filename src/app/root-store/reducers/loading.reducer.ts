import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from '../actions';

export interface LoadState {
    isLoading: boolean;
}

export const initialState: LoadState = {
   isLoading: false,
};

const _loadReducer = createReducer(initialState,

    on( isLoading,   state => ({ ...state, isLoading: true  })),
    on( stopLoading, state => ({ ...state, isLoading: false })),

);

export function loadReducer( state, action) {
    return _loadReducer(state, action);
}