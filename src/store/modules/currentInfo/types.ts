import { IConversation } from "../conversations/types";
import { IUser } from "../user/types";

export enum LoadingCurrentInfoState {
  LOADED = "LOADED",
  ERROR = "ERROR",
  LOADING = "LOADING",
  NEVER = "NEVER",
}

export enum InfoItemTypeState {
  NONE = "NONE",
  CHANNEL = "CHANNEL",
  PROFILE = "PROFILE",
}

export interface ICurrentInfoState {
  item: IUser | IConversation | undefined;
  type: InfoItemTypeState,
  loadingState: LoadingCurrentInfoState;
}
