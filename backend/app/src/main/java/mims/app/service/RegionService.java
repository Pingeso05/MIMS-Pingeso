package mims.app.service;

import mims.app.entity.RegionEntity;
import mims.app.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;

    public ResponseEntity<ArrayList<RegionEntity>> get_all_regions(){
        return regionRepository.get_all_regions();
    }

    public ResponseEntity<RegionEntity> get_region_by_id(int id) {
        return regionRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
