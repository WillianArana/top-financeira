import { TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

class DialogComponentMock extends DialogComponent {
  override get dialog() {
    return {
      showModal: jest.fn(),
      close: jest.fn(),
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    } as any;
  }
}

describe('DialogService', () => {
  let mock: DialogComponentMock;
  let service: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
    }).compileComponents();

    service = TestBed.inject(DialogService);
    mock = new DialogComponentMock(service);
    service.setDialog(mock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be get service', () => {
    expect(service).toBeTruthy();
  });

  describe('showPositiveFeedback', () => {
    it('should be show a positive feedback', (done) => {
      const sub = service
        .showPositiveFeedback({
          message: 'some feedback',
          textButton: 'some text',
        })
        .subscribe(() => {
          expect(mock.message).toBe('some feedback');
          expect(mock.textButtonOk).toBe('some text');
          expect(mock.showButtonCancel).toBe(false);
          expect(mock.type).toEqual({
            'icon__check-circle--md': true,
            'dialog__form__icon--success': true,
          });
          sub.unsubscribe();
          done();
        });

      mock.confirm();
    });
  });

  describe('showNegativeFeedback', () => {
    it('should be show a negative feedback', (done) => {
      const sub = service
        .showNegativeFeedback({
          message: 'some feedback',
          textButton: 'some text',
        })
        .subscribe(() => {
          expect(mock.message).toBe('some feedback');
          expect(mock.textButtonOk).toBe('some text');
          expect(mock.showButtonCancel).toBe(false);
          expect(mock.type).toEqual({
            'icon__alert-circle--md': true,
            'dialog__form__icon--danger': true,
          });
          sub.unsubscribe();
          done();
        });

      mock.confirm();
    });
  });

  describe('showQuestion', () => {
    it('should be confirm a question', (done) => {
      const sub = service
        .showQuestion({
          message: 'some question',
          textButtonOk: 'some confirm text',
          textButtonCancel: 'some cancel text',
        })
        .subscribe(() => {
          expect(mock.message).toBe('some question');
          expect(mock.textButtonOk).toBe('some confirm text');
          expect(mock.textButtonCancel).toBe('some cancel text');
          expect(mock.showButtonCancel).toBe(true);
          expect(mock.type).toEqual({
            'icon__help-circle--md': true,
            'dialog__form__icon--warning': true,
          });
          sub.unsubscribe();
          done();
        });

      mock.confirm();
    });
  });
});
