package mims.app.service;

import mims.app.entity.RegionEntity;
import mims.app.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;

    public ResponseEntity<List<RegionEntity>> get_all_regions(){
        return ResponseEntity.ok(regionRepository.findAll());
    }

    public ResponseEntity<RegionEntity> get_region_by_id(int id) {
        return regionRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
