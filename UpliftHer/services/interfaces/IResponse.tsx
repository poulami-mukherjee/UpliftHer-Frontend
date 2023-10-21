export interface IResponse<T> {
    isSuccess: boolean;
    data: T | null;
    error: string | undefined;
  }