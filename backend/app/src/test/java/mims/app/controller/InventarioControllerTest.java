package mims.app.controller;

import mims.app.Model.DisplayInventarioModelInterface;
import mims.app.entity.InventarioEntity;
import mims.app.service.InventarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class InventarioControllerTest {

    @Mock
    private InventarioService inventarioService;

    @InjectMocks
    private InventarioController inventarioController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetInventarioById() {
        int id = 1;
        ArrayList<InventarioEntity> inventario = new ArrayList<>();
        InventarioEntity producto = new InventarioEntity();
        producto.setId_joya(1);
        producto.setId_tipo_joya(1);
        producto.setPrecio_costo(11);
        producto.setPrecio_venta(11);
        producto.setCantidad(1);
        producto.setId_locacion(1);
        producto.setDeleted(false);
        inventario.add(producto);

        when(inventarioService.get_inventario_by_id(id)).thenReturn(ResponseEntity.ok(producto));

        ResponseEntity<InventarioEntity> response = inventarioController.get_by_id(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(producto, response.getBody());

        verify(inventarioService, times(1)).get_inventario_by_id(id);
        verifyNoMoreInteractions(inventarioService);
    }


    @Test
    void testSaveInventario() {
        InventarioEntity producto = new InventarioEntity();
        producto.setId_joya(1);
        producto.setId_tipo_joya(1);
        producto.setPrecio_costo(11);
        producto.setPrecio_venta(11);
        producto.setCantidad(1);
        producto.setId_locacion(1);
        producto.setDeleted(false);
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto InventarioEntity

        when(inventarioService.save_inventario(producto)).thenReturn(ResponseEntity.ok(producto));

        ResponseEntity<InventarioEntity> response = inventarioController.save(producto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(producto, response.getBody());

        verify(inventarioService, times(1)).save_inventario(producto);
        verifyNoMoreInteractions(inventarioService);
    }

    @Test
    void testUpdateInventario() {
        int id = 1;
        InventarioEntity producto = new InventarioEntity();
        producto.setId_joya(1);
        producto.setId_tipo_joya(1);
        producto.setPrecio_costo(11);
        producto.setPrecio_venta(11);
        producto.setCantidad(1);
        producto.setId_locacion(1);
        producto.setDeleted(false);
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto InventarioEntity

        when(inventarioService.update_inventario(producto, id)).thenReturn(ResponseEntity.ok(producto));

        ResponseEntity<InventarioEntity> response = inventarioController.update(producto, id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(producto, response.getBody());

        verify(inventarioService, times(1)).update_inventario(producto, id);
        verifyNoMoreInteractions(inventarioService);
    }

    @Test
    void testDeleteInventario() {
        int id = 1;
        ArrayList<InventarioEntity> inventario = new ArrayList<>();
        InventarioEntity producto = new InventarioEntity();
        producto.setId_joya(1);
        producto.setId_tipo_joya(1);
        producto.setPrecio_costo(11);
        producto.setPrecio_venta(11);
        producto.setCantidad(1);
        producto.setId_locacion(1);
        producto.setDeleted(false);
        inventario.add(producto);

        when(inventarioService.delete_inventario(id)).thenReturn(ResponseEntity.ok().build());

        ResponseEntity<InventarioEntity> response = inventarioController.delete(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(inventarioService, times(1)).delete_inventario(id);
        verifyNoMoreInteractions(inventarioService);
    }
}
