package mims.app.repository;

import mims.app.Model.DisplayJoyaModelInterface;
import mims.app.entity.JoyaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface JoyaRepository extends JpaRepository<JoyaEntity, Integer> {

    public Iterable<JoyaEntity> findAllByDeletedFalse();

    //Esta query trae todas las joyas que no estan borradas y reemplaza el campo id por el nombre del tipo de joya
    @Query(value = "SELECT joya.id, joya.nombre, tipo_joya.nombre AS tipo_joya FROM mims.joya, mims.tipo_joya WHERE joya.id_tipo_joya = tipo_joya.id AND joya.deleted = 0", nativeQuery = true)
    public ArrayList<DisplayJoyaModelInterface> findAllJoyasNotDeleted();
}
