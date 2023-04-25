package mims.app.controller;

import mims.app.entity.JoyaEntity;
import mims.app.service.JoyaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/joya")
public class JoyaController {
    @Autowired
    private JoyaService joyaService;

    @GetMapping
    public ResponseEntity<ArrayList<JoyaEntity>> get_all_joyas() {
        return joyaService.get_all_joyas_not_deleted();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JoyaEntity> get_joya_by_id(@PathVariable int id) {
        return joyaService.get_joya_by_id(id);
    }

    @PostMapping
    public ResponseEntity<JoyaEntity> save_joya(@RequestBody JoyaEntity joya) {
        return joyaService.save_joya(joya);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JoyaEntity> update_joya(@RequestBody JoyaEntity joya, @PathVariable int id) {
        return joyaService.update_joya(joya, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete_joya(@PathVariable int id) {
        return joyaService.soft_delete_joya(id);
    }
}
