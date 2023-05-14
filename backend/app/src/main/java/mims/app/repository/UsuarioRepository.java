package mims.app.repository;

import mims.app.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    ResponseEntity<ArrayList<UsuarioEntity>> get_all_usuarios_not_deleted();
}
