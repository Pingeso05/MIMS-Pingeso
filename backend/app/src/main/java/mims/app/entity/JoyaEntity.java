package mims.app.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Table(name = "joya")
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class JoyaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "id_tipo_joya")
    private int id_tipo_joya;

    @Column(name = "cost")
    private float cost;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "is_unique")
    private boolean is_unique;



    public void setDeleted(boolean b) {
        this.deleted = b;
    }
}
