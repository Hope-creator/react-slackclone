import { combineReducers } from "redux";
import conversationMembers from "./modules/conversationMembers/conversationMembers";
import conversations from "./modules/conversations/conversations";
import currentConversation from "./modules/currentConversation/currentConversation";
import currentConversations from "./modules/currentConversations/currentConversations";
import currentDialog from "./modules/currentDialog/currentDialog";
import currentDialogs from "./modules/currentDialogs/currentDialogs";
import currentInfo from "./modules/currentInfo_side/currentInfo";
import currentMembers from "./modules/currentMembers/currentMembers";
import dialogs from "./modules/dialogs/dialogs";
import joinConversations from "./modules/joinConversations/joinConversations";
import messages from "./modules/messages/messages";
import readMessage from "./modules/readMessage/readMessage";
import search from "./modules/search/search";
import SideInfoMembers from "./modules/SideInfoMembers/SideInfoMembers";
import user from "./modules/user/user";

export const rootReducer = combineReducers({
  user: user,
  conversations: conversations,
  currentConversation: currentConversation,
  currentConversations: currentConversations,
  currentInfo: currentInfo,
  currentMembers: currentMembers,
  currentDialog: currentDialog,
  currentDialogs: currentDialogs,
  readMessage: readMessage,
  messages: messages,
  conversationMembers: conversationMembers,
  sideInfoMembers: SideInfoMembers,
  dialogs: dialogs,
  joinConversations: joinConversations,
  search: search,
});
