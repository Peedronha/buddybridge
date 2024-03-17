package br.com.buddybridge.core.controller;

import br.com.buddybridge.core.model.MedicalRecordModel;
import br.com.buddybridge.core.service.MedicalRecordService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("medicalRecord")
public class MedicalRecordController {
    
    private MedicalRecordService medicalRecordService;

    @GetMapping
    public ResponseEntity<List<MedicalRecordModel>> getALlMedicalRecordModels(){
        List<MedicalRecordModel> recordModels = new ArrayList<>(this.medicalRecordService.findAll());
        if (recordModels.isEmpty()) {
            return new ResponseEntity<>(recordModels, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ArrayList<> (recordModels), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MedicalRecordModel> insertMedicalRecordModel(@RequestBody MedicalRecordModel recordModel){
        try{
            this.medicalRecordService.saveMedicalRecordModel(recordModel);
            return new ResponseEntity<>(recordModel, HttpStatus.CREATED);
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordModel> getMedicalRecordModelById(@PathVariable Long id){
        Optional<MedicalRecordModel> recordModel = this.medicalRecordService.findMedicalRecordModelById(id);
        return recordModel.map(model -> new ResponseEntity<>(model, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }

    @PutMapping
    public ResponseEntity<MedicalRecordModel> updateMedicalRecordModel(@RequestAttribute Long id,@RequestBody MedicalRecordModel recordModel){
        if(this.medicalRecordService.findMedicalRecordModelById(id).isPresent()) {
            this.medicalRecordService.saveMedicalRecordModel(recordModel);
            return new ResponseEntity<>(recordModel, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteMedicalRecordModel(@PathVariable Long id){
        if (this.medicalRecordService.findMedicalRecordModelById(id).isPresent()){
            this.medicalRecordService.deleteMedicalRecordModel(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
