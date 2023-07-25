package mims.app.controller;

import com.fasterxml.jackson.databind.JsonNode;
import mims.app.Model.DisplayJoyaModelInterface;
import mims.app.Model.DisplayUsuarioModelInterface;
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
    public ArrayList<DisplayUsuarioModelInterface> get_all() {
        return usuarioService.get_all_usuarios_not_deleted();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioEntity> get_by_id(@PathVariable Integer id) {
        return usuarioService.get_by_id(id);
    }

    @PostMapping
    public ResponseEntity<UsuarioEntity> save(@RequestBody UsuarioEntity usuario) {
        return usuarioService.save(usuario);
    }

    @PostMapping("/pass/{id}")
    public ResponseEntity<UsuarioEntity> changepassword(@RequestBody JsonNode requestBody, @PathVariable Integer id) {
        String password = requestBody.get("password").asText();
        return usuarioService.changepassword(password, id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioEntity> update(@RequestBody UsuarioEntity usuario, @PathVariable int id) {
        return usuarioService.update(usuario, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UsuarioEntity> delete(@PathVariable int id) {
        return usuarioService.delete(id);
    }
}
