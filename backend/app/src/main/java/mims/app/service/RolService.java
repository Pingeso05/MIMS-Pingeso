package mims.app.service;

import mims.app.entity.RolEntity;
import mims.app.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {
    @Autowired
    private RolRepository rolRepository;

    public ResponseEntity<List<RolEntity>> get_all_roles(){
        return ResponseEntity.ok(rolRepository.findAll());
    }
    public ResponseEntity<RolEntity> get_rol_by_id(int id) {
        return rolRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }



}
