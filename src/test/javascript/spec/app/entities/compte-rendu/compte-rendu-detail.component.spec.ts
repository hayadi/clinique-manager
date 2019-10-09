import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionCliniqueTestModule } from '../../../test.module';
import { CompteRenduDetailComponent } from 'app/entities/compte-rendu/compte-rendu-detail.component';
import { CompteRendu } from 'app/shared/model/compte-rendu.model';

describe('Component Tests', () => {
  describe('CompteRendu Management Detail Component', () => {
    let comp: CompteRenduDetailComponent;
    let fixture: ComponentFixture<CompteRenduDetailComponent>;
    const route = ({ data: of({ compteRendu: new CompteRendu(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionCliniqueTestModule],
        declarations: [CompteRenduDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CompteRenduDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CompteRenduDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.compteRendu).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
