import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DialogModule } from './dialog.module';
import { DialogService } from './dialog.service';

describe('DialogComponent', () => {
  let fixture: ComponentFixture<DialogComponent>;
  let component: DialogComponent;
  let service: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(DialogService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be create component', () => {
    expect(component).toBeTruthy();
  });

  it('should be contains dialog elemente', () => {
    fixture.detectChanges();
    expect(component.dialog).toBeTruthy();
  });

  // describe('onClose', () => {
  //   it('should be execute on close', () => {
  //     fixture.detectChanges();
  //     const dialog = component.dialog;
  //     const buttonElement = dialog.querySelector(
  //       '.dialog__form__button--cancel',
  //     ) as HTMLButtonElement;

  //     buttonElement.click();

  //     expect(dialog.classList.contains('dialog--active')).toBe(false);
  //   });
  // });

  describe('show', () => {
    it('should be show dialog', () => {
      const spyShowModal = jest.fn();
      const spyAddClass = jest.fn();
      jest.spyOn(component, 'dialog', 'get').mockReturnValue({
        showModal: spyShowModal,
        addEventListener: jest.fn(),
        classList: {
          add: spyAddClass,
        },
      } as any);

      fixture.detectChanges();
      component.show();

      expect(spyShowModal).toHaveBeenCalledTimes(1);
      expect(spyAddClass).toHaveBeenCalledTimes(1);
      expect(spyAddClass).toHaveBeenCalledWith('dialog--active');
    });
  });

  describe('confirm', () => {
    it('should be confirm dialog', () => {
      const spyServiceConfirm = jest.spyOn(service, 'confirm');
      const spyClose = jest.fn();
      jest.spyOn(component, 'dialog', 'get').mockReturnValue({
        close: spyClose,
        addEventListener: jest.fn(),
      } as any);

      fixture.detectChanges();
      component.confirm();

      expect(spyClose).toHaveBeenCalledTimes(1);
      expect(spyServiceConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
