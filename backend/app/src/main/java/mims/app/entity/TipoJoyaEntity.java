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

    @Column(name = "created_by", nullable = false)
    private int created_by;

    @Column(name = "updated_by", nullable = false)
    private int updated_by;

    @Column(name = "created_at", nullable = false)
    private java.sql.Timestamp created_at;

    @Column(name = "updated_at", nullable = false)
    private java.sql.Timestamp updated_at;

    @Column(name = "material", nullable = false)
    private String material;

    @Column(name = "deleted", nullable = false)
    private boolean deleted;

    public void setDeleted(boolean b) {
        this.deleted = b;
    }
}
