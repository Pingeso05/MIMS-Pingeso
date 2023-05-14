package mims.app.controller;

import mims.app.entity.UsuarioEntity;
import mims.app.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@SuppressWarnings("unused")
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<ArrayList<UsuarioEntity>> get_all_usuarios() {
        return usuarioService.get_all_usuarios_not_deleted();
    }

    @GetMapping("/id")
    public ResponseEntity<UsuarioEntity> get_usuario_by_id(int id) {
        return usuarioService.get_usuario_by_id(id);
    }

    @PostMapping
    public ResponseEntity<UsuarioEntity> save_usuario(@RequestBody UsuarioEntity usuario) {
        return usuarioService.save_usuario(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioEntity> update_usuario(@RequestBody UsuarioEntity usuario, @PathVariable int id) {
        return usuarioService.update_usuario(usuario, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UsuarioEntity> delete_usuario(@PathVariable int id) {
        return usuarioService.delete_usuario(id);
    }
}
