package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "usuario")
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "rol")
    private int rol;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "created_by")
    private int created_by;

    @Column(name = "updated_by")
    private int updated_by;

    @Column(name = "created_at")
    private Date created_at;

    @Column(name = "updated_at")
    private Date updated_at;

    public void setDeleted(boolean b) {
        this.deleted = b;
    }

    public void setRol(int rol) {
        this.rol = rol;
    }

    public boolean getDeleted() {
        return this.deleted;
    }
}
