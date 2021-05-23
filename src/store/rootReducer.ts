import {combineReducers} from 'redux';
import conversations from './modules/conversations/conversations';
import currentConversation from './modules/currentConversation/currentConversation';
import currentInfo from './modules/currentInfo_side/currentInfo';
import currentMembers from './modules/currentMembers/currentMembers';
import user from './modules/user/user';

export const rootReducer = combineReducers({
    user: user,
    conversations: conversations,
    currentConversation: currentConversation,
    currentInfo: currentInfo,
    currentMembers: currentMembers
})