package dz.elit.clinique.web.rest;

import dz.elit.clinique.domain.Visite;
import dz.elit.clinique.repository.VisiteRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link dz.elit.clinique.domain.Visite}.
 */
@RestController
@RequestMapping("/api")
public class VisiteResource {

    private final Logger log = LoggerFactory.getLogger(VisiteResource.class);

    private static final String ENTITY_NAME = "visite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisiteRepository visiteRepository;

    public VisiteResource(VisiteRepository visiteRepository) {
        this.visiteRepository = visiteRepository;
    }

    /**
     * {@code POST  /visites} : Create a new visite.
     *
     * @param visite the visite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visite, or with status {@code 400 (Bad Request)} if the visite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visites")
    public ResponseEntity<Visite> createVisite(@Valid @RequestBody Visite visite) throws URISyntaxException {
        log.debug("REST request to save Visite : {}", visite);
        if (visite.getId() != null) {
            throw new BadRequestAlertException("A new visite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Visite result = visiteRepository.save(visite);
        return ResponseEntity.created(new URI("/api/visites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visites} : Updates an existing visite.
     *
     * @param visite the visite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visite,
     * or with status {@code 400 (Bad Request)} if the visite is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visites")
    public ResponseEntity<Visite> updateVisite(@Valid @RequestBody Visite visite) throws URISyntaxException {
        log.debug("REST request to update Visite : {}", visite);
        if (visite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Visite result = visiteRepository.save(visite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visite.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /visites} : get all the visites.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visites in body.
     */
    @GetMapping("/visites")
    public List<Visite> getAllVisites(@RequestParam(required = false) String filter) {
        if ("compterendu-is-null".equals(filter)) {
            log.debug("REST request to get all Visites where compteRendu is null");
            return StreamSupport
                .stream(visiteRepository.findAll().spliterator(), false)
                .filter(visite -> visite.getCompteRendu() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Visites");
        return visiteRepository.findAll();
    }

    /**
     * {@code GET  /visites/:id} : get the "id" visite.
     *
     * @param id the id of the visite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visites/{id}")
    public ResponseEntity<Visite> getVisite(@PathVariable Long id) {
        log.debug("REST request to get Visite : {}", id);
        Optional<Visite> visite = visiteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(visite);
    }

    /**
     * {@code DELETE  /visites/:id} : delete the "id" visite.
     *
     * @param id the id of the visite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visites/{id}")
    public ResponseEntity<Void> deleteVisite(@PathVariable Long id) {
        log.debug("REST request to delete Visite : {}", id);
        visiteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
