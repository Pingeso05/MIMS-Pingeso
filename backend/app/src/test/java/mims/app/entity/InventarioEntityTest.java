package mims.app.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class InventarioEntityTest {

    @Mock
    private InventarioEntity inventarioEntity;

    @Test
    void setDeleted() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setDeleted(false);
        assertEquals(false, inventarioEntity.isDeleted());
    }

    @Test
    void getId() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId(1);
        assertEquals(1, inventarioEntity.getId());
    }

    @Test
    void getId_locacion() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId_locacion(1);
        assertEquals(1, inventarioEntity.getId_locacion());
    }

    @Test
    void getId_joya() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId_joya(1);
        assertEquals(1, inventarioEntity.getId_joya());
    }

    @Test
    void getCantidad() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setCantidad(1);
        assertEquals(1, inventarioEntity.getCantidad());
    }

    @Test
    void getPrecio_venta() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setPrecio_venta(1);
        assertEquals(1, inventarioEntity.getPrecio_venta());
    }

    @Test
    void isDeleted() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setDeleted(false);
        assertEquals(false, inventarioEntity.isDeleted());
    }

    @Test
    void setId() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId(1);
        assertEquals(1, inventarioEntity.getId());
    }

    @Test
    void setId_locacion() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId_locacion(1);
        assertEquals(1, inventarioEntity.getId_locacion());
    }

    @Test
    void setId_joya() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId_joya(1);
        assertEquals(1, inventarioEntity.getId_joya());
    }

    @Test
    void setCantidad() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setCantidad(1);
        assertEquals(1, inventarioEntity.getCantidad());
    }

    @Test
    void setPrecio_venta() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setPrecio_venta(1);
        assertEquals(1, inventarioEntity.getPrecio_venta());
    }


    
}