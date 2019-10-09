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
import { IVisite, Visite } from 'app/shared/model/visite.model';
import { VisiteService } from './visite.service';
import { IMedecin } from 'app/shared/model/medecin.model';
import { MedecinService } from 'app/entities/medecin/medecin.service';
import { IClinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from 'app/entities/clinique/clinique.service';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { CompteRenduService } from 'app/entities/compte-rendu/compte-rendu.service';

@Component({
  selector: 'jhi-visite-update',
  templateUrl: './visite-update.component.html'
})
export class VisiteUpdateComponent implements OnInit {
  isSaving: boolean;

  medecins: IMedecin[];

  cliniques: IClinique[];

  compterendus: ICompteRendu[];
  dateVisiteDp: any;

  editForm = this.fb.group({
    id: [],
    dateVisite: [null, [Validators.required]],
    medecin: [],
    clinique: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected visiteService: VisiteService,
    protected medecinService: MedecinService,
    protected cliniqueService: CliniqueService,
    protected compteRenduService: CompteRenduService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ visite }) => {
      this.updateForm(visite);
    });
    this.medecinService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMedecin[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedecin[]>) => response.body)
      )
      .subscribe((res: IMedecin[]) => (this.medecins = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cliniqueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClinique[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClinique[]>) => response.body)
      )
      .subscribe((res: IClinique[]) => (this.cliniques = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.compteRenduService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICompteRendu[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICompteRendu[]>) => response.body)
      )
      .subscribe((res: ICompteRendu[]) => (this.compterendus = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(visite: IVisite) {
    this.editForm.patchValue({
      id: visite.id,
      dateVisite: visite.dateVisite,
      medecin: visite.medecin,
      clinique: visite.clinique
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const visite = this.createFromForm();
    if (visite.id !== undefined) {
      this.subscribeToSaveResponse(this.visiteService.update(visite));
    } else {
      this.subscribeToSaveResponse(this.visiteService.create(visite));
    }
  }

  private createFromForm(): IVisite {
    return {
      ...new Visite(),
      id: this.editForm.get(['id']).value,
      dateVisite: this.editForm.get(['dateVisite']).value,
      medecin: this.editForm.get(['medecin']).value,
      clinique: this.editForm.get(['clinique']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisite>>) {
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

  trackMedecinById(index: number, item: IMedecin) {
    return item.id;
  }

  trackCliniqueById(index: number, item: IClinique) {
    return item.id;
  }

  trackCompteRenduById(index: number, item: ICompteRendu) {
    return item.id;
  }
}
