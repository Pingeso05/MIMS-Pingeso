package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "log_inventario")
@AllArgsConstructor
@NoArgsConstructor
public class LogInventarioEntity {
    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(name = "id_producto", nullable = false)
    private int id_producto;
    @Column(name = "nombre_producto", nullable = false)
    private String nombre_producto;
    @Column(name = "tipo_producto", nullable = false)
    private String tipo_producto;
    @Column(name = "id_locacion", nullable = false)
    private String nombre_locacion;
    @Column(name = "cantidad", nullable = false)
    private int cantidad;
    @Column(name = "transaccion", nullable = false)
    private String tipo_transaccion;
    @Column(name = "fecha_transaccion", nullable = false)
    private String fecha_transaccion;
    @Column(name = "valor_transaccion", nullable = true)
    private float valor_transaccion;
    @Column(name = "responsable_transaccion", nullable = false)
    private String responsable_transaccion;

}
