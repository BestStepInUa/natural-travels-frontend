import { nextServer } from './api';
import { useLoadingStore } from '../store/loadingStore/loadingStore';

if (typeof window !== 'undefined') {
  nextServer.interceptors.request.use(
    (config) => {
      useLoadingStore.getState().showLoader();
      return config;
    },
    (error) => {
      useLoadingStore.getState().hideLoader();
      return Promise.reject(error);
    }
  );

  nextServer.interceptors.response.use(
    (response) => {
      useLoadingStore.getState().hideLoader();
      return response;
    },
    (error) => {
      useLoadingStore.getState().hideLoader();
      return Promise.reject(error);
    }
  );
}
