package mims.app.repository;

import mims.app.entity.TipoJoyaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoJoyaRepository extends JpaRepository<TipoJoyaEntity, Integer> {
    public Iterable<TipoJoyaEntity> findAllByDeletedFalse();
}
