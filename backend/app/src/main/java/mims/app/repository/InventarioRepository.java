package mims.app.repository;

import mims.app.entity.InventarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepository extends JpaRepository<InventarioEntity, Integer> {

        public Iterable<InventarioEntity> findAllByDeletedFalse();
}
