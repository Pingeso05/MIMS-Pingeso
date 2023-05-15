package mims.app.service;

import mims.app.entity.LogInventarioEntity;
import mims.app.repository.LogInventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class LogInventarioService {
    @Autowired
    private LogInventarioRepository logInventarioRepository;

    public ResponseEntity<ArrayList<LogInventarioEntity>> get_all_not_deleted() {
        return ResponseEntity.ok((ArrayList<LogInventarioEntity>) logInventarioRepository.findAllByDeletedFalse());
    }

    public ResponseEntity<LogInventarioEntity> get_by_id(int id) {
        return logInventarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<LogInventarioEntity> save(LogInventarioEntity logInventario) {
        return ResponseEntity.ok(logInventarioRepository.save(logInventario));
    }
}
