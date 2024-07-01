export interface IResponse<T = any> {
    status: boolean;
    message: string;
    data: T;
}

export interface IResponseV2<T = any> {
  status: boolean;
  message: string;
  data: T;
}
