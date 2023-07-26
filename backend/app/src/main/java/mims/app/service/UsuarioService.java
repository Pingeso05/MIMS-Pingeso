package mims.app.service;

import mims.app.Model.DisplayJoyaModelInterface;
import mims.app.Model.DisplayUsuarioModelInterface;
import mims.app.entity.UsuarioEntity;
import mims.app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public ArrayList<DisplayUsuarioModelInterface> get_all_usuarios_not_deleted() {
        return usuarioRepository.findAllUsuariosNotDeleted();
    }

    public ResponseEntity<UsuarioEntity> get_by_id(int id) {
        return usuarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<UsuarioEntity> save(UsuarioEntity usuario) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String contrasenaEncriptada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(contrasenaEncriptada);
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    public ResponseEntity<UsuarioEntity> changepassword(String password, int id){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String contrasenaEncriptada = passwordEncoder.encode(password);
        return usuarioRepository.findById(id).map(usuario_data -> {
            usuario_data.setPassword(contrasenaEncriptada);
            UsuarioEntity usuario_updated = usuarioRepository.save(usuario_data);
            return ResponseEntity.ok().body(usuario_updated);
        }).orElse(ResponseEntity.notFound().build());
    }
    public ResponseEntity<UsuarioEntity> update(UsuarioEntity usuario, int id) {
        return usuarioRepository.findById(id).map(usuario_data -> {
            usuario_data.setNombre(usuario.getNombre());
            usuario_data.setApellido(usuario.getApellido());
            usuario_data.setEmail(usuario.getEmail());
            usuario_data.setRol(usuario.getRol());
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
