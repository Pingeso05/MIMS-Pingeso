package mims.app.repository;

import mims.app.Model.DisplayTransitoModel;
import mims.app.entity.TransitoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TransitoRepository extends JpaRepository<TransitoEntity, Integer> {

    @Query(value = "SELECT transito.id, joya.nombre AS joya, transito.cantidad, locacion.nombre AS origen, locacion.nombre AS destino, transito.numero_transaccion, transito.fecha_salida, usuario.nombre AS responsable FROM mims.transito, mims.joya, mims.locacion, mims.usuario WHERE transito.id_joya = joya.id AND transito.id_origen = locacion.id AND transito.id_destino = locacion.id AND transito.id_responsable = usuario.id", nativeQuery = true)
    public ArrayList<DisplayTransitoModel> findAllTransito();
}
