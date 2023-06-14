package mims.app.controller;
import mims.app.Model.DisplayInventarioModelInterface;
import mims.app.entity.InventarioEntity;
import mims.app.service.InventarioService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class InventarioControllerTest {

    @Mock
    private InventarioService inventarioService;

    @InjectMocks
    private InventarioController inventarioController;

    @Before
    public void setUp() {
        // Configurar el comportamiento del servicio simulado (mock) según sea necesario
        // por ejemplo, cuando se llame a inventarioService.get_all_inventarios_not_deleted(), devolver una lista simulada de inventarios
        // cuando se llame a inventarioService.get_inventario_by_id(id), devolver un ResponseEntity simulado de InventarioEntity
        // ...

        // Ejemplo de configuración para el método get_all()
        ArrayList<DisplayInventarioModelInterface> inventarios = new ArrayList<>();
        inventarios.add(new DisplayInventarioModelInterface() {
            @Override
            public int getId() {
                return 0;
            }

            @Override
            public int getCantidad() {
                return 0;
            }

            @Override
            public float getPrecio_venta() {
                return 0;
            }

            @Override
            public float getPrecio_costo() {
                return 0;
            }

            @Override
            public String getJoya() {
                return null;
            }

            @Override
            public String getTipo_joya() {
                return null;
            }

            @Override
            public String getLocal() {
                return null;
            }
        });
        when(inventarioService.get_all_inventarios_not_deleted()).thenReturn(inventarios);
    }

    @Test
    public void testGetAll() {
        ArrayList<DisplayInventarioModelInterface> result = inventarioController.get_all();

        // Verificar que el servicio simulado fue llamado correctamente
        verify(inventarioService, times(1)).get_all_inventarios_not_deleted();

        // Verificar que el resultado no es nulo
        assertEquals(1, result.size());
    }

    @Test
    public void testGetById() {
        int id = 1;
        InventarioEntity inventario = new InventarioEntity();
        inventario.setId(id);
        ResponseEntity<InventarioEntity> responseEntity = ResponseEntity.ok(inventario);

        when(inventarioService.get_inventario_by_id(id)).thenReturn(responseEntity);

        ResponseEntity<InventarioEntity> result = inventarioController.get_by_id(id);

        // Verificar que el servicio simulado fue llamado correctamente
        verify(inventarioService, times(1)).get_inventario_by_id(id);

        // Verificar el resultado esperado
        assertEquals(responseEntity, result);
    }

    @Test
    public void testSave() {
        InventarioEntity inventario = new InventarioEntity();
        inventario.setCantidad(1);
        inventario.setPrecio_venta(1);
        inventario.setPrecio_costo(1);
        inventario.setId_joya(1);
        inventario.setId_locacion(1);
        inventario.setId_tipo_joya(1);
        inventario.setDeleted(false);

        ResponseEntity<InventarioEntity> response = inventarioController.save(inventario);

        // Verificar que el servicio simulado fue llamado correctamente
        verify(inventarioService, times(1)).save_inventario(inventario);

        // Verificar el resultado esperado
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(inventario, response.getBody());
    }

    @Test
    public void testUpdate() {
        int id = 1;
        InventarioEntity inventario = new InventarioEntity();
        ResponseEntity<InventarioEntity> responseEntity = ResponseEntity.ok(inventario);

        when(inventarioService.update_inventario(inventario, id)).thenReturn(responseEntity);

        ResponseEntity<InventarioEntity> result = inventarioController.update(inventario, id);

        // Verificar que el servicio simulado fue llamado correctamente
        verify(inventarioService, times(1)).update_inventario(inventario, id);

        // Verificar el resultado esperado
        assertEquals(responseEntity, result);
    }

    @Test
    public void testDelete() {
        int id = 1;
        InventarioEntity inventario = new InventarioEntity();
        ResponseEntity<InventarioEntity> responseEntity = ResponseEntity.ok(inventario);

        when(inventarioService.delete_inventario(id)).thenReturn(responseEntity);

        ResponseEntity<InventarioEntity> result = inventarioController.delete(id);

        // Verificar que el servicio simulado fue llamado correctamente
        verify(inventarioService, times(1)).delete_inventario(id);

        // Verificar el resultado esperado
        assertEquals(responseEntity, result);
    }

}
