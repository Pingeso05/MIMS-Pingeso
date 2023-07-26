package mims.app.service;

import mims.app.entity.JoyaEntity;
import mims.app.entity.TipoJoyaEntity;
import mims.app.repository.TipoJoyaRepository;
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

class TipoJoyaServiceTest {

    @Mock
    private TipoJoyaRepository tipoJoyaRepository;

    @InjectMocks
    private TipoJoyaService tipoJoyaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTipoJoyasNotDeleted() {
        ArrayList<TipoJoyaEntity> tipoJoyas = new ArrayList<>();
        // Agregar lógica para crear objetos TipoJoyaEntity y agregarlos a la lista tipoJoyas
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        tipoJoya.setId(1);
        tipoJoya.setNombre("Anillo");
        tipoJoya.setDeleted(false);
        tipoJoyas.add(tipoJoya);

        when(tipoJoyaRepository.findAllByDeletedFalse()).thenReturn(tipoJoyas);

        ResponseEntity<ArrayList<TipoJoyaEntity>> response = tipoJoyaService.get_all_tipojoyas_not_deleted();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoyas, response.getBody());

        verify(tipoJoyaRepository, times(1)).findAllByDeletedFalse();
        verifyNoMoreInteractions(tipoJoyaRepository);
    }

    @Test
    void testGetTipoJoyaById() {
        int id = 1;
        ArrayList<TipoJoyaEntity> tipoJoyas = new ArrayList<>();
        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto TipoJoyaEntity
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        tipoJoya.setId(1);
        tipoJoya.setNombre("Anillo");
        tipoJoya.setDeleted(false);
        tipoJoyas.add(tipoJoya);


        when(tipoJoyaRepository.findById(id)).thenReturn(Optional.of(tipoJoya));

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaService.get_tipojoya_by_id(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaRepository, times(1)).findById(id);
        verifyNoMoreInteractions(tipoJoyaRepository);
    }

    @Test
    void testUpdateTipoJoya() {
        int id = 1;
        String nombre = "Anillo 2";

        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto TipoJoyaEntity
        ArrayList<TipoJoyaEntity> tipoJoyas = new ArrayList<>();
        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto TipoJoyaEntity
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        tipoJoya.setId(1);
        tipoJoya.setNombre("Anillo");
        tipoJoya.setDeleted(false);
        tipoJoyas.add(tipoJoya);

        when(tipoJoyaRepository.findById(id)).thenReturn(Optional.of(tipoJoya));
        when(tipoJoyaRepository.save(any(TipoJoyaEntity.class))).thenReturn(tipoJoya);

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaService.update_tipojoya(tipoJoya, id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaRepository, times(1)).findById(id);
        verify(tipoJoyaRepository, times(1)).save(tipoJoya);
        verifyNoMoreInteractions(tipoJoyaRepository);
    }

    @Test
    void testSaveTipoJoya() {
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        ArrayList<TipoJoyaEntity> tipoJoyas = new ArrayList<>();
        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto TipoJoyaEntity
        tipoJoya.setId(1);
        tipoJoya.setNombre("Anillo");
        tipoJoya.setDeleted(false);

        when(tipoJoyaRepository.save(any(TipoJoyaEntity.class))).thenReturn(tipoJoya);

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaService.save_tipojoya(tipoJoya);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaRepository, times(1)).save(tipoJoya);
        verifyNoMoreInteractions(tipoJoyaRepository);
    }

    @Test
    void testDeleteTipoJoya() {
        int id = 1;
        TipoJoyaEntity tipoJoya = new TipoJoyaEntity();
        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto TipoJoyaEntity
        ArrayList<TipoJoyaEntity> tipoJoyas = new ArrayList<>();
        // Agregar lógica para configurar la respuesta del repositorio y establecer el objeto TipoJoyaEntity
        tipoJoya.setId(1);
        tipoJoya.setNombre("Anillo");
        tipoJoya.setDeleted(false);
        tipoJoyas.add(tipoJoya);
        when(tipoJoyaRepository.findById(id)).thenReturn(Optional.of(tipoJoya));
        when(tipoJoyaRepository.save(any(TipoJoyaEntity.class))).thenReturn(tipoJoya);

        ResponseEntity<TipoJoyaEntity> response = tipoJoyaService.delete_tipojoya(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(tipoJoya, response.getBody());

        verify(tipoJoyaRepository, times(1)).findById(id);
        verify(tipoJoyaRepository, times(1)).save(tipoJoya);
        verifyNoMoreInteractions(tipoJoyaRepository);
    }
}
