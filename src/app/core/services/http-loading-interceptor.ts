import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpinnerService} from './spinner.service';
import {delay, finalize} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      this.spinnerService.show();
      return next.handle(req)
        .pipe(
          delay(500),
          finalize(() => {
            this.spinnerService.hide();
          }));
    }
    return next.handle(req);
  }
}
