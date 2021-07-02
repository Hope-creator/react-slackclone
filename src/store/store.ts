import { ICurrentAllDialogsState } from "./modules/currentAllDialogs/types";
import { IUsersState } from "./modules/users/types";
import { ISearchState } from "./modules/search/types";
import { IConversationsAccessState } from "./modules/conversationsAccess/types";
import { IUserState } from "./modules/user/types";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";
import { IConversationsState } from "./modules/conversations/types";
import { ICurrentConversationState } from "./modules/currentConversation/types";
import { IInfoSideState } from "./modules/infoSide/types";
import { ICurrentUsersState } from "./modules/currentUsers/types";
import { IMessagesAffectState } from "./modules/messagesAffect/types";
import { IMessagesState } from "./modules/messages/types";
import { IConversationMembersState } from "./modules/conversationMembers/types";
import { ISideInfoMembersState } from "./modules/SideInfoMembers/types";
import { ICurrentConversationsState } from "./modules/currentConversations/types";
import { ICurrentDialogState } from "./modules/currentDialog/types";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export interface IRootState {
  user: IUserState;
  users: IUsersState;
  conversations: IConversationsState;
  currentConversation: ICurrentConversationState;
  currentConversations: ICurrentConversationsState;
  infoSide: IInfoSideState;
  currentUsers: ICurrentUsersState;
  currentAllDialogs: ICurrentAllDialogsState;
  currentDialog: ICurrentDialogState;
  messagesAffect: IMessagesAffectState;
  messages: IMessagesState;
  conversationMembers: IConversationMembersState;
  sideInfoMembers: ISideInfoMembersState;
  conversationsAccess: IConversationsAccessState;
  search: ISearchState;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
