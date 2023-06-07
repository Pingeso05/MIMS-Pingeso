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
    void getPrecio_costo() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setPrecio_costo(1);
        assertEquals(1, inventarioEntity.getPrecio_costo());
    }

    @Test
    void getId_tipo_joya() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId_tipo_joya(1);
        assertEquals(1, inventarioEntity.getId_tipo_joya());
    }

    @Test
    void getCreated_by() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setCreated_by(1);
        assertEquals(1, inventarioEntity.getCreated_by());
    }

    @Test
    void getUpdated_by() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setUpdated_by(1);
        assertEquals(1, inventarioEntity.getUpdated_by());
    }

    @Test
    void getCreated_at() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setCreated_at(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"));
        assertEquals(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"), inventarioEntity.getCreated_at());
    }

    @Test
    void getUpdated_at() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setUpdated_at(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"));
        assertEquals(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"), inventarioEntity.getUpdated_at());
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

    @Test
    void setPrecio_costo() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setPrecio_costo(1);
        assertEquals(1, inventarioEntity.getPrecio_costo());
    }

    @Test
    void setId_tipo_joya() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setId_tipo_joya(1);
        assertEquals(1, inventarioEntity.getId_tipo_joya());
    }

    @Test
    void setCreated_by() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setCreated_by(1);
        assertEquals(1, inventarioEntity.getCreated_by());

    }

    @Test
    void setUpdated_by() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setUpdated_by(1);
        assertEquals(1, inventarioEntity.getUpdated_by());
    }

    @Test
    void setCreated_at() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setCreated_at(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"));
        assertEquals(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"), inventarioEntity.getCreated_at());
    }

    @Test
    void setUpdated_at() {
        InventarioEntity inventarioEntity;
        inventarioEntity = new InventarioEntity();
        inventarioEntity.setUpdated_at(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"));
        assertEquals(java.sql.Timestamp.valueOf("2020-01-01 00:00:00"), inventarioEntity.getUpdated_at());
    }
}