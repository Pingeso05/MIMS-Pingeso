package mims.app.controller;

import mims.app.entity.LocacionEntity;
import mims.app.service.LocacionService;
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

class LocacionControllerTest {

    @Mock
    private LocacionService locacionService;

    @InjectMocks
    private LocacionController locacionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAll() {
        ArrayList<LocacionEntity> locaciones = new ArrayList<>();
        // Agregar lógica para crear objetos LocacionEntity y agregarlos a la lista locaciones

        when(locacionService.get_all_locaciones_not_deleted()).thenReturn(ResponseEntity.ok(locaciones));

        ResponseEntity<ArrayList<LocacionEntity>> response = locacionController.get_all();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(locaciones, response.getBody());

        verify(locacionService, times(1)).get_all_locaciones_not_deleted();
        verifyNoMoreInteractions(locacionService);
    }

    @Test
    void testGetById() {
        int id = 1;
        LocacionEntity locacion = new LocacionEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto LocacionEntity

        when(locacionService.get_locacion_by_id(id)).thenReturn(ResponseEntity.ok(locacion));

        ResponseEntity<LocacionEntity> response = locacionController.get_by_id(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(locacion, response.getBody());

        verify(locacionService, times(1)).get_locacion_by_id(id);
        verifyNoMoreInteractions(locacionService);
    }

    @Test
    void testSave() {
        LocacionEntity locacion = new LocacionEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto LocacionEntity

        when(locacionService.save_locacion(locacion)).thenReturn(ResponseEntity.ok(locacion));

        ResponseEntity<LocacionEntity> response = locacionController.save(locacion);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(locacion, response.getBody());

        verify(locacionService, times(1)).save_locacion(locacion);
        verifyNoMoreInteractions(locacionService);
    }

    @Test
    void testUpdate() {
        int id = 1;
        LocacionEntity locacion = new LocacionEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto LocacionEntity

        when(locacionService.update_locacion(locacion, id)).thenReturn(ResponseEntity.ok(locacion));

        ResponseEntity<LocacionEntity> response = locacionController.update(locacion, id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(locacion, response.getBody());

        verify(locacionService, times(1)).update_locacion(locacion, id);
        verifyNoMoreInteractions(locacionService);
    }

    @Test
    void testDelete() {
        int id = 1;
        LocacionEntity locacion = new LocacionEntity();
        // Agregar lógica para configurar la respuesta del servicio y establecer el objeto LocacionEntity

        when(locacionService.delete_locacion(id)).thenReturn(ResponseEntity.ok(locacion));

        ResponseEntity<LocacionEntity> response = locacionController.delete(id);
    }
}

