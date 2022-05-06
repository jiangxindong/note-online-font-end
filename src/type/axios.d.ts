import axios from 'axios';

declare module 'axios' {
  interface CustomAxiosResponse<D = null> {
    code: number;
    message: string;
    extra: D;
  }
  export interface AxiosResponse<T = any> extends CustomAxiosResponse<D> {}
}
