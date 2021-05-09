import {combineReducers} from 'redux';
import conversations from './modules/conversations/conversations';
import messages from './modules/messages/messages';
import user from './modules/user/user';

export const rootReducer = combineReducers({
    user: user,
    conversations: conversations,
    messages: messages
})