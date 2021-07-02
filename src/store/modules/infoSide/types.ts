import { IConversation } from "../conversations/types";
import { IUser } from "../user/types";

export enum LoadingInfoSideState {
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

export interface IInfoSideState {
  item: IUser | IConversation | undefined;
  type: InfoItemTypeState;
  loadingState: LoadingInfoSideState;
}
