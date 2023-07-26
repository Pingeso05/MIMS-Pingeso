package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "transito")
@AllArgsConstructor
@NoArgsConstructor
public class TransitoEntity {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(name = "id_joya", nullable = false)
    private int id_joya;

    @Column(name = "id_inventario", nullable = false)
    private int id_inventario;

    @Column(name = "cantidad", nullable = false)
    private int cantidad;

    @Column(name = "id_tipo_joya", nullable = false)
    private int id_tipo_joya;

    @Column(name = "id_origen", nullable = false)
    private int id_origen;

    @Column(name = "id_destino", nullable = false)
    private int id_destino;

    @Column(name = "fecha_salida", nullable = false)
    private String fecha_salida;

    @Column(name = "id_responsable", nullable = false)
    private int id_responsable;

    @Column(name = "deleted", nullable = false)
    private boolean deleted;

}
