import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class HttpService {
  constructor(private readonly _http: HttpClient) {}

  private get options(): {
    headers?: HttpHeaders;
    params?: HttpParams;
  } {
    return {
      params: this.params,
    };
  }

  private get params(): HttpParams {
    return new HttpParams();
  }

  public getById<T>(apiPath: string, id: string | number): Observable<T> {
    return this._http.get<T>(`${apiPath}/${id}`).pipe(take(1));
  }

  public create<T, DTO = unknown>(
    apiPath: string,
    resource: DTO,
  ): Observable<T> {
    return this._http.post<T>(apiPath, resource, this.options).pipe(take(1));
  }

  public update<T, DTO = unknown>(
    apiPath: string,
    id: number,
    resource: DTO,
  ): Observable<T> {
    return this._http
      .patch<T>(`${apiPath}/${id}`, resource, this.options)
      .pipe(take(1));
  }

  public delete<T = unknown>(apiPath: string, id: number): Observable<T> {
    return this._http.delete<T>(`${apiPath}/${id}`, this.options).pipe(take(1));
  }

  public search<T>(apiPath: string): Observable<T> {
    return this._http.get<T>(`${apiPath}`).pipe(take(1));
  }
}
