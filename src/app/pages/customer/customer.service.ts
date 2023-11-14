import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { navigateTo } from 'src/app/helper/navigate.helper';
import { FormService } from 'src/app/services/form.service';
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
  readonly #submit$: Observable<CustomerDto>;
  readonly #remove$: Observable<void>;

  constructor(
    private readonly _formService: FormService<CustomerDto>,
    private readonly _httpServer: HttpService,
    private readonly _router: Router,
  ) {
    this.#submit$ = this._formService.onSubmitDto();
    this.#remove$ = this._formService.onRemove();
  }

  public initForm(): void {
    this.#dataForm = new CustomerDataForm();
  }

  public submitDto(form: FormGroup, createDtoFn: () => CustomerDto) {
    this._formService.submitDto(form, createDtoFn);
  }

  get dataForm() {
    return this.#dataForm;
  }

  public getById(id: number | string): Observable<ICustomer> {
    return this._httpServer.getById(this.#apiPath, id);
  }

  public onCreate(): Observable<ICustomer> {
    return this.#submit$.pipe(
      switchMap((dto) =>
        this._httpServer.create<ICustomer>(this.#apiPath, dto),
      ),
    );
  }

  public updateDataForm(data: CustomerDataForm): void {
    this.#dataForm = data;
  }

  public onUpdate(id: number): Observable<ICustomer> {
    return this.#submit$.pipe(
      switchMap((dto) =>
        this._httpServer.update<ICustomer>(this.#apiPath, id, dto),
      ),
    );
  }

  public remove(): void {
    this._formService.remove();
  }

  public onRemove(id: number): Observable<boolean> {
    return this.#remove$.pipe(
      switchMap(() => this._httpServer.delete<ICustomer>(this.#apiPath, id)),
      switchMap(() => this.navigateTo('back')),
    );
  }

  public navigateTo(...params: (string | number)[]): Observable<boolean> {
    return navigateTo(this._router, ...params);
  }
}
