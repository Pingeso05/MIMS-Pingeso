package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Set;

@Entity
@Data
@Table(name = "tipo_joya")
@AllArgsConstructor
@NoArgsConstructor
public class TipoJoyaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;
    private boolean deleted;

    public void setDeleted(boolean b) {
        this.deleted = b;
    }
}
