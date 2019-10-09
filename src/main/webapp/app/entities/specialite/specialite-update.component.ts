import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISpecialite, Specialite } from 'app/shared/model/specialite.model';
import { SpecialiteService } from './specialite.service';

@Component({
  selector: 'jhi-specialite-update',
  templateUrl: './specialite-update.component.html'
})
export class SpecialiteUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nom: [],
    description: []
  });

  constructor(protected specialiteService: SpecialiteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ specialite }) => {
      this.updateForm(specialite);
    });
  }

  updateForm(specialite: ISpecialite) {
    this.editForm.patchValue({
      id: specialite.id,
      nom: specialite.nom,
      description: specialite.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const specialite = this.createFromForm();
    if (specialite.id !== undefined) {
      this.subscribeToSaveResponse(this.specialiteService.update(specialite));
    } else {
      this.subscribeToSaveResponse(this.specialiteService.create(specialite));
    }
  }

  private createFromForm(): ISpecialite {
    return {
      ...new Specialite(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpecialite>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
