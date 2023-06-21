package mims.app.service;

import mims.app.entity.LocacionEntity;
import mims.app.repository.LocacionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
class LocacionServiceTest {

    @InjectMocks
    private LocacionService locacionService;

    @Mock
    private LocacionRepository locacionRepository;

    private LocacionEntity locacionEntity;


    @Test
    void get_locacion_by_id() {
        LocacionEntity locacion = new LocacionEntity();
        locacion.setId(1);
        locacion.setNombre("locacion1");
        locacion.setDireccion("direccion1");

        given(locacionRepository.findById(1)).willReturn(Optional.of(locacion));

        ResponseEntity<LocacionEntity> result = locacionService.get_locacion_by_id(1);

        assertEquals("locacion1", result.getBody().getNombre());
    }

    @Test
    void update_locacion() {
        LocacionEntity locacion = new LocacionEntity();
        locacion.setId(1);
        locacion.setNombre("locacion1");
        locacion.setDireccion("direccion1");

        given(locacionRepository.findById(1)).willReturn(Optional.of(locacion));

        LocacionEntity updatedLocacion = new LocacionEntity();
        updatedLocacion.setId(1);
        updatedLocacion.setNombre("locacionUpdated");
        updatedLocacion.setDireccion("direccionUpdated");

        given(locacionRepository.save(locacion)).willReturn(updatedLocacion);

        ResponseEntity<LocacionEntity> result = locacionService.update_locacion(updatedLocacion, 1);

        assertEquals("locacionUpdated", result.getBody().getNombre());
        assertEquals("direccionUpdated", result.getBody().getDireccion());
    }

    @Test
    void save_locacion() {
        LocacionEntity locacion = new LocacionEntity();
        locacion.setId(1);
        locacion.setNombre("locacion1");
        locacion.setDireccion("direccion1");

        given(locacionRepository.save(locacion)).willReturn(locacion);

        ResponseEntity<LocacionEntity> result = locacionService.save_locacion(locacion);

        assertEquals("locacion1", result.getBody().getNombre());
    }

    @Test
    void delete_locacion() {
        LocacionEntity locacion = new LocacionEntity();
        locacion.setId(1);
        locacion.setNombre("locacion1");
        locacion.setDireccion("direccion1");
        locacion.setDeleted(false);

        given(locacionRepository.findById(1)).willReturn(Optional.of(locacion));

        locacion.setDeleted(true);

        given(locacionRepository.save(locacion)).willReturn(locacion);

        ResponseEntity<LocacionEntity> result = locacionService.delete_locacion(1);

        assertTrue(result.getBody().isDeleted());
    }
}