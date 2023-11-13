import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { skip } from 'rxjs';
import { InputComponent } from './input.component';
import { InputModule } from './input.module';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  const mockUpdate = new EventEmitter();

  const mockStatusChanges = new EventEmitter();
  const mockValuesChanges = new EventEmitter();

  const mockControl = {
    valueChanges: mockValuesChanges,
    statusChanges: mockStatusChanges,
    status: 'VALID',
  };

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useValue: {
        form: mockControl,
        control: mockControl,
        update: mockUpdate,
      },
    };

    const Form_Group_Directive_PROVIDER = {
      provide: FormGroupDirective,
      useValue: {
        getControl: () => mockControl,
      },
    };

    await TestBed.configureTestingModule({
      imports: [InputModule],
    })
      .overrideComponent(InputComponent, {
        add: {
          providers: [NG_CONTROL_PROVIDER, Form_Group_Directive_PROVIDER],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be create component', () => {
    expect(component).toBeTruthy();
  });

  it('should be a custom element', () => {
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
  });

  it('should be setting an id', () => {
    component.id = 'new id';
    fixture.detectChanges();
    expect(component.id).toBe('new id');
  });

  it('should be setting a label', () => {
    fixture.detectChanges();
    component.label = 'some label';
    expect(component.label).toBe('some label');
  });

  it('should be setting a placeholder', () => {
    fixture.detectChanges();
    component.placeholder = 'some placeholder';
    expect(component.placeholder).toBe('some placeholder');
  });

  it('should be setting a type', () => {
    fixture.detectChanges();
    component.type = 'number';
    expect(component.type).toBe('number');
  });

  it('should be not readonly', () => {
    fixture.detectChanges();
    expect(component.isReadOnly).toBeFalsy();
  });

  it('should be default type is text', () => {
    fixture.detectChanges();
    expect(component.type).toBe('text');
  });

  describe('createId', () => {
    it('should be create an id', () => {
      fixture.detectChanges();
      expect(component.createId()).toMatch(/^input-id-\d+$/);
    });

    it('should be create a new id when the method is called', () => {
      fixture.detectChanges();
      expect(component.createId()).not.toBe(component.id);
    });
  });

  describe('setControl', () => {
    it('should be setting a NgModel', (done) => {
      jest.spyOn(component, 'isNgModel').mockReturnValue(true);
      fixture.detectChanges();

      const sub = mockUpdate.subscribe((value) => {
        expect(value).toBe('some value');
        sub.unsubscribe();
        done();
      });

      mockValuesChanges.next('some value');
    });

    it('should be setting a FormControlName', (done) => {
      jest.spyOn(component, 'isFormControlName').mockReturnValue(true);
      fixture.detectChanges();

      const sub = mockStatusChanges.pipe(skip(1)).subscribe((value) => {
        expect(value).toBe('INVALID');
        expect(component.hasError).toBe(true);
        expect(component.isReadOnly).toBe(false);
        sub.unsubscribe();
        done();
      });

      mockStatusChanges.next('VALID');
      mockStatusChanges.next('INVALID');
    });

    it('should be setting a FormControlDirective', (done) => {
      jest.spyOn(component, 'isFormControlName').mockReturnValue(false);
      jest.spyOn(component, 'isFormControlName').mockReturnValue(false);
      fixture.detectChanges();

      const sub = mockStatusChanges.pipe(skip(1)).subscribe((value) => {
        expect(value).toBe('DISABLED');
        expect(component.hasError).toBe(false);
        expect(component.isReadOnly).toBe(true);
        sub.unsubscribe();
        done();
      });

      mockStatusChanges.next('VALID');
      mockStatusChanges.next('DISABLED');
    });
  });
});
