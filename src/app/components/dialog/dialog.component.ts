import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements AfterViewInit {
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  constructor(private readonly _dialogService: DialogService) {}

  textButtonOk = 'OK';
  textButtonCancel = 'CANCELAR';
  showButtonCancel = true;
  message = '';

  type!: unknown;

  get dialog() {
    return this.dialogRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.onClose();
    this._dialogService.setDialog(this);
  }

  private onClose(): void {
    this.dialog.addEventListener('close', () => {
      this.dialog.classList.remove('dialog--active');
    });
  }

  public show(): void {
    this.dialog.showModal();
    this.dialog.classList.add('dialog--active');
  }

  public confirm(): void {
    this._dialogService.confirm();
    this.dialog.close();
  }
}
