package mims.app.repository;

import mims.app.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {
    public ArrayList<UsuarioEntity> findAllUsuariosByDeletedFalse();

    Optional<UsuarioEntity> findOneByEmail(String email);
}
