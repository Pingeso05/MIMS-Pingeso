package mims.app.repository;

import mims.app.entity.InventarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository extends JpaRepository<InventarioEntity, Integer> {

        public Iterable<InventarioEntity> findAllByDeletedFalse();

        public Iterable <InventarioEntity> findAllByDeletedFalseAndIdLocacion(int id);
        
        public Iterable <InventarioEntity> findAllByDeletedFalseAndIdJoya(int id);

        public Iterable <InventarioEntity> findAllByDeletedFalseAndIdJoyaAndCantidadGreaterThan(int idJoya, int i);
}
