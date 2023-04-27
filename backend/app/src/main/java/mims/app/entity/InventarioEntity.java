package mims.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "inventario")
@AllArgsConstructor
@NoArgsConstructor
public class InventarioEntity {

        @Id
        @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
        private int id;
        private int id_locacion;
        private int id_joya;
        private int cantidad;
        private boolean deleted;

        public void setDeleted(boolean b) {
            this.deleted = b;
        }
}
