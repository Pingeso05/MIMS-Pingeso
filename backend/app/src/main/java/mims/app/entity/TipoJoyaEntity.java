package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;


@Entity
@Data
@Table(name = "tipo_joya")
@AllArgsConstructor
@NoArgsConstructor
public class TipoJoyaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "material", nullable = false)
    private String material;

    @Column(name = "deleted", nullable = false)
    private boolean deleted;

    public void setDeleted(boolean b) {
        this.deleted = b;
    }
}
