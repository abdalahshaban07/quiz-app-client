import { TokenserviceService } from './tokenservice.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenserviceService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        const token = this.tokenService.GetToken()
        if (token) {
            headersConfig['Authorization'] = `beader ${token}`
        }

        const _req = req.clone({ setHeaders: headersConfig })
        return next.handle(_req)


    }
}
