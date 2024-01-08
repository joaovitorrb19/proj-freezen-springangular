package com.userlogin.v1.controller;

import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.stripe.exception.StripeException;
import com.userlogin.v1.domain.entity.Produto;
import com.userlogin.v1.domain.service.ProdutoService;
import com.userlogin.v1.dto.produto.ProdutoCarrinhoDTO;
import com.userlogin.v1.dto.produto.ProdutoEntradaDTO;
import com.userlogin.v1.dto.produto.ProdutoFinalizarCarrinhoDTO;

@RestController
@RequestMapping("produto")
public class ProdutoController {

    @Autowired
    ProdutoService produtoService;
    
    @PostMapping("post")
    @Secured("ADMIN")
    public ResponseEntity<Set<String>> PostProduto(@RequestParam Map<String,String> dados,MultipartFile img){

        Set<String> postProduto = this.produtoService.PostProduto(dados,img);

        if(postProduto.size() == 1){
            return ResponseEntity.ok(postProduto);
        } else {
            return ResponseEntity.badRequest().body(postProduto);
        }

    }

    @PostMapping("finalizarpedido")
    public ResponseEntity<String> FinalizarPedido(@RequestParam Map<String,String> produtos) throws StripeException{
        
        String finalizarPedido = this.produtoService.FinalizarPedido(produtos);

        return ResponseEntity.ok(finalizarPedido);
    }

    @GetMapping("get")
    public ResponseEntity<List<Produto>> GetAll(){
        
        List<Produto> getAll = this.produtoService.GetAll();

        return ResponseEntity.ok(getAll);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<Produto> GetById(@PathVariable int id){

        Produto getById = this.produtoService.GetById(id);

        return ResponseEntity.ok(getById);

    }

    @DeleteMapping("delete/{id}")
    @Secured("ADMIN")
    public ResponseEntity<Set<String>> Delete(@PathVariable int id){
        this.produtoService.Delete(id);
        HashSet<String> resposta = new HashSet<>();
        resposta.add("Deletado com sucesso");
        return ResponseEntity.ok(resposta);
    }  

    @PutMapping("update/{id}")
    @Secured("ADMIN")
    public ResponseEntity<Set<String>> Update(@PathVariable int id,@RequestParam Map<String,String> dados,MultipartFile img){
        this.produtoService.Update(id,dados,img);
        Set<String> resposta = new HashSet<String>();
        return ResponseEntity.ok(resposta);
    }

}
