import { combineReducers } from "redux";
import conversations from "./modules/conversations/conversations";
import currentConversation from "./modules/currentConversation/currentConversation";
import currentInfo from "./modules/currentInfo_side/currentInfo";
import currentMembers from "./modules/currentMembers/currentMembers";
import messages from "./modules/messages/messages";
import readMessage from "./modules/readMessage/readMessage";
import user from "./modules/user/user";

export const rootReducer = combineReducers({
  user: user,
  conversations: conversations,
  currentConversation: currentConversation,
  currentInfo: currentInfo,
  currentMembers: currentMembers,
  readMessage: readMessage,
  messages: messages,
});
