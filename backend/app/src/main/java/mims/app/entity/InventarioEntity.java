package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "inventario")
@AllArgsConstructor
@NoArgsConstructor
public class InventarioEntity {

        @Id
        @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
        private int id;

        @Column(name = "id_locacion")
        private int id_locacion;

        @Column(name = "id_joya")
        private int id_joya;

        @Column(name = "cantidad")
        private int cantidad;

        @Column(name = "precio")
        private float precio;

        private boolean deleted;

        public void setDeleted(boolean b) {
            this.deleted = b;
        }
}
