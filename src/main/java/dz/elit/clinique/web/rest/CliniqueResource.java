package dz.elit.clinique.web.rest;

import dz.elit.clinique.domain.Clinique;
import dz.elit.clinique.repository.CliniqueRepository;
import dz.elit.clinique.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link dz.elit.clinique.domain.Clinique}.
 */
@RestController
@RequestMapping("/api")
public class CliniqueResource {

    private final Logger log = LoggerFactory.getLogger(CliniqueResource.class);

    private static final String ENTITY_NAME = "clinique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CliniqueRepository cliniqueRepository;

    public CliniqueResource(CliniqueRepository cliniqueRepository) {
        this.cliniqueRepository = cliniqueRepository;
    }

    /**
     * {@code POST  /cliniques} : Create a new clinique.
     *
     * @param clinique the clinique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clinique, or with status {@code 400 (Bad Request)} if the clinique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cliniques")
    public ResponseEntity<Clinique> createClinique(@Valid @RequestBody Clinique clinique) throws URISyntaxException {
        log.debug("REST request to save Clinique : {}", clinique);
        if (clinique.getId() != null) {
            throw new BadRequestAlertException("A new clinique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clinique result = cliniqueRepository.save(clinique);
        return ResponseEntity.created(new URI("/api/cliniques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cliniques} : Updates an existing clinique.
     *
     * @param clinique the clinique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clinique,
     * or with status {@code 400 (Bad Request)} if the clinique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clinique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cliniques")
    public ResponseEntity<Clinique> updateClinique(@Valid @RequestBody Clinique clinique) throws URISyntaxException {
        log.debug("REST request to update Clinique : {}", clinique);
        if (clinique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Clinique result = cliniqueRepository.save(clinique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clinique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cliniques} : get all the cliniques.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cliniques in body.
     */
    @GetMapping("/cliniques")
    public List<Clinique> getAllCliniques(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Cliniques");
        return cliniqueRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /cliniques/:id} : get the "id" clinique.
     *
     * @param id the id of the clinique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clinique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cliniques/{id}")
    public ResponseEntity<Clinique> getClinique(@PathVariable Long id) {
        log.debug("REST request to get Clinique : {}", id);
        Optional<Clinique> clinique = cliniqueRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(clinique);
    }

    /**
     * {@code DELETE  /cliniques/:id} : delete the "id" clinique.
     *
     * @param id the id of the clinique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cliniques/{id}")
    public ResponseEntity<Void> deleteClinique(@PathVariable Long id) {
        log.debug("REST request to delete Clinique : {}", id);
        cliniqueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
