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
@Table(name = "locacion")
@AllArgsConstructor
@NoArgsConstructor
public class LocacionEntity {

        @Id
        @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
        private int id;
        private String nombre;
        private boolean deleted;

        public void setDeleted(boolean b) {
            this.deleted = b;
        }
}
