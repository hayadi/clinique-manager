import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPatient, Patient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';
import { IClinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from 'app/entities/clinique/clinique.service';

@Component({
  selector: 'jhi-patient-update',
  templateUrl: './patient-update.component.html'
})
export class PatientUpdateComponent implements OnInit {
  isSaving: boolean;

  cliniques: IClinique[];

  editForm = this.fb.group({
    id: [],
    nom: [],
    adresse: [],
    telephone: [],
    fax: [],
    email: [],
    clinique: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected patientService: PatientService,
    protected cliniqueService: CliniqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.updateForm(patient);
    });
    this.cliniqueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClinique[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClinique[]>) => response.body)
      )
      .subscribe((res: IClinique[]) => (this.cliniques = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(patient: IPatient) {
    this.editForm.patchValue({
      id: patient.id,
      nom: patient.nom,
      adresse: patient.adresse,
      telephone: patient.telephone,
      fax: patient.fax,
      email: patient.email,
      clinique: patient.clinique
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const patient = this.createFromForm();
    if (patient.id !== undefined) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  private createFromForm(): IPatient {
    return {
      ...new Patient(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      adresse: this.editForm.get(['adresse']).value,
      telephone: this.editForm.get(['telephone']).value,
      fax: this.editForm.get(['fax']).value,
      email: this.editForm.get(['email']).value,
      clinique: this.editForm.get(['clinique']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatient>>) {
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

  trackCliniqueById(index: number, item: IClinique) {
    return item.id;
  }
}
