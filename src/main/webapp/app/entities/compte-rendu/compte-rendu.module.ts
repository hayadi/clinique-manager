import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionCliniqueSharedModule } from 'app/shared/shared.module';
import { CompteRenduComponent } from './compte-rendu.component';
import { CompteRenduDetailComponent } from './compte-rendu-detail.component';
import { CompteRenduUpdateComponent } from './compte-rendu-update.component';
import { CompteRenduDeletePopupComponent, CompteRenduDeleteDialogComponent } from './compte-rendu-delete-dialog.component';
import { compteRenduRoute, compteRenduPopupRoute } from './compte-rendu.route';

const ENTITY_STATES = [...compteRenduRoute, ...compteRenduPopupRoute];

@NgModule({
  imports: [GestionCliniqueSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CompteRenduComponent,
    CompteRenduDetailComponent,
    CompteRenduUpdateComponent,
    CompteRenduDeleteDialogComponent,
    CompteRenduDeletePopupComponent
  ],
  entryComponents: [CompteRenduDeleteDialogComponent]
})
export class GestionCliniqueCompteRenduModule {}
