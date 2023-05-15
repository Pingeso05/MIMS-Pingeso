package mims.app.controller;

import mims.app.Model.DisplayInventarioModelInterface;
import mims.app.entity.InventarioEntity;
import mims.app.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/inventario")
@CrossOrigin(origins = "*")
@SuppressWarnings("unused")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    @GetMapping
    public ArrayList<DisplayInventarioModelInterface> get_all() {
        return inventarioService.get_all_inventarios_not_deleted();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventarioEntity> get_by_id(@PathVariable int id) {
        return inventarioService.get_inventario_by_id(id);
    }

    @PostMapping
    public ResponseEntity<InventarioEntity> save(@RequestBody InventarioEntity inventario) {
        return inventarioService.save_inventario(inventario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventarioEntity> update(@RequestBody InventarioEntity inventario, @PathVariable int id) {
        return inventarioService.update_inventario(inventario, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<InventarioEntity> delete(@PathVariable int id) {
        return inventarioService.delete_inventario(id);
    }
}
