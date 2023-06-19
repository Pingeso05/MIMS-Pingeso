package mims.app.service;

import mims.app.Model.DisplayInventarioModelInterface;
import mims.app.entity.InventarioEntity;
import mims.app.entity.JoyaEntity;
import mims.app.entity.TipoJoyaEntity;
import mims.app.repository.InventarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class InventarioServiceTest {

    @Mock
    private InventarioRepository inventarioRepository;

    @InjectMocks
    private InventarioService inventarioService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetInventarioById() {
        ArrayList<InventarioEntity> inventarios = new ArrayList<>();
        int id = 1;
        InventarioEntity inventario = new InventarioEntity();
        inventario.setId(1);
        inventario.setDeleted(false);
        inventario.setCantidad(1);
        inventario.setPrecio_venta(11);
        inventario.setPrecio_costo(11);
        inventario.setId_locacion(1);
        inventario.setId_tipo_joya(1);
        inventario.setId_joya(1);
        inventarios.add(inventario);

        when(inventarioRepository.findById(id)).thenReturn(Optional.of(inventario));

        ResponseEntity<InventarioEntity> response = inventarioService.get_inventario_by_id(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(inventario, response.getBody());

        verify(inventarioRepository, times(1)).findById(id);
        verifyNoMoreInteractions(inventarioRepository);
    }

    @Test
    void testUpdateInventario() {
        int id = 1;
        InventarioEntity inventario = new InventarioEntity();
        inventario.setId(1);
        inventario.setDeleted(false);
        inventario.setCantidad(1);
        inventario.setPrecio_venta(11);
        inventario.setPrecio_costo(11);
        inventario.setId_locacion(1);
        inventario.setId_tipo_joya(1);
        inventario.setId_joya(1);
        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto InventarioEntity

        when(inventarioRepository.findById(id)).thenReturn(Optional.of(inventario));
        when(inventarioRepository.save(any(InventarioEntity.class))).thenReturn(inventario);

        ResponseEntity<InventarioEntity> response = inventarioService.update_inventario(inventario, id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(inventario, response.getBody());

        verify(inventarioRepository, times(1)).findById(id);
        verify(inventarioRepository, times(1)).save(inventario);
        verifyNoMoreInteractions(inventarioRepository);
    }

    @Test
    void testSaveInventario() {
        int id = 1;
        InventarioEntity inventario = new InventarioEntity();
        inventario.setId(1);
        inventario.setDeleted(false);
        inventario.setCantidad(1);
        inventario.setPrecio_venta(11);
        inventario.setPrecio_costo(11);
        inventario.setId_locacion(1);
        inventario.setId_tipo_joya(1);
        inventario.setId_joya(1);
        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto InventarioEntity

        when(inventarioRepository.save(any(InventarioEntity.class))).thenReturn(inventario);

        ResponseEntity<InventarioEntity> response = inventarioService.save_inventario(inventario);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(inventario, response.getBody());

        verify(inventarioRepository, times(1)).save(inventario);
        verifyNoMoreInteractions(inventarioRepository);
    }

    @Test
    void testDeleteInventario() {
        ArrayList<InventarioEntity> inventarios = new ArrayList<>();
        int id = 1;
        InventarioEntity inventario = new InventarioEntity();
        inventario.setId(1);
        inventario.setDeleted(false);
        inventario.setCantidad(1);
        inventario.setPrecio_venta(11);
        inventario.setPrecio_costo(11);
        inventario.setId_locacion(1);
        inventario.setId_tipo_joya(1);
        inventario.setId_joya(1);
        inventarios.add(inventario);

        when(inventarioRepository.findById(id)).thenReturn(Optional.of(inventario));
        when(inventarioRepository.save(any(InventarioEntity.class))).thenReturn(inventario);

        ResponseEntity<InventarioEntity> response = inventarioService.delete_inventario(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(inventario, response.getBody());

        verify(inventarioRepository, times(1)).findById(id);
        verify(inventarioRepository, times(1)).save(inventario);
        verifyNoMoreInteractions(inventarioRepository);
    }
}
