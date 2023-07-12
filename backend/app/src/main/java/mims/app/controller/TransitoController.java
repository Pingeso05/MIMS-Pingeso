package mims.app.controller;

import mims.app.entity.TransitoEntity;
import mims.app.service.TransitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transito")
@CrossOrigin(origins = "*")
public class TransitoController {

    @Autowired
    private TransitoService transitoService;

    @GetMapping
    public ResponseEntity<List<TransitoEntity>> get_all(){
        return transitoService.get_all_transitos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransitoEntity> get_by_id(int id){
        return transitoService.get_transito_by_id(id);
    }

    @PostMapping
    public ResponseEntity<TransitoEntity> create(@RequestBody TransitoEntity transitoEntity){
        return transitoService.create_transito(transitoEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransitoEntity> update(@RequestBody TransitoEntity transitoEntity, @PathVariable int id){
        return transitoService.update_transito(transitoEntity, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TransitoEntity> delete(@PathVariable int id){
        return transitoService.delete_transito(id);
    }

}
