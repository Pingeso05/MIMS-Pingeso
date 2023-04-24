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
    private int idTipoJoya;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getIdTipoJoya() {
        return idTipoJoya;
    }

    public void setIdTipoJoya(int idTipoJoya) {
        this.idTipoJoya = idTipoJoya;
    }
}
