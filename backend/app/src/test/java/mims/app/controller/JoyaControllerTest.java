package mims.app.controller;

import mims.app.Model.DisplayJoyaModelInterface;
import mims.app.entity.JoyaEntity;
import mims.app.service.JoyaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JoyaControllerTest {

    @InjectMocks
    JoyaController joyaController;

    @Mock
    JoyaService joyaService;

    JoyaEntity joya;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        joya = new JoyaEntity();
        joya.setId(1);
        joya.setNombre("Test");
        joya.setId_tipo_joya(1);
        joya.setDeleted(false);
    }

    @Test
    public void testGetAll() {
    }

    @Test
    public void testGetById() {
        when(joyaService.get_joya_by_id(anyInt())).thenReturn(ResponseEntity.ok(joya));

        ResponseEntity<JoyaEntity> response = joyaController.get_by_id(1);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(joya, response.getBody());
    }

    @Test
    public void testSaveJoya() {
        when(joyaService.save_joya(any(JoyaEntity.class))).thenReturn(ResponseEntity.ok(joya));

        ResponseEntity<JoyaEntity> response = joyaController.save(joya);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(joya, response.getBody());
    }

    @Test
    public void testUpdateJoya() {
        when(joyaService.update_joya(any(JoyaEntity.class), anyInt())).thenReturn(ResponseEntity.ok(joya));

        ResponseEntity<JoyaEntity> response = joyaController.update(joya, 1);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(joya, response.getBody());
    }

    @Test
    public void testDeleteJoya() {
        when(joyaService.soft_delete_joya(anyInt())).thenReturn(ResponseEntity.ok().build());

        ResponseEntity<?> response = joyaController.delete(1);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
    }


}
