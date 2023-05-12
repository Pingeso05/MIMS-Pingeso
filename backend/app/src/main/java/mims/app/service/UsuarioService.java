package mims.app.service;

import mims.app.entity.UsuarioEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public ResponseEntity<ArrayList<UsuarioEntity>> get_all_usuarios_not_deleted() {
        return usuarioRepository.get_all_usuarios_not_deleted();
    }

    public ResponseEntity<UsuarioEntity> get_usuario_by_id(int id) {
        return usuarioRepository.get_usuario_by_id(id);
    }

    public ResponseEntity<UsuarioEntity> save_usuario(UsuarioEntity usuario) {
        return usuarioRepository.save_usuario(usuario);
    }

    public ResponseEntity<UsuarioEntity> update_usuario(UsuarioEntity usuario, int id) {
        return usuarioRepository.update_usuario(usuario, id);
    }

    public ResponseEntity<UsuarioEntity> delete_usuario(int id) {
        return usuarioRepository.delete_usuario(id);
    }
}
