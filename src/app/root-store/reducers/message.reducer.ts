import { createReducer, on } from '@ngrx/store';
import { setMessage } from '../actions';
import { Message } from '../../shared/models/message.model';

export interface  MessageState {
     message: Message;
}

export const messageInitialState: MessageState = {
    message: null
};

const _messageReducer = createReducer( messageInitialState,

    on( setMessage, (state, { message }) => ({
        ...state,
        message: { ...message }
    })),

);

export function messageReducer( state, action ) {
    return _messageReducer( state, action );
}
