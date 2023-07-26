package mims.app.controller;

import mims.app.entity.RolEntity;
import mims.app.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@SuppressWarnings("unused")
@RequestMapping("/rol")
@CrossOrigin(origins = "*")
public class RolController {
    @Autowired
    private RolService rolService;

    @GetMapping
    public ResponseEntity<List<RolEntity>> get_all_roles(){
        return rolService.get_all_roles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RolEntity> get_rol_by_id(@PathVariable int id) {
        return rolService.get_rol_by_id(id);
    }
}
