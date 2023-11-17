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

  describe('cancel', () => {
    it('should be cancel dialog', () => {
      const spyServiceCancel = jest.spyOn(service, 'cancel');

      fixture.detectChanges();
      component.cancel();

      expect(spyServiceCancel).toHaveBeenCalledTimes(1);
    });
  });
});
