import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICompteRendu, CompteRendu } from 'app/shared/model/compte-rendu.model';
import { CompteRenduService } from './compte-rendu.service';
import { IVisite } from 'app/shared/model/visite.model';
import { VisiteService } from 'app/entities/visite/visite.service';

@Component({
  selector: 'jhi-compte-rendu-update',
  templateUrl: './compte-rendu-update.component.html'
})
export class CompteRenduUpdateComponent implements OnInit {
  isSaving: boolean;

  visites: IVisite[];
  dateCompteRenduDp: any;

  editForm = this.fb.group({
    id: [],
    dateCompteRendu: [null, [Validators.required]],
    visite: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected compteRenduService: CompteRenduService,
    protected visiteService: VisiteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ compteRendu }) => {
      this.updateForm(compteRendu);
    });
    this.visiteService
      .query({ filter: 'compterendu-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IVisite[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVisite[]>) => response.body)
      )
      .subscribe(
        (res: IVisite[]) => {
          if (!this.editForm.get('visite').value || !this.editForm.get('visite').value.id) {
            this.visites = res;
          } else {
            this.visiteService
              .find(this.editForm.get('visite').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IVisite>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IVisite>) => subResponse.body)
              )
              .subscribe(
                (subRes: IVisite) => (this.visites = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(compteRendu: ICompteRendu) {
    this.editForm.patchValue({
      id: compteRendu.id,
      dateCompteRendu: compteRendu.dateCompteRendu,
      visite: compteRendu.visite
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const compteRendu = this.createFromForm();
    if (compteRendu.id !== undefined) {
      this.subscribeToSaveResponse(this.compteRenduService.update(compteRendu));
    } else {
      this.subscribeToSaveResponse(this.compteRenduService.create(compteRendu));
    }
  }

  private createFromForm(): ICompteRendu {
    return {
      ...new CompteRendu(),
      id: this.editForm.get(['id']).value,
      dateCompteRendu: this.editForm.get(['dateCompteRendu']).value,
      visite: this.editForm.get(['visite']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompteRendu>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackVisiteById(index: number, item: IVisite) {
    return item.id;
  }
}
