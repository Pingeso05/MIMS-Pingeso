package mims.app.entity;

import mims.app.entity.TipoJoyaEntity;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class TipoJoyaEntityTest {

    @Test
    void testTipoJoyaEntity() {
        // Crea una nueva instancia de TipoJoyaEntity
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();

        // Comprueba que puedes establecer y obtener el id
        tipoJoya.setId(1);
        assertEquals(1, tipoJoya.getId());

        // Comprueba que puedes establecer y obtener el nombre
        tipoJoya.setNombre("Anillo");
        assertEquals("Anillo", tipoJoya.getNombre());

        // Comprueba que puedes establecer y obtener el material
        tipoJoya.setMaterial("Oro");
        assertEquals("Oro", tipoJoya.getMaterial());

        // Comprueba que puedes establecer y obtener el valor de deleted
        tipoJoya.setDeleted(true);
        assertTrue(tipoJoya.isDeleted());
        tipoJoya.setDeleted(false);
        assertFalse(tipoJoya.isDeleted());
    }
}
