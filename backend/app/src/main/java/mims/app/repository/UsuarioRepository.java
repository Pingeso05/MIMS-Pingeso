package mims.app.repository;

import mims.app.Model.DisplayUsuarioModelInterface;
import mims.app.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {


    Optional<UsuarioEntity> findOneByEmail(String email);
    @Query(value = "SELECT usuario.id, usuario.nombre, usuario.apellido, usuario.email, roles.nombre AS rol FROM mims.usuario, mims.roles WHERE roles.id = usuario.rol AND usuario.deleted = 0", nativeQuery = true)
    public ArrayList<DisplayUsuarioModelInterface> findAllUsuariosNotDeleted();
}
