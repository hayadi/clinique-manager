package dz.elit.clinique.web.rest;

import dz.elit.clinique.domain.CompteRendu;
import dz.elit.clinique.repository.CompteRenduRepository;
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
 * REST controller for managing {@link dz.elit.clinique.domain.CompteRendu}.
 */
@RestController
@RequestMapping("/api")
public class CompteRenduResource {

    private final Logger log = LoggerFactory.getLogger(CompteRenduResource.class);

    private static final String ENTITY_NAME = "compteRendu";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompteRenduRepository compteRenduRepository;

    public CompteRenduResource(CompteRenduRepository compteRenduRepository) {
        this.compteRenduRepository = compteRenduRepository;
    }

    /**
     * {@code POST  /compte-rendus} : Create a new compteRendu.
     *
     * @param compteRendu the compteRendu to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new compteRendu, or with status {@code 400 (Bad Request)} if the compteRendu has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/compte-rendus")
    public ResponseEntity<CompteRendu> createCompteRendu(@Valid @RequestBody CompteRendu compteRendu) throws URISyntaxException {
        log.debug("REST request to save CompteRendu : {}", compteRendu);
        if (compteRendu.getId() != null) {
            throw new BadRequestAlertException("A new compteRendu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompteRendu result = compteRenduRepository.save(compteRendu);
        return ResponseEntity.created(new URI("/api/compte-rendus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /compte-rendus} : Updates an existing compteRendu.
     *
     * @param compteRendu the compteRendu to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated compteRendu,
     * or with status {@code 400 (Bad Request)} if the compteRendu is not valid,
     * or with status {@code 500 (Internal Server Error)} if the compteRendu couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/compte-rendus")
    public ResponseEntity<CompteRendu> updateCompteRendu(@Valid @RequestBody CompteRendu compteRendu) throws URISyntaxException {
        log.debug("REST request to update CompteRendu : {}", compteRendu);
        if (compteRendu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompteRendu result = compteRenduRepository.save(compteRendu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, compteRendu.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /compte-rendus} : get all the compteRendus.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of compteRendus in body.
     */
    @GetMapping("/compte-rendus")
    public List<CompteRendu> getAllCompteRendus() {
        log.debug("REST request to get all CompteRendus");
        return compteRenduRepository.findAll();
    }

    /**
     * {@code GET  /compte-rendus/:id} : get the "id" compteRendu.
     *
     * @param id the id of the compteRendu to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the compteRendu, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/compte-rendus/{id}")
    public ResponseEntity<CompteRendu> getCompteRendu(@PathVariable Long id) {
        log.debug("REST request to get CompteRendu : {}", id);
        Optional<CompteRendu> compteRendu = compteRenduRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(compteRendu);
    }

    /**
     * {@code DELETE  /compte-rendus/:id} : delete the "id" compteRendu.
     *
     * @param id the id of the compteRendu to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/compte-rendus/{id}")
    public ResponseEntity<Void> deleteCompteRendu(@PathVariable Long id) {
        log.debug("REST request to delete CompteRendu : {}", id);
        compteRenduRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
