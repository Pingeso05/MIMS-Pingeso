package mims.app.service;

import mims.app.Model.DisplayLocacionModelInterface;
import mims.app.entity.LocacionEntity;
import mims.app.repository.LocacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class LocacionService {

    @Autowired
    private LocacionRepository locacionRepository;

    public ArrayList<DisplayLocacionModelInterface> get_all_locaciones_not_deleted() {
        return locacionRepository.findAllLocacion();
    }

    public ResponseEntity<LocacionEntity> get_locacion_by_id(int id) {
        return locacionRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<LocacionEntity> update_locacion(LocacionEntity locacion, int id) {
        return locacionRepository.findById(id).map(locacion_data -> {
            locacion_data.setNombre(locacion.getNombre());
            locacion_data.setDireccion(locacion.getDireccion());
            LocacionEntity locacion_updated = locacionRepository.save(locacion_data);
            return ResponseEntity.ok().body(locacion_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<LocacionEntity> save_locacion(LocacionEntity locacion) {
        return ResponseEntity.ok(locacionRepository.save(locacion));
    }

    public ResponseEntity<LocacionEntity> delete_locacion(int id) {
        return locacionRepository.findById(id).map(locacion -> {
            locacion.setDeleted(true);
            LocacionEntity locacion_deleted = locacionRepository.save(locacion);
            return ResponseEntity.ok().body(locacion_deleted);
        }).orElse(ResponseEntity.notFound().build());
    }
}
