import { ICurrentAllDMState } from './modules/currentAllDM/types';
import { IUsersState } from './modules/users/types';
import { ISearchState } from "./modules/search/types";
import { IConversationsAccessState } from "./modules/conversationsAccess/types";
import { IUserState } from "./modules/user/types";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";
import { IConversationsState } from "./modules/conversations/types";
import { ICurrentConversationState } from "./modules/currentConversation/types";
import { ICurrentInfoState } from "./modules/currentInfo_side/types";
import { ICurrentUsersState } from "./modules/currentUsers/types";
import { IReadMessageState } from "./modules/readMessage/types";
import { IMessagesState } from "./modules/messages/types";
import { IConversationMembersState } from "./modules/conversationMembers/types";
import { ISideInfoMembersState } from "./modules/SideInfoMembers/types";
import { IDialogsState } from "./modules/dialogs/types";
import { ICurrentConversationsState } from "./modules/currentConversations/types";
import { ICurrentDMState } from './modules/currentDM/types';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export interface IRootState {
  user: IUserState;
  users: IUsersState;
  conversations: IConversationsState;
  currentConversation: ICurrentConversationState;
  currentConversations: ICurrentConversationsState;
  currentInfo: ICurrentInfoState;
  currentUsers: ICurrentUsersState;
  currentAllDM: ICurrentAllDMState;
  currentDM: ICurrentDMState;
  readMessage: IReadMessageState;
  messages: IMessagesState;
  conversationMembers: IConversationMembersState;
  sideInfoMembers: ISideInfoMembersState;
  dialogs: IDialogsState;
  conversationsAccess: IConversationsAccessState;
  search: ISearchState;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
