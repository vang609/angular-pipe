import { createAction, props } from '@ngrx/store';
import { Message } from '../../shared/models/message.model';

export const setMessage = createAction(
    '[Message] Set Message',
    props< { message: Message } >()
);