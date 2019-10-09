import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'clinique',
        loadChildren: () => import('./clinique/clinique.module').then(m => m.GestionCliniqueCliniqueModule)
      },
      {
        path: 'specialite',
        loadChildren: () => import('./specialite/specialite.module').then(m => m.GestionCliniqueSpecialiteModule)
      },
      {
        path: 'medecin',
        loadChildren: () => import('./medecin/medecin.module').then(m => m.GestionCliniqueMedecinModule)
      },
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(m => m.GestionCliniquePatientModule)
      },
      {
        path: 'visite',
        loadChildren: () => import('./visite/visite.module').then(m => m.GestionCliniqueVisiteModule)
      },
      {
        path: 'compte-rendu',
        loadChildren: () => import('./compte-rendu/compte-rendu.module').then(m => m.GestionCliniqueCompteRenduModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GestionCliniqueEntityModule {}
