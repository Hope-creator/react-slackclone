import { AnyAction, combineReducers } from "redux";
import conversationMembers from "./modules/conversationMembers/conversationMembers";
import conversations from "./modules/conversations/conversations";
import currentConversation from "./modules/currentConversation/currentConversation";
import currentConversations from "./modules/currentConversations/currentConversations";
import infoSide from "./modules/infoSide/infoSide";
import currentUsers from "./modules/currentUsers/currentUsers";
import messages from "./modules/messages/messages";
import messagesAffect from "./modules/messagesAffect/messagesAffect";
import search from "./modules/search/search";
import SideInfoMembers from "./modules/SideInfoMembers/SideInfoMembers";
import user, { logoutUser } from "./modules/user/user";
import conversationsAccess from "./modules/conversationsAccess/conversationsAccess";
import users from "./modules/users/users";
import currentDialog from "./modules/currentDialog/currentDialog";
import currentAllDialogs from "./modules/currentAllDialogs/currentAllDialogs";

export const appReducer = combineReducers({
  user: user,
  users: users,
  currentDialog: currentDialog,
  currentAllDialogs: currentAllDialogs,
  conversations: conversations,
  currentConversation: currentConversation,
  currentConversations: currentConversations,
  infoSide: infoSide,
  currentUsers: currentUsers,
  messagesAffect: messagesAffect,
  messages: messages,
  conversationMembers: conversationMembers,
  sideInfoMembers: SideInfoMembers,
  conversationsAccess: conversationsAccess,
  search: search,
});

export const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === logoutUser.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
