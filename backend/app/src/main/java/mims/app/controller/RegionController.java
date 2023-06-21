package mims.app.controller;

import mims.app.entity.RegionEntity;
import mims.app.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@SuppressWarnings("unused")
@RequestMapping("/region")
@CrossOrigin(origins = "*")
public class RegionController {

    @Autowired
    private RegionService regionService;

    public ResponseEntity<ArrayList<RegionEntity>> get_all_regions(){
        return regionService.get_all_regions();
    }

    public ResponseEntity<RegionEntity> get_region_by_id(@PathVariable int id) {
        return regionService.get_region_by_id(id);
    }
}
