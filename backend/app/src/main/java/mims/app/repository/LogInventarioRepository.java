package mims.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface LogInventarioRepository extends JpaRepository<LogInventarioRepository, Integer> {
}
