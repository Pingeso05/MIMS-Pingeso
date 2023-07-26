package mims.app.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "roles")
public class RolEntity {
    @Id
    private int id;

    @Column(name = "nombre", nullable = false)
    private String nombre;
}
