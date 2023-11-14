import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should be create component', () => {
    expect(component).toBeTruthy();
  });

  it('should be setting a type', () => {
    fixture.detectChanges();
    component.type = 'button';
    expect(component.type).toBe('button');
  });
});
