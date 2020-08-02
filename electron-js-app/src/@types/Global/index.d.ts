import { Store } from '../../store/createStore/main';

declare global {
  namespace NodeJS {
    interface Global {
      __redux_store__?: Store;
    }
  }
}
