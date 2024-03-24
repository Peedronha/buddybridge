package br.com.buddybridge.core.controller;

import br.com.buddybridge.core.model.OngModel;
import br.com.buddybridge.core.service.OngService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(MockitoJUnitRunner.class)
class OngControllerTest {

    @Mock
    private OngService ongService;

    @InjectMocks
    private OngController ongController;

    @Test
    public void testFindAll_Success() {
        // Mocking data
        List<OngModel> ongs = Arrays.asList(
                new OngModel(1L, "Save Pets", "Dogs, Cats", "Best Paws", new Date()),
                new OngModel(2L, "Feathered Friends", "Birds", "Wings of Hope", new Date()),
                new OngModel(3L, "Wildlife Rescue", "Wild Animals", "Animal Guardians", new Date())
        );

        Mockito.when(ongService.findAll()).thenReturn(ongs);

        // Perform the test
        ResponseEntity<List<OngModel>> response = ongController.getALlOngModels();

        // Assertions
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(ongs, response.getBody());
    }

    // Similar tests for other methods in OngController

    // Test methods for failure cases and other scenarios

}

