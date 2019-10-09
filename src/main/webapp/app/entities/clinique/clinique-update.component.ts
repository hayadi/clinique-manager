import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IClinique, Clinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from './clinique.service';
import { IMedecin } from 'app/shared/model/medecin.model';
import { MedecinService } from 'app/entities/medecin/medecin.service';

@Component({
  selector: 'jhi-clinique-update',
  templateUrl: './clinique-update.component.html'
})
export class CliniqueUpdateComponent implements OnInit {
  isSaving: boolean;

  medecins: IMedecin[];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    dirigeant: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    telephone: [null, [Validators.required]],
    fax: [null, [Validators.required]],
    email: [null, [Validators.required]],
    horaireTravail: [null, [Validators.required]],
    medecins: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cliniqueService: CliniqueService,
    protected medecinService: MedecinService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ clinique }) => {
      this.updateForm(clinique);
    });
    this.medecinService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMedecin[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedecin[]>) => response.body)
      )
      .subscribe((res: IMedecin[]) => (this.medecins = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(clinique: IClinique) {
    this.editForm.patchValue({
      id: clinique.id,
      nom: clinique.nom,
      dirigeant: clinique.dirigeant,
      adresse: clinique.adresse,
      telephone: clinique.telephone,
      fax: clinique.fax,
      email: clinique.email,
      horaireTravail: clinique.horaireTravail,
      medecins: clinique.medecins
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const clinique = this.createFromForm();
    if (clinique.id !== undefined) {
      this.subscribeToSaveResponse(this.cliniqueService.update(clinique));
    } else {
      this.subscribeToSaveResponse(this.cliniqueService.create(clinique));
    }
  }

  private createFromForm(): IClinique {
    return {
      ...new Clinique(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      dirigeant: this.editForm.get(['dirigeant']).value,
      adresse: this.editForm.get(['adresse']).value,
      telephone: this.editForm.get(['telephone']).value,
      fax: this.editForm.get(['fax']).value,
      email: this.editForm.get(['email']).value,
      horaireTravail: this.editForm.get(['horaireTravail']).value,
      medecins: this.editForm.get(['medecins']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClinique>>) {
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
