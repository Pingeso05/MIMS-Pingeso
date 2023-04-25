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
    private String nombre;
    private int id_tipo_joya;
    private boolean deleted;

    public void setDeleted(boolean b) {
        this.deleted = b;
    }
}
