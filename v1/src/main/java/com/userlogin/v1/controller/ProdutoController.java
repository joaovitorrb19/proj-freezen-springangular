package com.userlogin.v1.controller;

import java.io.File;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.userlogin.v1.domain.service.ProdutoService;
import com.userlogin.v1.dto.produto.ProdutoEntradaDTO;

@RestController
@RequestMapping("produto")
public class ProdutoController {

    @Autowired
    ProdutoService produtoService;
    
    @PostMapping("post")
    public ResponseEntity PostProduto(@RequestParam Map<String,String> dados,MultipartFile img){

        // 

        this.produtoService.PostProduto(dados,img);

        return null;
    }

}
