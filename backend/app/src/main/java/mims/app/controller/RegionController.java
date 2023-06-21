package mims.app.controller;

import mims.app.entity.RegionEntity;
import mims.app.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class RegionController {

    @Autowired
    private RegionService regionService;

    public ResponseEntity<ArrayList<RegionEntity>> get_all_regions(){
        return regionService.get_all_regions();
    }

    public ResponseEntity<RegionEntity> get_region_by_id(int id) {
        return regionService.get_region_by_id(id);
    }
}
