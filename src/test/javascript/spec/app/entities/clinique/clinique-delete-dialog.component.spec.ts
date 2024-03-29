import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionCliniqueTestModule } from '../../../test.module';
import { CliniqueDeleteDialogComponent } from 'app/entities/clinique/clinique-delete-dialog.component';
import { CliniqueService } from 'app/entities/clinique/clinique.service';

describe('Component Tests', () => {
  describe('Clinique Management Delete Component', () => {
    let comp: CliniqueDeleteDialogComponent;
    let fixture: ComponentFixture<CliniqueDeleteDialogComponent>;
    let service: CliniqueService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionCliniqueTestModule],
        declarations: [CliniqueDeleteDialogComponent]
      })
        .overrideTemplate(CliniqueDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CliniqueDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CliniqueService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
