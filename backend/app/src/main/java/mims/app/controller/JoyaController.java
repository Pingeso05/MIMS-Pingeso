package mims.app.controller;

import mims.app.entity.JoyaEntity;
import mims.app.service.JoyaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/joya")
public class JoyaController {
    @Autowired
    private JoyaService joyaService;

    @GetMapping
    public ResponseEntity<List<JoyaEntity>> get_all_joyas() {
        List<JoyaEntity> joyas = joyaService.get_all_joyas();
        return ResponseEntity.ok(joyas);
    }
}
