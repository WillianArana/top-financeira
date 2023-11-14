import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, from, switchMap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { CustomerDataForm } from './models/customer.data-form';
import { CustomerDto } from './models/customer.dto';
import { ICustomer } from './models/interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  #dataForm!: CustomerDataForm;

  readonly #apiPath = `${environment.baseUrl}/custormer`;
  readonly submit$ = new Subject<CustomerDto>();

  constructor(
    private readonly _httpServer: HttpService,
    private readonly _router: Router,
  ) {}

  get dataForm() {
    return this.#dataForm;
  }

  public getById(id: number | string): Observable<ICustomer> {
    return this._httpServer.getById(this.#apiPath, id);
  }

  public onCreateSubmit(): Observable<ICustomer> {
    return this.submit$.pipe(
      switchMap((dto) =>
        this._httpServer.create<ICustomer>(this.#apiPath, dto),
      ),
    );
  }

  public setDataForm(data: CustomerDataForm): void {
    this.#dataForm = data;
  }

  public onUpdateSubmit(id: number): Observable<ICustomer> {
    return this.submit$.pipe(
      switchMap((dto) =>
        this._httpServer.update<ICustomer>(this.#apiPath, id, dto),
      ),
    );
  }

  public navigatTo(...params: (string | number)[]): Observable<boolean> {
    const url = this._router.url.replace(/\/[^/]*$/, '');
    return from(this._router.navigate([url, ...params]));
  }
}
