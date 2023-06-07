package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "log_inventario")
@AllArgsConstructor
@NoArgsConstructor
public class LogInventarioEntity {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(name = "id_inventario")
    private int id_inventario;

    @Column(name = "id_usuario")
    private int id_usuario;

    @Column(name = "cantidad_agregada")
    private int cantidad_agregada;

    @Column(name = "cantidad_eliminada")
    private int cantidad_eliminada;

    @Column(name = "fecha_registro", nullable = false)
    private java.sql.Timestamp fecha_registro;

}
