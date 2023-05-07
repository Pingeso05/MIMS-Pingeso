package mims.app.service;

import mims.app.entity.JoyaEntity;
import mims.app.repository.JoyaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JoyaService {
    /**
     * Esta clase representa el repositorio de la tabla joya
     * */
    @Autowired
    private JoyaRepository joyaRepository;

    /**
     * Este metodo devuelve todas las joyas que no estan borradas
     * @return ResponseEntity<ArrayList<JoyaEntity>>
     */
    public ResponseEntity<ArrayList<JoyaEntity>> get_all_joyas_not_deleted() {
        return ResponseEntity.ok((ArrayList<JoyaEntity>) joyaRepository.findAllByDeletedFalse());
    }

    /**
     * Este metodo devuelve una joya por id
     * @param id es el id de la joya
     * @return ResponseEntity<JoyaEntity>
     */
    public ResponseEntity<JoyaEntity> get_joya_by_id(int id) {
        return joyaRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Este metodo actualiza una joya
     * @param joya es la joya a actualizar
     * @param id es el id de la joya
     * @return ResponseEntity<JoyaEntity>
     */
    public ResponseEntity<JoyaEntity> update_joya(JoyaEntity joya, int id) {
        return joyaRepository.findById(id).map(joya_data -> {
            joya_data.setNombre(joya.getNombre());
            joya_data.setId_tipo_joya(joya.getId_tipo_joya());
            JoyaEntity joya_updated = joyaRepository.save(joya_data);
            return ResponseEntity.ok().body(joya_updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Este metodo crea una joya
     * @param joya es la joya a crear
     * @return ResponseEntity<JoyaEntity>
     */
    public ResponseEntity<JoyaEntity> save_joya(JoyaEntity joya) {
        return ResponseEntity.ok(joyaRepository.save(joya));
    }

    /**
     * Este metodo borra una joya
     * @param id es el id de la joya
     * @return ResponseEntity<?>
     */
    public ResponseEntity<JoyaEntity> soft_delete_joya(int id) {
           return joyaRepository.findById(id).map(joya -> {
                joya.setDeleted(true);
                JoyaEntity joya_deleted = joyaRepository.save(joya);
                return ResponseEntity.ok().body(joya_deleted);
            }).orElse(ResponseEntity.notFound().build());
    }


}
