package mims.app.repository;

import mims.app.entity.LogInventarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface LogInventarioRepository extends JpaRepository<LogInventarioEntity, Integer> {
    Iterable<LogInventarioEntity> findAllByDeletedFalse();
}
