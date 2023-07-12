package mims.app.service;

import mims.app.Model.DisplayLogInventarioModelInterface;
import mims.app.repository.LogInventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class LogInventarioService {

    @Autowired
    private LogInventarioRepository logInventarioRepository;

    public ResponseEntity<ArrayList<DisplayLogInventarioModelInterface>> get_all_log_inventario(){
        return ResponseEntity.ok(logInventarioRepository.findAllLogInventario());
    }
}
