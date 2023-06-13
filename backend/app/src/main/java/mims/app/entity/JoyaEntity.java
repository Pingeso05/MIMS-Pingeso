package mims.app.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "joya")
@Entity
@AllArgsConstructor
@NoArgsConstructor
/**
 * Esta clase representa la tabla joya
 * */
public class JoyaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "id_tipo_joya")
    private int id_tipo_joya;

    @Column(name = "deleted")
    private boolean deleted;

    public void setDeleted(boolean b) {
        this.deleted = b;
    }
}
