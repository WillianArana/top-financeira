import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';
import { DialogService } from 'src/app/components/dialog/dialog.service';
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
  #dataForm = new CustomerDataForm();

  readonly #apiPath = `${environment.baseUrl}/custormer`;
  readonly #submit$: Observable<CustomerDto>;
  readonly #remove$: Observable<void>;

  constructor(
    private readonly _dialogService: DialogService,
    private readonly _formService: FormService<CustomerDto>,
    private readonly _httpServer: HttpService,
    private readonly _router: Router,
  ) {
    this.#submit$ = this._formService.onSubmitDto();
    this.#remove$ = this._formService.onRemove();
  }

  get dataForm() {
    return this.#dataForm;
  }

  public initForm(): void {
    this.clearForm();
  }

  public clearForm(): void {
    this.#dataForm = new CustomerDataForm();
  }

  public submitDto(form: FormGroup, createDtoFn: () => CustomerDto) {
    this._formService.submitDto(form, createDtoFn);
  }

  public getById(id: number | string): Observable<ICustomer> {
    return this._httpServer.getById(this.#apiPath, id);
  }

  public onCreate(): Observable<ICustomer> {
    return this.#submit$.pipe(
      switchMap((dto) =>
        this._httpServer.create<ICustomer>(this.#apiPath, dto),
      ),
      tap(() =>
        this._dialogService.showPositiveFeedback({
          message: 'Cliente adicionado com sucesso!',
          textButton: 'OK',
        }),
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
      tap(() =>
        this._dialogService.showPositiveFeedback({
          message: 'Cliente atualizado com sucesso!',
          textButton: 'OK',
        }),
      ),
    );
  }

  public remove(): void {
    this._dialogService
      .showQuestion({
        message: 'Deseja realmente excluir este cliente?',
        textButtonOk: 'SIM',
        textButtonCancel: 'NÃO',
      })
      .pipe(take(1))
      .subscribe(() => {
        this._formService.remove();
      });
  }

  public onRemove(id: number): Observable<boolean> {
    return this.#remove$.pipe(
      switchMap(() => this._httpServer.delete<ICustomer>(this.#apiPath, id)),
      switchMap(() => this.navigateToBack()),
    );
  }

  public navigateToBack(): Observable<boolean> {
    this.clearForm();
    return this.navigateTo('back');
  }

  public navigateTo(...params: (string | number)[]): Observable<boolean> {
    return navigateTo(this._router, ...params);
  }
}
