package mims.app.service;

import mims.app.Model.DisplayInventarioModelInterface;
import mims.app.entity.InventarioEntity;
import mims.app.repository.InventarioRepository;
import org.assertj.core.internal.Arrays2D;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class InventarioServiceTest {
    @Mock
    private InventarioRepository inventarioRepository;
    @InjectMocks
    private InventarioService inventarioService;

    private DisplayInventarioModelInterface inventarioModelInterface;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        DisplayInventarioModelInterface displayInventarioModelInterface = new DisplayInventarioModelInterface() {
            @Override
            public int getId() {
                return 1;
            }

            @Override
            public int getCantidad() {
                return 1;
            }

            @Override
            public float getPrecio_venta() {
                return 10000;
            }

            @Override
            public float getPrecio_costo() {
                return 1;
            }

            @Override
            public String getJoya() {
                return "1";
            }

            @Override
            public String getTipo_joya() {
                return "1";
            }

            @Override
            public String getLocal() {
                return "1";
            }
        };

    }

    @Test
    void get_all_inventarios_not_deleted() {
        ArrayList<DisplayInventarioModelInterface> inventarioModelInterfaces = new ArrayList<>();
        inventarioModelInterfaces.add(inventarioModelInterface);
        when(inventarioRepository.findAllInventario()).thenReturn(inventarioModelInterfaces);
        assertEquals(inventarioModelInterfaces, inventarioService.get_all_inventarios_not_deleted());
    }

    @Test
    void get_inventario_by_id() {

    }

    @Test
    void update_inventario() {
        InventarioEntity inventarioEntity = new InventarioEntity();
        inventarioEntity.setId(1);
        inventarioEntity.setCantidad(1);
        inventarioEntity.setId_joya(1);
        inventarioEntity.setId_locacion(1);
        inventarioEntity.setId_tipo_joya(1);
        inventarioEntity.setPrecio_costo(1);
        inventarioEntity.setPrecio_venta(1);
        Optional<InventarioEntity> inventarioEntityOptional = Optional.of(inventarioEntity);
        when(inventarioRepository.findById(1)).thenReturn(inventarioEntityOptional);
        when(inventarioRepository.save(inventarioEntity)).thenReturn(inventarioEntity);
        assertEquals(inventarioEntity, inventarioService.update_inventario(inventarioEntity, 1).getBody());
    }

    @Test
    void save_inventario() {
        InventarioEntity inventarioEntity = new InventarioEntity();
        inventarioEntity.setId(1);
        inventarioEntity.setCantidad(1);
        inventarioEntity.setId_joya(1);
        inventarioEntity.setId_locacion(1);
        inventarioEntity.setId_tipo_joya(1);
        inventarioEntity.setPrecio_costo(1);
        inventarioEntity.setPrecio_venta(1);
        when(inventarioRepository.save(inventarioEntity)).thenReturn(inventarioEntity);
        assertEquals(inventarioEntity, inventarioService.save_inventario(inventarioEntity).getBody());
    }

    @Test
    void delete_inventario() {
        int id = 1;
        InventarioEntity inventarioEntity = new InventarioEntity();
        inventarioEntity.setId(1);
        inventarioEntity.setCantidad(1);
        inventarioEntity.setId_joya(1);
        inventarioEntity.setId_locacion(1);
        inventarioEntity.setId_tipo_joya(1);
        inventarioEntity.setPrecio_costo(1);
        inventarioEntity.setPrecio_venta(1);
        Optional<InventarioEntity> inventarioEntityOptional = Optional.of(inventarioEntity);
        when(inventarioRepository.findById(id)).thenReturn(inventarioEntityOptional);
        when(inventarioRepository.save(inventarioEntity)).thenReturn(inventarioEntity);
        assertEquals(inventarioEntity, inventarioService.delete_inventario(id).getBody());
    }
}