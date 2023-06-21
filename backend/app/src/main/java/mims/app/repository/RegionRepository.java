package mims.app.repository;

import mims.app.entity.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface RegionRepository extends JpaRepository<RegionEntity, Integer> {
}
