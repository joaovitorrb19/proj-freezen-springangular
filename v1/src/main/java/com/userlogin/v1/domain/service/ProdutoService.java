package com.userlogin.v1.domain.service;

import java.io.File;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.userlogin.v1.domain.entity.Categoria;
import com.userlogin.v1.domain.entity.Produto;
import com.userlogin.v1.domain.exceptions.UniqueException;
import com.userlogin.v1.domain.repository.ProdutoRepository;
import com.userlogin.v1.dto.produto.ProdutoEntradaDTO;
import com.userlogin.v1.mapper.ProdutoMapper;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class ProdutoService {

    @Autowired
    ProdutoRepository produtoRepository;

    ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();

    Validator validator = this.validatorFactory.getValidator();

    public Set<String> PostProduto(Map<String, String> dados, MultipartFile img) {

        Set<String> set = new HashSet<>();

        Set<Entry<String, String>> entrySet = dados.entrySet();

           File file = new File("/Desktop/Projeto/proj-freezen-springangular/frontend/src/assets/imagensProdutos/");
           
        try{

        
            byte[] bytes = img.getBytes();
            Path path = Paths.get("/Desktop/Projeto/proj-freezen-springangular/frontend/src/assets/imagensProdutos/",img.getOriginalFilename());
            Files.write(path,bytes);
            produtoEntradaDTO.setImg(path.toString());

        } catch(Exception e){

        }

        ProdutoEntradaDTO produtoEntradaDTO = new ProdutoEntradaDTO(img);

        List<Categoria> categorias = new ArrayList<>();

        for (Entry<String, String> entry : entrySet) {
            
            if(entry.getKey().equals("nome"))
                produtoEntradaDTO.setNome(entry.getValue());

            if(entry.getKey().equals("descricao"))
                produtoEntradaDTO.setDescricao(entry.getValue());

            if(entry.getKey().equals("preco"))
                produtoEntradaDTO.setPreco(Double.parseDouble(entry.getValue()));

            if(entry.getKey().contains("categoria"))
                categorias.add(new Categoria(Integer.parseInt(entry.getValue())));
        }
         

        produtoEntradaDTO.setCategorias(categorias);
        java.util.Set<ConstraintViolation<ProdutoEntradaDTO>> validate = this.validator.validate(produtoEntradaDTO);

        if(!validate.isEmpty()){
            validate.forEach(x -> set.add(x.getMessage()));
            return set;
        }

        Produto produto = ProdutoMapper.INSTANCE.produtoDtoToProduto(produtoEntradaDTO);

        try{
                this.produtoRepository.save(produto);
                set.add("Adicionado com sucesso");
                return set;
        }
        catch (Exception e){
            throw new UniqueException("Produto já existe");
        }


    }

}
