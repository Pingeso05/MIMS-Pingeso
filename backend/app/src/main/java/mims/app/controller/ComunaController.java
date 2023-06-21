package mims.app.controller;

import mims.app.entity.ComunaEntity;
import mims.app.service.ComunaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@SuppressWarnings("unused")
@RequestMapping("/comuna")
@CrossOrigin(origins = "*")
public class ComunaController {
    @Autowired
    private ComunaService comunaService;

    @GetMapping
    public ResponseEntity<List<ComunaEntity>> get_all_comunas(){
        return comunaService.get_all_comunas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComunaEntity> get_comuna_by_id(@PathVariable int id) {
        return comunaService.get_comuna_by_id(id);
    }
}
