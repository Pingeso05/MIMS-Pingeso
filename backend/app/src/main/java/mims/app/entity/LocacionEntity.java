package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "locacion")
@AllArgsConstructor
@NoArgsConstructor
public class LocacionEntity {

        @Id
        @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
        private int id;

        @Column(name = "nombre")
        private String nombre;

        @Column(name = "direccion")
        private String direccion;

        private boolean deleted;

        public void setDeleted(boolean b) {
            this.deleted = b;
        }
}
