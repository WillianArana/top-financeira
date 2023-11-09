import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputComponent } from "./input.component";
import { InputModule } from "./input.module";

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  })

  it('should be create component', () => {
    expect(component).toBeTruthy();
  })

  it('should be a custom element', () => {
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
  })

  it('should be setting an id', () => {
    component.id = 'new id';
    fixture.detectChanges();
    expect(component.id).toBe('new id');
  })

  it('should be setting a label', () => {
    fixture.detectChanges();
    component.label = 'some label';
    expect(component.label).toBe('some label');
  })

  it('should be setting a placeholder', () => {
    fixture.detectChanges();
    component.placeholder = 'some placeholder';
    expect(component.placeholder).toBe('some placeholder');
  })

  it('should be setting a type', () => {
    fixture.detectChanges();
    component.type = 'number';
    expect(component.type).toBe('number');
  })

  it('should be not readonly', () => {
    fixture.detectChanges();
    expect(component.isReadOnly).toBeFalsy();
  })

  it('should be default type is text', () => {
    fixture.detectChanges();
    expect(component.type).toBe('text');
  })

  describe('createId', () => {
    it('should be create an id', () => {
      fixture.detectChanges();
      expect(component.createId()).toMatch(/^input-id-\d+$/);
    })

    it('should be create a new id when the method is called', () => {
      fixture.detectChanges();
      expect(component.createId()).not.toBe(component.id);
    })
  })
})
