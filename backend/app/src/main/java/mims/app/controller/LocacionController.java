package mims.app.controller;

import mims.app.entity.LocacionEntity;
import mims.app.service.LocacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@SuppressWarnings("unused")
@RequestMapping("/locacion")
public class LocacionController {

    @Autowired
    private LocacionService locacionService;

    @GetMapping
    public ResponseEntity<ArrayList<LocacionEntity>> get_all_locaciones() {
        return locacionService.get_all_locaciones_not_deleted();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocacionEntity> get_locacion_by_id(@PathVariable int id) {
        return locacionService.get_locacion_by_id(id);
    }

    @PostMapping
    public ResponseEntity<LocacionEntity> save_locacion(@RequestBody LocacionEntity locacion) {
        return locacionService.save_locacion(locacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocacionEntity> update_locacion(@RequestBody LocacionEntity locacion, @PathVariable int id) {
        return locacionService.update_locacion(locacion, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LocacionEntity> delete_locacion(@PathVariable int id) {
        return locacionService.delete_locacion(id);
    }
}
