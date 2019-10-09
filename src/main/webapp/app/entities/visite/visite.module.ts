import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionCliniqueSharedModule } from 'app/shared/shared.module';
import { VisiteComponent } from './visite.component';
import { VisiteDetailComponent } from './visite-detail.component';
import { VisiteUpdateComponent } from './visite-update.component';
import { VisiteDeletePopupComponent, VisiteDeleteDialogComponent } from './visite-delete-dialog.component';
import { visiteRoute, visitePopupRoute } from './visite.route';

const ENTITY_STATES = [...visiteRoute, ...visitePopupRoute];

@NgModule({
  imports: [GestionCliniqueSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [VisiteComponent, VisiteDetailComponent, VisiteUpdateComponent, VisiteDeleteDialogComponent, VisiteDeletePopupComponent],
  entryComponents: [VisiteDeleteDialogComponent]
})
export class GestionCliniqueVisiteModule {}
