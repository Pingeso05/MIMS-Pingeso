package mims.app.repository;

import mims.app.entity.LocacionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacionRepository extends JpaRepository<LocacionEntity, Integer> {

    public Iterable<LocacionEntity> findAllByDeletedFalse();
}
