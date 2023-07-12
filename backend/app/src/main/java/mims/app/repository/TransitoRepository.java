package mims.app.repository;

import mims.app.entity.TransitoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransitoRepository extends JpaRepository<TransitoEntity, Integer> {
}
