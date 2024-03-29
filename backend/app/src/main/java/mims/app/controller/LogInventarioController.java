package mims.app.controller;

import mims.app.Model.DisplayLogInventarioModelInterface;
import mims.app.entity.LogInventarioEntity;
import mims.app.service.LogInventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/log_inventario")
@CrossOrigin(origins = "*")
public class LogInventarioController {

    @Autowired
    private LogInventarioService logInventarioService;

    @GetMapping
    public ResponseEntity<ArrayList<DisplayLogInventarioModelInterface>> get_all_log_inventario(){
        return logInventarioService.get_all_log_inventario();
    }

    @PostMapping
    public ResponseEntity<LogInventarioEntity> save_log_inventario(@RequestBody LogInventarioEntity logInventario){
        return logInventarioService.save_log_inventario(logInventario);
    }
}
