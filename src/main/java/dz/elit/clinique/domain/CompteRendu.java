package dz.elit.clinique.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A CompteRendu.
 */
@Entity
@Table(name = "compte_rendu")
public class CompteRendu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_compte_rendu", nullable = false)
    private LocalDate dateCompteRendu;

    @OneToOne
    @JoinColumn(unique = true)
    private Visite visite;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCompteRendu() {
        return dateCompteRendu;
    }

    public CompteRendu dateCompteRendu(LocalDate dateCompteRendu) {
        this.dateCompteRendu = dateCompteRendu;
        return this;
    }

    public void setDateCompteRendu(LocalDate dateCompteRendu) {
        this.dateCompteRendu = dateCompteRendu;
    }

    public Visite getVisite() {
        return visite;
    }

    public CompteRendu visite(Visite visite) {
        this.visite = visite;
        return this;
    }

    public void setVisite(Visite visite) {
        this.visite = visite;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CompteRendu)) {
            return false;
        }
        return id != null && id.equals(((CompteRendu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CompteRendu{" +
            "id=" + getId() +
            ", dateCompteRendu='" + getDateCompteRendu() + "'" +
            "}";
    }
}
