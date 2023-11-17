import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly #confirm = new Subject<void>();
  readonly #cancel = new Subject<void>();
  readonly #types = {
    success: {
      'icon__check-circle--md': true,
      'dialog__form__icon--success': true,
    },
    danger: {
      'icon__alert-circle--md': true,
      'dialog__form__icon--danger': true,
    },
    warning: {
      'icon__help-circle--md': true,
      'dialog__form__icon--warning': true,
    },
  };

  cancel$ = this.#cancel.asObservable();

  #dialog!: DialogComponent;
  public setDialog(dialog: DialogComponent): void {
    this.#dialog = dialog;
  }

  public confirm(): void {
    this.#confirm.next();
  }

  public cancel(): void {
    this.#cancel.next();
  }

  public showPositiveFeedback(data: {
    message: string;
    textButton: string;
  }): Observable<void> {
    return this.showFeedback(
      Object.assign(data, { type: this.#types.success }),
    );
  }

  public showNegativeFeedback(data: {
    message: string;
    textButton: string;
  }): Observable<void> {
    return this.showFeedback(Object.assign(data, { type: this.#types.danger }));
  }

  private showFeedback(data: {
    message: string;
    textButton: string;
    type: unknown;
  }): Observable<void> {
    const dialog = this.#dialog;
    dialog.message = data.message;
    dialog.textButtonOk = data.textButton;
    dialog.type = data.type;
    dialog.showButtonCancel = false;
    dialog.show();
    return this.#confirm.asObservable();
  }

  public showQuestion(data: {
    message: string;
    textButtonOk: string;
    textButtonCancel: string;
  }): Observable<void> {
    const dialog = this.#dialog;
    dialog.message = data.message;
    dialog.textButtonOk = data.textButtonOk;
    dialog.textButtonCancel = data.textButtonCancel;
    dialog.type = this.#types.warning;
    dialog.showButtonCancel = true;
    dialog.show();
    return this.#confirm.asObservable().pipe(takeUntil(this.cancel$));
  }
}
