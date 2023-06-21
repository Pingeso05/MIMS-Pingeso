package mims.app.controller;

import mims.app.entity.ComunaEntity;
import mims.app.service.ComunaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class ComunaController {
    @Autowired
    private ComunaService comunaService;

    public ResponseEntity<ArrayList<ComunaEntity>> get_all_comunas(){
        return comunaService.get_all_comunas();
    }

    public ResponseEntity<ComunaEntity> get_comuna_by_id(int id) {
        return comunaService.get_comuna_by_id(id);
    }
}
