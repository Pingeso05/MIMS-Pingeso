package mims.app.repository;

import mims.app.Model.DisplayTransitoModel;
import mims.app.entity.TransitoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TransitoRepository extends JpaRepository<TransitoEntity, Integer> {

    @Query(value = "SELECT transito.id, joya.nombre AS joya, transito.cantidad, locacion1.nombre AS origen, locacion2.nombre AS destino, transito.fecha_salida, usuario.nombre AS responsable, tipo_joya.nombre AS tipo_producto " +  
    "FROM mims.transito, mims.joya, mims.locacion AS locacion1, mims.locacion AS locacion2, mims.usuario, mims.tipo_joya "+ 
    "WHERE transito.id_joya = joya.id AND transito.id_origen = locacion1.id AND transito.id_destino = locacion2.id AND transito.id_responsable = usuario.id AND transito.id_tipo_joya = tipo_joya.id", nativeQuery = true)
    public ArrayList<DisplayTransitoModel> findAllTransito();
}
