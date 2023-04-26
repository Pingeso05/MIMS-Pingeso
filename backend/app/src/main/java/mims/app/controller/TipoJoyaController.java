package mims.app.controller;

import mims.app.entity.TipoJoyaEntity;
import mims.app.service.TipoJoyaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/tipojoya")
@SuppressWarnings("unused")
public class TipoJoyaController {

    @Autowired
    private TipoJoyaService tipoJoyaService;

    @GetMapping
    public ResponseEntity<ArrayList<TipoJoyaEntity>> get_all_tipojoyas() {
        return tipoJoyaService.get_all_tipojoyas_not_deleted();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoJoyaEntity> get_tipojoya_by_id(@PathVariable int id) {
        return tipoJoyaService.get_tipojoya_by_id(id);
    }

    @PostMapping
    public ResponseEntity<TipoJoyaEntity> save_tipojoya(@RequestBody TipoJoyaEntity tipojoya) {
        return tipoJoyaService.save_tipojoya(tipojoya);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoJoyaEntity> update_tipojoya(@RequestBody TipoJoyaEntity tipojoya, @PathVariable int id) {
        return tipoJoyaService.update_tipojoya(tipojoya, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TipoJoyaEntity> delete_tipojoya(@PathVariable int id) {
        return tipoJoyaService.delete_tipojoya(id);
    }
}
