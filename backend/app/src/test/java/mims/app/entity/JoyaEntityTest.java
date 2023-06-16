package mims.app.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JoyaEntityTest {
    private JoyaEntity joyaEntity;

    @BeforeEach
    public void setUp() {
        joyaEntity = new JoyaEntity();
    }

    @Test
    void testId() {
        int id = 1;
        joyaEntity.setId(id);
        assertEquals(id, joyaEntity.getId());
    }

    @Test
    void testNombre() {
        String nombre = "Test";
        joyaEntity.setNombre(nombre);
        assertEquals(nombre, joyaEntity.getNombre());
    }

    @Test
    void testIdTipoJoya() {
        int idTipoJoya = 1;
        joyaEntity.setId_tipo_joya(idTipoJoya);
        assertEquals(idTipoJoya, joyaEntity.getId_tipo_joya());
    }

    @Test
    void testDeleted() {
        joyaEntity.setDeleted(true);
        assertTrue(joyaEntity.isDeleted());
        joyaEntity.setDeleted(false);
        assertFalse(joyaEntity.isDeleted());
    }
}
