package mims.app.repository;

import mims.app.entity.JoyaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoyaRepository extends JpaRepository<JoyaEntity, Integer> {

    public Iterable<JoyaEntity> findAllByDeletedFalse();
}
