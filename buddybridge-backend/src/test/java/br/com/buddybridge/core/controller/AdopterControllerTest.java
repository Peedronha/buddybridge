//package br.com.buddybridge.core.controller;
//
//import br.com.buddybridge.core.model.AdopterModel;
//import br.com.buddybridge.core.service.AdopterService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@RunWith(MockitoJUnitRunner.class)
//public class AdopterControllerTest {
//
//    @Mock
//    private AdopterService adopterService;
//
//    @InjectMocks
//    private AdopterController adopterController;
//
//    @Test
//    public void testFindAll_Success() {
//
//        List<AdopterModel> adopters = Arrays.asList(
//                new AdopterModel(1L, "John"),
//                new AdopterModel(2L, "Alice"),
//                new AdopterModel(3L, "Bob")
//        );
//
//        Mockito.when(adopterService.findAll()).thenReturn(adopters);
//
//        // Perform the test
//        ResponseEntity<List<AdopterModel>> response = adopterController.getALlAdopterModels();
//
//        // Assertions
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(adopters, response.getBody());
//    }
//
//    // Similar tests for other methods in AdopterController
//
//    // Test methods for failure cases and other scenarios
//
//}
