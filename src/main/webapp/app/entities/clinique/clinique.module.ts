import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionCliniqueSharedModule } from 'app/shared/shared.module';
import { CliniqueComponent } from './clinique.component';
import { CliniqueDetailComponent } from './clinique-detail.component';
import { CliniqueUpdateComponent } from './clinique-update.component';
import { CliniqueDeletePopupComponent, CliniqueDeleteDialogComponent } from './clinique-delete-dialog.component';
import { cliniqueRoute, cliniquePopupRoute } from './clinique.route';

const ENTITY_STATES = [...cliniqueRoute, ...cliniquePopupRoute];

@NgModule({
  imports: [GestionCliniqueSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CliniqueComponent,
    CliniqueDetailComponent,
    CliniqueUpdateComponent,
    CliniqueDeleteDialogComponent,
    CliniqueDeletePopupComponent
  ],
  entryComponents: [CliniqueDeleteDialogComponent]
})
export class GestionCliniqueCliniqueModule {}
