import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class HttpService {
  constructor(private readonly _http: HttpClient) {}

  public getById<T>(url: string, id: string | number): Observable<T> {
    return this._http.get<T>(`${url}/${id}`).pipe(take(1));
  }

  public create<T, DTO = unknown>(url: string, resource: DTO): Observable<T> {
    return this._http.post<T>(url, resource).pipe(take(1));
  }

  public update<T, DTO = unknown>(
    url: string,
    id: number,
    resource: DTO,
  ): Observable<T> {
    return this._http.patch<T>(`${url}/${id}`, resource).pipe(take(1));
  }

  public delete<T = unknown>(url: string, id: number): Observable<T> {
    return this._http.delete<T>(`${url}/${id}`).pipe(take(1));
  }

  public search<T>(
    url: string,
    params: HttpParams,
  ): Observable<HttpResponse<T>> {
    return this._http
      .get<T>(`${url}`, { params, observe: 'response' })
      .pipe(take(1));
  }
}
