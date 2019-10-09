package dz.elit.clinique.repository;
import dz.elit.clinique.domain.CompteRendu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompteRendu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompteRenduRepository extends JpaRepository<CompteRendu, Long> {

}
