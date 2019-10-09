import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionCliniqueSharedModule } from 'app/shared/shared.module';
import { MedecinComponent } from './medecin.component';
import { MedecinDetailComponent } from './medecin-detail.component';
import { MedecinUpdateComponent } from './medecin-update.component';
import { MedecinDeletePopupComponent, MedecinDeleteDialogComponent } from './medecin-delete-dialog.component';
import { medecinRoute, medecinPopupRoute } from './medecin.route';

const ENTITY_STATES = [...medecinRoute, ...medecinPopupRoute];

@NgModule({
  imports: [GestionCliniqueSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MedecinComponent,
    MedecinDetailComponent,
    MedecinUpdateComponent,
    MedecinDeleteDialogComponent,
    MedecinDeletePopupComponent
  ],
  entryComponents: [MedecinDeleteDialogComponent]
})
export class GestionCliniqueMedecinModule {}
