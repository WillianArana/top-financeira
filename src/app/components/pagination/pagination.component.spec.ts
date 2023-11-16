import { ComponentFixture, TestBed } from '@angular/core/testing';
import { skip } from 'rxjs';
import { PaginationComponent } from './pagination.component';
import { PaginationModule } from './pagination.module';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should be create component', () => {
    expect(component).toBeTruthy();
  });

  it('should be setting a data', () => {
    const expected = [
      {
        value: 1,
        current: true,
      },
      {
        value: 2,
        current: false,
      },
      {
        value: 3,
        current: false,
      },
      {
        value: 4,
        current: false,
      },
      {
        value: 5,
        current: false,
      },
    ];

    fixture.detectChanges();

    component.data = {
      last: expected.length,
    };

    expect(component.items).toEqual(expected);
    expect(component.current).toEqual(1);
    expect(component.isFirst).toBe(true);
    expect(component.isLast).toBe(false);
  });

  describe('next', () => {
    it('shoud be emit next page', (done) => {
      fixture.detectChanges();
      component.data = {
        last: 2,
      };

      const sub = component.page.subscribe(() => {
        expect(component.current).toBe(2);
        expect(component.isFirst).toBe(false);
        expect(component.isLast).toBe(true);
        expect(component.items[1].current).toBe(true);
        expect(component.items[1].value).toBe(2);
        sub.unsubscribe();
        done();
      });

      component.next();
    });
  });

  describe('prev', () => {
    it('shoud be emit previus page', (done) => {
      fixture.detectChanges();
      component.data = {
        last: 2,
      };

      const sub = component.page.pipe(skip(1)).subscribe(() => {
        expect(component.current).toBe(1);
        expect(component.isFirst).toBe(true);
        expect(component.isLast).toBe(false);
        expect(component.items[0].current).toBe(true);
        expect(component.items[0].value).toBe(1);
        sub.unsubscribe();
        done();
      });

      component.next();
      component.prev();
    });
  });
});
