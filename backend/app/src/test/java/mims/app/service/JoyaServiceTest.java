package mims.app.service;

import mims.app.Model.DisplayJoyaModelInterface;
import mims.app.entity.JoyaEntity;
import mims.app.repository.JoyaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
class JoyaServiceTest {


    @Mock
    private JoyaRepository joyaRepository;

    @InjectMocks
    private JoyaService joyaService;

    private JoyaEntity joyaEntity;

    @Test
    void get_all_joyas_not_deletedTest() throws Exception {
        List<DisplayJoyaModelInterface> joyas = new ArrayList<>();
        DisplayJoyaModelInterface joya = new DisplayJoyaModelInterface() {
            @Override
            public int getId() {
                return 1;
            }

            @Override
            public String getNombre() {
                return "joya1";
            }

            @Override
            public String getTipo_joya() {
                return "tipo1";
            }

            @Override
            public float getCost() {
                // TODO Auto-generated method stub
                throw new UnsupportedOperationException("Unimplemented method 'getCost'");
            }
        };
        joyas.add(joya);

        // Dado que el método findAllJoyasNotDeleted se llamará
        given(joyaRepository.findAllJoyasNotDeleted()).willReturn((ArrayList<DisplayJoyaModelInterface>) joyas);

        // Llamar a tu servicio y hacer alguna validación
        List<DisplayJoyaModelInterface> result = joyaService.get_all_joyas_not_deleted();

        // Aquí puedes agregar más validaciones, como si el contenido devuelto es correcto
        assert(result.size() == 1);
        assert(result.get(0).getNombre().equals("joya1"));

    }



    @Test
    void get_joya_by_id() {
        JoyaEntity joya = new JoyaEntity();
        joya.setNombre("Test");
        joya.setId_tipo_joya(1);

        when(joyaRepository.findById(anyInt())).thenReturn(Optional.of(joya));

        ResponseEntity<JoyaEntity> response = joyaService.get_joya_by_id(1);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(joya, response.getBody());
    }

    @Test
    void update_joya() {
        JoyaEntity joya = new JoyaEntity();
        joya.setNombre("Updated Test");
        joya.setId_tipo_joya(2);

        when(joyaRepository.findById(anyInt())).thenReturn(Optional.of(joya));
        when(joyaRepository.save(any(JoyaEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<JoyaEntity> response = joyaService.update_joya(joya, 1);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(joya.getNombre(), response.getBody().getNombre());
        assertEquals(joya.getId_tipo_joya(), response.getBody().getId_tipo_joya());


    }

    @Test
    void save_joya() {
        JoyaEntity joya = new JoyaEntity();
        joya.setNombre("hola");
        joya.setId(1);
        joya.setId_tipo_joya(1);
        joya.setDeleted(false);
        when(joyaRepository.save(any(JoyaEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<JoyaEntity> response = joyaService.save_joya(joya);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(joya.getNombre(), response.getBody().getNombre());
        assertEquals(joya.getId_tipo_joya(), response.getBody().getId_tipo_joya());
    }

    @Test
    void soft_delete_joya() {
        JoyaEntity joya = new JoyaEntity();
        joya.setNombre("hola");
        joya.setId(1);
        joya.setId_tipo_joya(1);
        joya.setDeleted(false);
        when(joyaRepository.findById(anyInt())).thenReturn(Optional.of(joya));
        when(joyaRepository.save(any(JoyaEntity.class))).thenAnswer(invocation -> {
            JoyaEntity deletedJoya = invocation.getArgument(0);
            deletedJoya.setDeleted(true);
            return deletedJoya;
        });

        ResponseEntity<JoyaEntity> response = joyaService.soft_delete_joya(1);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().isDeleted());
    }
}