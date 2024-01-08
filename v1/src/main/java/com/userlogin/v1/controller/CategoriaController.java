package com.userlogin.v1.controller;

import com.userlogin.v1.domain.service.CategoriaService;
import com.userlogin.v1.dto.categoria.CategoriaUpdateDTO;
import com.userlogin.v1.dto.categoria.PostCategoriaDTO;
import com.userlogin.v1.dto.categoria.ViewModelCategoriaDTO;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping("post")
    @Secured("ADMIN")
    public ResponseEntity<Set<String>> Post(@RequestBody PostCategoriaDTO categoria){
        return ResponseEntity.ok().body(categoriaService.Post(categoria));
    }

    @GetMapping("get")
    public ResponseEntity<List<ViewModelCategoriaDTO>> GetAll(){
        List<ViewModelCategoriaDTO> viewModelCategoriaDTOS = this.categoriaService.GetAll();
        return ResponseEntity.ok(viewModelCategoriaDTOS);
    }
    @GetMapping("get/{id}")
    public ResponseEntity<ViewModelCategoriaDTO> GetById(@PathVariable int id){

        ViewModelCategoriaDTO viewModelCategoriaDTO = this.categoriaService.GetById(id);
        return ResponseEntity.ok(viewModelCategoriaDTO);

    }

    @DeleteMapping("delete/{id}")
    @Secured("ADMIN")
    public ResponseEntity<Set<String>> Delete(@PathVariable int id){
        this.categoriaService.Delete(id);
        Set<String> resposta = new HashSet<String>();
        resposta.add("Deletado com sucesso");
        return ResponseEntity.ok(resposta);
    }

    @PutMapping("update")
    @Secured("ADMIN")
    public ResponseEntity Update(@RequestBody CategoriaUpdateDTO categoriaUpdateDTO){
        CategoriaUpdateDTO update = this.categoriaService.Update(categoriaUpdateDTO);
        return ResponseEntity.ok(update);

    }

}
