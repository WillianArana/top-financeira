import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { FormService } from './form.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'any',
})
export class TableService<T, K extends HttpParams> {
  readonly #submit$: Observable<K>;

  constructor(
    private readonly _formService: FormService<K>,
    private readonly _httpServer: HttpService,
  ) {
    this.#submit$ = this._formService.submit$;
  }

  public submit(data: K): void {
    this._formService.submit(data);
  }

  public search(apiPath: string): Observable<HttpResponse<T[]>> {
    return this.#submit$.pipe(
      switchMap((params) => this._httpServer.search<T[]>(apiPath, params)),
    );
  }
}
