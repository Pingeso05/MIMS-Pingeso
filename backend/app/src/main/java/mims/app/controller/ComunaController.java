package mims.app.controller;

import mims.app.entity.ComunaEntity;
import mims.app.service.ComunaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@SuppressWarnings("unused")
@RequestMapping("/comuna")
@CrossOrigin(origins = "*")
public class ComunaController {
    @Autowired
    private ComunaService comunaService;

    public ResponseEntity<ArrayList<ComunaEntity>> get_all_comunas(){
        return (ResponseEntity<ArrayList<ComunaEntity>>) comunaService.get_all_comunas();
    }

    public ResponseEntity<ComunaEntity> get_comuna_by_id(@PathVariable int id) {
        return comunaService.get_comuna_by_id(id);
    }
}
