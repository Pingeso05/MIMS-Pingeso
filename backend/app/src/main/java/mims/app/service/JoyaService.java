package mims.app.service;

import mims.app.entity.JoyaEntity;
import mims.app.repository.JoyaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JoyaService {
    @Autowired
    private JoyaRepository joyaRepository;

    public List<JoyaEntity> get_all_joyas() {
        return joyaRepository.findAll();
    }

    public JoyaEntity get_joya_by_id(int id) {
        return joyaRepository.findById(id).orElse(null);
    }

    public JoyaEntity save_joya(JoyaEntity joya) {
        return joyaRepository.save(joya);
    }

    public String delete_joya(int id) {
        joyaRepository.deleteById(id);
        return "Joya eliminada: " + id;
    }
}
