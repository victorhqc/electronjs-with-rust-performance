export type AsyncStatus = 'idle' | 'loading' | 'done' | 'error';

export interface ErrorLike {
  message: string;
}

export interface AsyncList<T> {
  items: T;
  status: AsyncStatus;
  error?: ErrorLike;
}

export interface AsyncData<T> {
  data: T;
  status: AsyncStatus;
  error?: ErrorLike;
}
