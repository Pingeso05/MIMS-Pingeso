package mims.app.repository;

import mims.app.entity.ComunaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ComunaRepository extends JpaRepository<ComunaEntity, Integer> {
}
