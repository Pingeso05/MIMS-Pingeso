package mims.app.service;

import mims.app.Model.DisplayTransitoModel;
import mims.app.entity.TransitoEntity;
import mims.app.repository.TransitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransitoService {

    @Autowired
    private TransitoRepository transitoRepository;

    public ResponseEntity<ArrayList<DisplayTransitoModel>> get_all_transitos(){
        return ResponseEntity.ok(transitoRepository.findAllTransito());
    }

    public ResponseEntity<TransitoEntity> get_transito_by_id(int id) {
        return transitoRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());

    }

    public ResponseEntity<TransitoEntity> create_transito(TransitoEntity transitoEntity) {
        return ResponseEntity.ok(transitoRepository.save(transitoEntity));
    }

    public ResponseEntity<TransitoEntity> update_transito(TransitoEntity transito, int id){
        return transitoRepository.findById(id).map(transito_data -> {
            transito_data.setCantidad(transito.getCantidad());
            transito_data.setFecha_salida(transito.getFecha_salida());
            transito_data.setId_origen(transito.getId_origen());
            transito_data.setId_destino(transito.getId_destino());
            TransitoEntity transito_updated = transitoRepository.save(transito_data);
            return ResponseEntity.ok().body(transito_updated);
            }).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<TransitoEntity> delete_transito(int id){
        return transitoRepository.findById(id).map(transito ->{
            transito.setDeleted(true);
            TransitoEntity transito_deleted = transitoRepository.save(transito);
            return ResponseEntity.ok().body(transito_deleted);
        }).orElse(ResponseEntity.notFound().build());
    }

}
