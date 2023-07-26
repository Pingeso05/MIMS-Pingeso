package mims.app.service;

import mims.app.entity.UsuarioEntity;
import mims.app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public ResponseEntity<ArrayList<UsuarioEntity>> get_all_not_deleted() {
        return ResponseEntity.ok((ArrayList<UsuarioEntity>) usuarioRepository.findAllUsuariosByDeletedFalse());
    }

    public ResponseEntity<UsuarioEntity> get_by_id(int id) {
        return usuarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<UsuarioEntity> save(UsuarioEntity usuario) {
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    public ResponseEntity<UsuarioEntity> update(UsuarioEntity usuario, int id) {
        return usuarioRepository.findById(id).map(usuario_data -> {
            usuario_data.setNombre(usuario.getNombre());
            usuario_data.setApellido(usuario.getApellido());
            usuario_data.setDeleted(usuario.getDeleted());
            UsuarioEntity usuario_updated = usuarioRepository.save(usuario_data);
            return ResponseEntity.ok().body(usuario_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<UsuarioEntity> delete(int id) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setDeleted(true);
            UsuarioEntity usuario_deleted = usuarioRepository.save(usuario);
            return ResponseEntity.ok().body(usuario_deleted);
        }).orElse(ResponseEntity.notFound().build());
    }
}
