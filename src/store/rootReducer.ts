import { combineReducers } from "redux";
import conversationMembers from "./modules/conversationMembers/conversationMembers";
import conversations from "./modules/conversations/conversations";
import currentConversation from "./modules/currentConversation/currentConversation";
import currentConversations from "./modules/currentConversations/currentConversations";
import currentInfo from "./modules/currentInfo_side/currentInfo";
import currentUsers from "./modules/currentUsers/currentUsers";
import dialogs from "./modules/dialogs/dialogs";
import messages from "./modules/messages/messages";
import readMessage from "./modules/readMessage/readMessage";
import search from "./modules/search/search";
import SideInfoMembers from "./modules/SideInfoMembers/SideInfoMembers";
import user from "./modules/user/user";
import conversationsAccess from "./modules/conversationsAccess/conversationsAccess";
import users from "./modules/users/users";
import currentDM from "./modules/currentDM/currentDM";
import currentAllDM from "./modules/currentAllDM/currentAllDM";

export const rootReducer = combineReducers({
  user: user,
  users: users,
  currentDM: currentDM,
  currentAllDM: currentAllDM,
  conversations: conversations,
  currentConversation: currentConversation,
  currentConversations: currentConversations,
  currentInfo: currentInfo,
  currentUsers: currentUsers,
  readMessage: readMessage,
  messages: messages,
  conversationMembers: conversationMembers,
  sideInfoMembers: SideInfoMembers,
  dialogs: dialogs,
  conversationsAccess: conversationsAccess,
  search: search,
});
