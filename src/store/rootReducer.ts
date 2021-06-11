import { combineReducers } from "redux";
import conversationMembers from "./modules/conversationMembers/conversationMembers";
import conversations from "./modules/conversations/conversations";
import currentConversation from "./modules/currentConversation/currentConversation";
import currentDialog from "./modules/currentDialog/currentDialog";
import currentInfo from "./modules/currentInfo_side/currentInfo";
import currentMembers from "./modules/currentMembers/currentMembers";
import dialogs from "./modules/dialogs/dialogs";
import messages from "./modules/messages/messages";
import readMessage from "./modules/readMessage/readMessage";
import SideInfoMembers from "./modules/SideInfoMembers/SideInfoMembers";
import user from "./modules/user/user";

export const rootReducer = combineReducers({
  user: user,
  conversations: conversations,
  currentConversation: currentConversation,
  currentInfo: currentInfo,
  currentMembers: currentMembers,
  currentDialog: currentDialog,
  readMessage: readMessage,
  messages: messages,
  conversationMembers: conversationMembers,
  sideInfoMembers: SideInfoMembers,
  dialogs: dialogs,
});
