export enum ResponseStatus {
    SUCCESS = "success",
    ERROR = "error"
}

export interface IResponse<T> {
    status: ResponseStatus,
    data: T,
}