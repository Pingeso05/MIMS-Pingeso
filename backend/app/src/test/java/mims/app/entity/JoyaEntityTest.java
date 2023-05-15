package mims.app.entity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class JoyaEntityTest {

    @Autowired
    private JoyaEntity joyaEntity;

    @Test
    void getId() {
        JoyaEntity joyaEntity = new JoyaEntity();
        joyaEntity.setId(1);
        assertEquals(1, joyaEntity.getId());
    }

    @Test
    void getNombre() {
        JoyaEntity joyaEntity = new JoyaEntity();
        joyaEntity.setNombre("Anillo");
        assertEquals("Anillo", joyaEntity.getNombre());
    }

    @Test
    void getId_tipo_joya() {
    }

    @Test
    void isDeleted() {
    }

    @Test
    void setId() {
    }

    @Test
    void setNombre() {
    }

    @Test
    void setId_tipo_joya() {
    }
}