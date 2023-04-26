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
    private String nombre;
    private boolean deleted;

    public void setDeleted(boolean b) {
        this.deleted = b;
    }
}
