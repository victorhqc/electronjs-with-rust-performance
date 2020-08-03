import { ErrorLike } from './types';

export function errorMessage(err: string | ErrorLike) {
  return typeof err === 'string' ? err : err.message;
}
