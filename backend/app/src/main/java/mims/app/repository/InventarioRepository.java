package mims.app.repository;

import mims.app.Model.DisplayInventarioModelInterface;
import mims.app.entity.InventarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface InventarioRepository extends JpaRepository<InventarioEntity, Integer> {

        public Iterable<InventarioEntity> findAllByDeletedFalse();

        @Query(value = "SELECT inventario.id, inventario.nombre_producto, inventario.cantidad, joya.cost, inventario.precio_venta, joya.nombre AS joya, tipo_joya.nombre AS tipo_joya, locacion.nombre AS local FROM mims.inventario, mims.joya, mims.locacion, mims.tipo_joya WHERE inventario.id_joya = joya.id AND joya.id_tipo_joya = tipo_joya.id AND inventario.id_locacion = locacion.id", nativeQuery = true)
        public ArrayList<DisplayInventarioModelInterface> findAllInventario();

        @Query(value = "UPDATE mims.inventario SET cantidad = cantidad + 1 WHERE id = :id", nativeQuery = true)
        public void quantityPlusOne(@Param("id") int id);
}
