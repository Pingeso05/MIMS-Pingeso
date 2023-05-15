package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "rol")
@AllArgsConstructor
@NoArgsConstructor
public class RolEntity {
    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "created_by")
    private int created_by;

    @Column(name = "updated_by")
    private int updated_by;

    @Column(name = "created_at")
    private java.sql.Timestamp created_at;

    @Column(name = "updated_at")
    private java.sql.Timestamp updated_at;

    @Column(name = "deleted")
    private boolean deleted;

    public boolean getDeleted() {
        return this.deleted;
    }
}
