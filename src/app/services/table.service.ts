import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { FormService } from './form.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'any',
})
export class TableService<T, K = unknown> {
  readonly #submit$: Observable<K>;

  constructor(
    private readonly _formService: FormService<K>,
    private readonly _httpServer: HttpService,
  ) {
    this.#submit$ = this._formService.submit$;
  }

  public formGroupSubmit(form: FormGroup, createDtoFn: () => K): void {
    this._formService.formGroupSubmit(form, createDtoFn);
  }

  public submit(data: K): void {
    this._formService.submit(data);
  }

  public search(apiPath: string): Observable<T[]> {
    const params = new HttpParams();
    return this.#submit$.pipe(
      switchMap(() => this._httpServer.search<T[]>(apiPath, params)),
    );
  }
}
