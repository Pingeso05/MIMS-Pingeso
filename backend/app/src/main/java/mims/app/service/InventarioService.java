package mims.app.service;

import mims.app.entity.InventarioEntity;
import mims.app.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class InventarioService {
    @Autowired
    private InventarioRepository inventarioRepository;

    public ResponseEntity<ArrayList<InventarioEntity>> get_all_inventarios_not_deleted() {
        return ResponseEntity.ok((ArrayList<InventarioEntity>) inventarioRepository.findAllByDeletedFalse());
    }

    public ResponseEntity<InventarioEntity> get_inventario_by_id(int id) {
        return inventarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<InventarioEntity> update_inventario(InventarioEntity inventario, int id) {
        return inventarioRepository.findById(id).map(inventario_data -> {
            inventario_data.setCantidad(inventario.getCantidad());
            InventarioEntity inventario_updated = inventarioRepository.save(inventario_data);
            return ResponseEntity.ok().body(inventario_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<InventarioEntity> save_inventario(InventarioEntity inventario) {
        return ResponseEntity.ok(inventarioRepository.save(inventario));
    }

    public ResponseEntity<InventarioEntity> delete_inventario(int id) {
        return inventarioRepository.findById(id).map(inventario -> {
            inventario.setDeleted(true);
            InventarioEntity inventario_deleted = inventarioRepository.save(inventario);
            return ResponseEntity.ok().body(inventario_deleted);
        }).orElse(ResponseEntity.notFound().build());
    }


}
