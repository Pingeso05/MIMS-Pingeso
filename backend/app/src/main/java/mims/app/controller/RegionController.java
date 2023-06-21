package mims.app.controller;

import mims.app.entity.RegionEntity;
import mims.app.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@SuppressWarnings("unused")
@RequestMapping("/region")
@CrossOrigin(origins = "*")
public class RegionController {

    @Autowired
    private RegionService regionService;

    @GetMapping
    public ResponseEntity<List<RegionEntity>> get_all_regions(){
        return regionService.get_all_regions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegionEntity> get_region_by_id(@PathVariable int id) {
        return regionService.get_region_by_id(id);
    }
}
