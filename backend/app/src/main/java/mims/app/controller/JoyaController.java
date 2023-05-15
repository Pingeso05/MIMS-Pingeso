package mims.app.controller;

import mims.app.entity.JoyaEntity;
import mims.app.service.JoyaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/joya")
@SuppressWarnings("unused")
@CrossOrigin(origins = "*")
public class JoyaController {
    /**
     * Esta clase representa el servicio de la entidad Joya
     * */
    @Autowired
    private JoyaService joyaService;

    /**
    * Este metodo devuelve todas las joyas que no estan borradas
    * @return ResponseEntity<ArrayList<JoyaEntity>>
    */
    @GetMapping
    public ResponseEntity<ArrayList<JoyaEntity>> get_all() {
        return joyaService.get_all_joyas_not_deleted();
    }

    /**
     * Este metodo devuelve una joya por id
     * @param id es el id de la joya a buscar
     * @return ResponseEntity<JoyaEntity>
     */
    @GetMapping("/{id}")
    public ResponseEntity<JoyaEntity> get_by_id(@PathVariable int id) {
        return joyaService.get_joya_by_id(id);
    }

    /**
     * Este metodo crea una joya nueva en la base de datos
     * @param joya es la joya a crear
     * @return ResponseEntity<JoyaEntity> es la joya creada
     */
    @PostMapping
    public ResponseEntity<JoyaEntity> save(@RequestBody JoyaEntity joya) {
        return joyaService.save_joya(joya);
    }

    /**
     * Este metodo actualiza una joya
     * @param joya es la joya con los datos actualizados
     * @param id es el id de la joya a actualizar
     * @return ResponseEntity<JoyaEntity> es la joya actualizada
     */
    @PutMapping("/{id}")
    public ResponseEntity<JoyaEntity> update(@RequestBody JoyaEntity joya, @PathVariable int id) {
        return joyaService.update_joya(joya, id);
    }

    /**
     * Este metodo borra una joya de manera suave
     * @param id es el id de la joya a borrar
     * @return ResponseEntity<?> es la respuesta de la peticion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {

        return joyaService.soft_delete_joya(id);
    }
}
