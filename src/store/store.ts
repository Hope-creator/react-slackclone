import { IUserState } from "./modules/user/types";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";
import { IConversationsState } from "./modules/conversations/types";
import { ICurrentConversationState } from "./modules/currentConversation/types";
import { ICurrentInfoState } from "./modules/currentInfo_side/types";
import { ICurrentMembersState } from "./modules/currentMembers/types";
import { IReadMessageState } from "./modules/readMessage/types";
import { IMessagesState } from "./modules/messages/types";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export interface IRootState {
  user: IUserState;
  conversations: IConversationsState;
  currentConversation: ICurrentConversationState;
  currentInfo: ICurrentInfoState;
  currentMembers: ICurrentMembersState;
  readMessage: IReadMessageState;
  messages: IMessagesState;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
