import { ISpecialite } from 'app/shared/model/specialite.model';
import { IVisite } from 'app/shared/model/visite.model';
import { IClinique } from 'app/shared/model/clinique.model';
import { EtatMedecin } from 'app/shared/model/enumerations/etat-medecin.model';

export interface IMedecin {
  id?: number;
  nom?: string;
  adresse?: string;
  telephone?: string;
  fax?: string;
  email?: string;
  etat?: EtatMedecin;
  specialite?: ISpecialite;
  visites?: IVisite[];
  cliniques?: IClinique[];
}

export class Medecin implements IMedecin {
  constructor(
    public id?: number,
    public nom?: string,
    public adresse?: string,
    public telephone?: string,
    public fax?: string,
    public email?: string,
    public etat?: EtatMedecin,
    public specialite?: ISpecialite,
    public visites?: IVisite[],
    public cliniques?: IClinique[]
  ) {}
}
