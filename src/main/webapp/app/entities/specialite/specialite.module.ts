import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionCliniqueSharedModule } from 'app/shared/shared.module';
import { SpecialiteComponent } from './specialite.component';
import { SpecialiteDetailComponent } from './specialite-detail.component';
import { SpecialiteUpdateComponent } from './specialite-update.component';
import { SpecialiteDeletePopupComponent, SpecialiteDeleteDialogComponent } from './specialite-delete-dialog.component';
import { specialiteRoute, specialitePopupRoute } from './specialite.route';

const ENTITY_STATES = [...specialiteRoute, ...specialitePopupRoute];

@NgModule({
  imports: [GestionCliniqueSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SpecialiteComponent,
    SpecialiteDetailComponent,
    SpecialiteUpdateComponent,
    SpecialiteDeleteDialogComponent,
    SpecialiteDeletePopupComponent
  ],
  entryComponents: [SpecialiteDeleteDialogComponent]
})
export class GestionCliniqueSpecialiteModule {}
