var native = require('../dist/index.node');
import { MaybeError } from './types';
import { getDbPath } from './init';

export const migrate = () => {
  native.migrate({ dbPath: getDbPath() });
};

export function callNative<T>(methodName: MethodName, args?: unknown): Promise<T> {
  return new Promise((resolve, reject) => {
    const usedArgs = [
      args,
      { dbPath: getDbPath() },
      (err: MaybeError, res: T) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      },
    ].filter(Boolean);

    native[methodName](...usedArgs);
  });
}

export type MethodName = 'getMovies';
