import {combineReducers} from 'redux';
import conversations from './modules/conversations/conversations';
import currentConversation from './modules/currentConversation/currentConversation';
import currentInfo from './modules/currentInfo/currentInfo';
import user from './modules/user/user';

export const rootReducer = combineReducers({
    user: user,
    conversations: conversations,
    currentConversation: currentConversation,
    currentInfo: currentInfo
})