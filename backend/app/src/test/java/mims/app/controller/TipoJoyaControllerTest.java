package mims.app.controller;

import mims.app.entity.TipoJoyaEntity;
import mims.app.service.TipoJoyaService;
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

class TipoJoyaControllerTest {

    @Mock
    private TipoJoyaService tipoJoyaService;

    @InjectMocks
    private TipoJoyaController tipoJoyaController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTipoJoyas() {
        ArrayList<TipoJoyaEntity> tipoJoyas = new ArrayList<>();
        // Agregar lógica para crear objetos TipoJoyaEntity y agregarlos a la lista tipoJoyas

        when(tipoJoyaService.get_all_tipojoyas_not_deleted()).thenReturn(ResponseEntity.ok(tipoJoyas));

        ResponseEntity<ArrayList<TipoJoyaEntity>> response = tipoJoyaController.get_all_tipojoyas();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoyas, response.getBody());

        verify(tipoJoyaService, times(1)).get_all_tipojoyas_not_deleted();
        verifyNoMoreInteractions(tipoJoyaService);
    }

    @Test
    void testGetTipoJoyaById() {
        int id = 1;
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto TipoJoyaEntity

        when(tipoJoyaService.get_tipojoya_by_id(id)).thenReturn(ResponseEntity.ok(tipoJoya));

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaController.get_tipojoya_by_id(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaService, times(1)).get_tipojoya_by_id(id);
        verifyNoMoreInteractions(tipoJoyaService);
    }

    @Test
    void testSaveTipoJoya() {
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto TipoJoyaEntity

        when(tipoJoyaService.save_tipojoya(tipoJoya)).thenReturn(ResponseEntity.ok(tipoJoya));

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaController.save_tipojoya(tipoJoya);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaService, times(1)).save_tipojoya(tipoJoya);
        verifyNoMoreInteractions(tipoJoyaService);
    }

    @Test
    void testUpdateTipoJoya() {
        int id = 1;
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto TipoJoyaEntity

        when(tipoJoyaService.update_tipojoya(tipoJoya, id)).thenReturn(ResponseEntity.ok(tipoJoya));

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaController.update_tipojoya(tipoJoya, id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaService, times(1)).update_tipojoya(tipoJoya, id);
        verifyNoMoreInteractions(tipoJoyaService);
    }

    @Test
    void testDeleteTipoJoya() {
        int id = 1;
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto TipoJoyaEntity

        when(tipoJoyaService.delete_tipojoya(id)).thenReturn(ResponseEntity.ok(tipoJoya));

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaController.delete_tipojoya(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaService, times(1)).delete_tipojoya(id);
        verifyNoMoreInteractions(tipoJoyaService);
    }
}
