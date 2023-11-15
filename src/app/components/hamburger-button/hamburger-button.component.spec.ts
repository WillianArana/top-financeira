import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { HamburgerButtonComponent } from './hamburger-button.component';
import { HamburgerButtonModule } from './hamburger-button.module';

describe('HamburgerButtonComponent', () => {
  let fixture: ComponentFixture<HamburgerButtonComponent>;
  let component: HamburgerButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburgerButtonComponent);
    component = fixture.componentInstance;
  });

  it('should be create component', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('toggleState', () => {
    it('should be state is true and emit toggle event', () => {
      const spy = jest.spyOn(component.toggle, 'emit');

      component.toggleState();

      expect(component.state).toBe(true);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should be state is false and emit toggle event', fakeAsync(() => {
      const spy = jest.spyOn(component.toggle, 'emit');

      component.toggleState();
      tick(100);
      component.toggleState();

      expect(component.state).toBe(false);
      expect(spy).toHaveBeenCalledTimes(2);

      flush();
    }));
  });
});
