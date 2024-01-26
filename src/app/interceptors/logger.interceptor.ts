import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingBarService } from '../services/loading-bar.service';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.warn('loggerInterceptor');
  const loadingBar: LoadingBarService = inject(LoadingBarService);
  loadingBar.loadingStatus = true;
  console.log (loadingBar.loadingStatus)
  setTimeout(() => {
    loadingBar.loadingStatus = false;
  console.log (loadingBar.loadingStatus)

  }, 1000);
  return next(req).pipe();
};
