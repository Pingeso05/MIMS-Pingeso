package mims.app.service;

import mims.app.entity.TipoJoyaEntity;
import mims.app.repository.TipoJoyaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@SuppressWarnings("unused")
public class TipoJoyaService {
    @Autowired
    private TipoJoyaRepository tipoJoyaRepository;

    public ResponseEntity<ArrayList<TipoJoyaEntity>> get_all_tipojoyas_not_deleted() {
        return ResponseEntity.ok((ArrayList<TipoJoyaEntity>) tipoJoyaRepository.findAllByDeletedFalse());
    }

    public ResponseEntity<TipoJoyaEntity> get_tipojoya_by_id(int id) {
        return tipoJoyaRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<TipoJoyaEntity> update_tipojoya(TipoJoyaEntity tipojoya, int id) {
        return tipoJoyaRepository.findById(id).map(tipojoya_data -> {
            tipojoya_data.setNombre(tipojoya.getNombre());
            tipojoya_data.setMaterial(tipojoya.getMaterial());
            TipoJoyaEntity tipojoya_updated = tipoJoyaRepository.save(tipojoya_data);
            return ResponseEntity.ok().body(tipojoya_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<TipoJoyaEntity> save_tipojoya(TipoJoyaEntity tipojoya) {
        return ResponseEntity.ok(tipoJoyaRepository.save(tipojoya));
    }

    public ResponseEntity<TipoJoyaEntity> delete_tipojoya(int id) {
        return tipoJoyaRepository.findById(id).map(tipojoya -> {
            tipojoya.setDeleted(true);
            TipoJoyaEntity tipojoya_deleted = tipoJoyaRepository.save(tipojoya);
            return ResponseEntity.ok().body(tipojoya_deleted);
        }).orElse(ResponseEntity.notFound().build());
    }




}
