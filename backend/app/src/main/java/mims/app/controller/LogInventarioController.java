package mims.app.controller;

import mims.app.entity.LogInventarioEntity;
import mims.app.service.LogInventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class LogInventarioController {

    @Autowired
    private LogInventarioService logInventarioService;

    @GetMapping
    public ResponseEntity<ArrayList<LogInventarioEntity>> get_all() {
        return logInventarioService.get_all_not_deleted();
    }

    @GetMapping("/id")
    public ResponseEntity<LogInventarioEntity> get_by_id(int id) {
        return logInventarioService.get_by_id(id);
    }

    @PostMapping
    public ResponseEntity<LogInventarioEntity> save(@RequestBody LogInventarioEntity logInventario) {
        return logInventarioService.save(logInventario);
    }
}
