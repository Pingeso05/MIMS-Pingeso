package mims.app.repository;

import mims.app.Model.DisplayLogInventarioModelInterface;
import mims.app.entity.LogInventarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface LogInventarioRepository extends JpaRepository<LogInventarioEntity, Integer> {
    @Query(value = "SELECT log_inventario.id, " +
                            "log_inventario.id_producto, " +
                            "joya.nombre AS nombre_producto, " +
                            "usuario.nombre AS responsable_transaccion, " +
                            "log_inventario.fecha_transaccion, " +
                            "log_inventario.valor_transaccion, " +
                            "log_inventario.cantidad, " +
                            "log_inventario.transaccion, " +
                            "locacion.nombre AS nombre_locacion " +
                    "FROM mims.log_inventario, " +
                            "mims.inventario, " +
                            "mims.joya, " +
                            "mims.usuario, " +
                            "mims.locacion " +
                    "WHERE log_inventario.id_producto = inventario.id " +
                        "AND inventario.id_joya = joya.id " +
                        "AND log_inventario.responsable_transaccion = usuario.id " +
                        "AND log_inventario.id_locacion = locacion.id", nativeQuery = true)
    ArrayList<DisplayLogInventarioModelInterface> findAllLogInventario();
}
