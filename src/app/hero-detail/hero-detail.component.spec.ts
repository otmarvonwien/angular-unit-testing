import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute: any;
  let mockHeroService: any;
  let mockLocation: any;

  beforeEach(() => {
    mockActivatedRoute = {
      // { return '3'; } -> '3'
      snapshot: { paramMap: { get: () => '3' } }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  it('should call updateHero when save is called', (done: DoneFn) => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done();
    }, 300);
  });
});
