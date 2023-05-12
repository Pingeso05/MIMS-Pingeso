package mims.app.service;

import mims.app.Model.DisplayInventarioModelInterface;
import mims.app.entity.InventarioEntity;
import mims.app.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class InventarioService {

    /**
     * se inyecta el repositorio de inventario
     */
    @Autowired
    private InventarioRepository inventarioRepository;

    /**
     * este metodo devuelve todos los inventarios que no estan borrados
     * @return ResponseEntity<ArrayList<InventarioEntity>>
     */
    public ArrayList<DisplayInventarioModelInterface> get_all_inventarios_not_deleted() {
        return inventarioRepository.findAllInventario();
    }


    /**
     * este metodo devuelve un inventario por id
     * @return ResponseEntity<InventarioEntity>
     */
    public ResponseEntity<InventarioEntity> get_inventario_by_id(int id) {
        return inventarioRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * este metodo actualiza un inventario
     * @return ResponseEntity<InventarioEntity>
     */
    public ResponseEntity<InventarioEntity> update_inventario(InventarioEntity inventario, int id) {
        return inventarioRepository.findById(id).map(inventario_data -> {
            inventario_data.setCantidad(inventario.getCantidad());
            inventario_data.setId_joya(inventario.getId_joya());
            inventario_data.setPrecio(inventario.getPrecio());
            inventario_data.setId_locacion(inventario.getId_locacion());
            inventario_data.setId_tipo_joya(inventario.getId_tipo_joya());
            InventarioEntity inventario_updated = inventarioRepository.save(inventario_data);
            return ResponseEntity.ok().body(inventario_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * este metodo crea un inventario
     * @return ResponseEntity<InventarioEntity>
     */
    public ResponseEntity<InventarioEntity> save_inventario(InventarioEntity inventario) {
        return ResponseEntity.ok(inventarioRepository.save(inventario));
    }

    /**
     * este metodo borra un inventario
     * @return ResponseEntity<InventarioEntity>
     */
    public ResponseEntity<InventarioEntity> delete_inventario(int id) {
        return inventarioRepository.findById(id).map(inventario -> {
            inventario.setDeleted(true);
            InventarioEntity inventario_deleted = inventarioRepository.save(inventario);
            return ResponseEntity.ok().body(inventario_deleted);
        }).orElse(ResponseEntity.notFound().build());
    }


}
