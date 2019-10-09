import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedecin, Medecin } from 'app/shared/model/medecin.model';
import { MedecinService } from './medecin.service';
import { ISpecialite } from 'app/shared/model/specialite.model';
import { SpecialiteService } from 'app/entities/specialite/specialite.service';
import { IClinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from 'app/entities/clinique/clinique.service';

@Component({
  selector: 'jhi-medecin-update',
  templateUrl: './medecin-update.component.html'
})
export class MedecinUpdateComponent implements OnInit {
  isSaving: boolean;

  specialites: ISpecialite[];

  cliniques: IClinique[];

  editForm = this.fb.group({
    id: [],
    nom: [],
    adresse: [],
    telephone: [],
    fax: [],
    email: [],
    etat: [],
    specialite: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected medecinService: MedecinService,
    protected specialiteService: SpecialiteService,
    protected cliniqueService: CliniqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ medecin }) => {
      this.updateForm(medecin);
    });
    this.specialiteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISpecialite[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISpecialite[]>) => response.body)
      )
      .subscribe((res: ISpecialite[]) => (this.specialites = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cliniqueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClinique[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClinique[]>) => response.body)
      )
      .subscribe((res: IClinique[]) => (this.cliniques = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(medecin: IMedecin) {
    this.editForm.patchValue({
      id: medecin.id,
      nom: medecin.nom,
      adresse: medecin.adresse,
      telephone: medecin.telephone,
      fax: medecin.fax,
      email: medecin.email,
      etat: medecin.etat,
      specialite: medecin.specialite
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const medecin = this.createFromForm();
    if (medecin.id !== undefined) {
      this.subscribeToSaveResponse(this.medecinService.update(medecin));
    } else {
      this.subscribeToSaveResponse(this.medecinService.create(medecin));
    }
  }

  private createFromForm(): IMedecin {
    return {
      ...new Medecin(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      adresse: this.editForm.get(['adresse']).value,
      telephone: this.editForm.get(['telephone']).value,
      fax: this.editForm.get(['fax']).value,
      email: this.editForm.get(['email']).value,
      etat: this.editForm.get(['etat']).value,
      specialite: this.editForm.get(['specialite']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedecin>>) {
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

  trackSpecialiteById(index: number, item: ISpecialite) {
    return item.id;
  }

  trackCliniqueById(index: number, item: IClinique) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
