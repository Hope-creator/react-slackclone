export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export interface IResponse<T> {
  status: ResponseStatus;
  data: T;
}

export interface IPaginationData<T> {
  results: T;
  totalCount?: number;
}

export interface IResponsePagination<T> {
  status: ResponseStatus;
  data: IPaginationData<T>;
}
