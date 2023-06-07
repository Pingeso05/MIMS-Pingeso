package mims.app.service;

import mims.app.entity.RolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import mims.app.repository.RolRepository;
import java.util.ArrayList;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public ResponseEntity<ArrayList<RolEntity>> get_all_not_deleted() {
        return ResponseEntity.ok((ArrayList<RolEntity>) rolRepository.findAllByDeletedFalse());
    }

    public ResponseEntity<RolEntity> get_by_id(int id) {
        return rolRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<RolEntity> save(RolEntity rol) {
        return ResponseEntity.ok(rolRepository.save(rol));
    }

    public ResponseEntity<RolEntity> update(RolEntity rol, int id) {
        return rolRepository.findById(id).map(rol_data -> {
            rol_data.setNombre(rol.getNombre());
            rol_data.setDeleted(rol.getDeleted());
            RolEntity rol_updated = rolRepository.save(rol_data);
            return ResponseEntity.ok().body(rol_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<RolEntity> delete(int id) {
        return rolRepository.findById(id).map(rol -> {
            rol.setDeleted(true);
            RolEntity rol_deleted = rolRepository.save(rol);
            return ResponseEntity.ok().body(rol_deleted);
        }).orElse(ResponseEntity.notFound().build());
    }

}
