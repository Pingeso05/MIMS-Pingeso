package mims.app.service;

import mims.app.entity.ComunaEntity;
import mims.app.repository.ComunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComunaService {

    @Autowired
    private ComunaRepository comunaRepository;

    public ResponseEntity<ArrayList<ComunaEntity>> get_all_comunas(){
        return (ResponseEntity<ArrayList<ComunaEntity>>) comunaRepository.findAll();
    }

    public ResponseEntity<ComunaEntity> get_comuna_by_id(int id) {
        return comunaRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
