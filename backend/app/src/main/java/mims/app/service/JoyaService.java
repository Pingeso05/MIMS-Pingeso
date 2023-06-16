package mims.app.service;

import mims.app.Model.DisplayJoyaModelInterface;
import mims.app.entity.JoyaEntity;
import mims.app.repository.JoyaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JoyaService {
    @Autowired
    private JoyaRepository joyaRepository;

    public ArrayList<DisplayJoyaModelInterface> get_all_joyas_not_deleted() {
        return joyaRepository.findAllJoyasNotDeleted();
    }


    public ResponseEntity<JoyaEntity> get_joya_by_id(int id) {
        return joyaRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<JoyaEntity> update_joya(JoyaEntity joya, int id) {
        return joyaRepository.findById(id).map(joya_data -> {
            joya_data.setNombre(joya.getNombre());
            joya_data.setId_tipo_joya(joya.getId_tipo_joya());
            JoyaEntity joya_updated = joyaRepository.save(joya_data);
            return ResponseEntity.ok().body(joya_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<JoyaEntity> save_joya(JoyaEntity joya) {
        return ResponseEntity.ok(joyaRepository.save(joya));
    }

    public ResponseEntity<JoyaEntity> soft_delete_joya(int id) {
           return joyaRepository.findById(id).map(joya -> {
                joya.setDeleted(true);
                JoyaEntity joya_deleted = joyaRepository.save(joya);
                return ResponseEntity.ok().body(joya_deleted);
            }).orElse(ResponseEntity.notFound().build());
    }

}
