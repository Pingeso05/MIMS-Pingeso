package mims.app.entity;

import mims.app.entity.LocacionEntity;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LocacionEntityTest {

    @Test
    void testLocacionEntity() {
        // Crea una nueva instancia de LocacionEntity
        LocacionEntity locacion = new LocacionEntity();

        // Comprueba que puedes establecer y obtener el id
        locacion.setId(1);
        assertEquals(1, locacion.getId());

        // Comprueba que puedes establecer y obtener el nombre
        locacion.setNombre("locacion1");
        assertEquals("locacion1", locacion.getNombre());

        // Comprueba que puedes establecer y obtener la dirección
        locacion.setDireccion("direccion1");
        assertEquals("direccion1", locacion.getDireccion());

        // Comprueba que puedes establecer y obtener el valor de deleted
        locacion.setDeleted(true);
        assertTrue(locacion.isDeleted());
        locacion.setDeleted(false);
        assertFalse(locacion.isDeleted());
    }
}
