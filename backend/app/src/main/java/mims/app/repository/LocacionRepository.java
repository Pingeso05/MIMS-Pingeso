package mims.app.repository;

import mims.app.entity.LocacionEntity;
import mims.app.Model.DisplayLocacionModelInterface;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacionRepository extends JpaRepository<LocacionEntity, Integer> {

    
    public Iterable<LocacionEntity> findAllByDeletedFalse();

    @Query(value = "SELECT locacion.id, locacion.nombre, locacion.direccion, comuna.nombre AS comuna, region.nombre AS region FROM mims.region, mims.locacion, mims.comuna WHERE locacion.comuna = comuna.id AND locacion.region = region.id", nativeQuery = true)
    public ArrayList<DisplayLocacionModelInterface> findAllLocacion();

}
