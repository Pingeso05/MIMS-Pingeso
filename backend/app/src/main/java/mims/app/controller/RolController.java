package mims.app.controller;

import mims.app.entity.RolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import mims.app.service.RolService;

@RestController
@RequestMapping("/rol")
@CrossOrigin(origins = "*")
@SuppressWarnings("unused")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public ResponseEntity<ArrayList<RolEntity>> get_all() {
        return rolService.get_all_not_deleted();
    }

    @GetMapping("/id")
    public ResponseEntity<RolEntity> get_by_id(int id) {
        return rolService.get_by_id(id);
    }

    @PostMapping
    public ResponseEntity<RolEntity> save(@RequestBody RolEntity rol) {
        return rolService.save(rol);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolEntity> update(@RequestBody RolEntity rol, @PathVariable int id) {
        return rolService.update(rol, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RolEntity> delete(@PathVariable int id) {
        return rolService.delete(id);
    }
}
