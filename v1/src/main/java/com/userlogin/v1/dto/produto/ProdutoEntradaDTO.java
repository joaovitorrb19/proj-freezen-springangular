package com.userlogin.v1.dto.produto;

import java.io.File;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.userlogin.v1.domain.entity.Categoria;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ProdutoEntradaDTO {

    @NotBlank(message = "Nome não pode ficar vazio")
    private String nome;
    @NotBlank(message = "Descrição não pode ficar vaziz")
    private String descricao;
    @NotNull(message = "Preço não pode ser vazio")
    @Positive(message = "Preço deve ser diferente de 0")
    private Double preco;
    @NotNull(message = "Categorias não podem ficar vazias")
    private List<Categoria> categorias;
    @NotBlank(message = "Imagem não pode ficar vazia")
    private String img;

    public ProdutoEntradaDTO(@NotBlank(message = "Nome não pode ficar vazio") String nome,
            @NotBlank(message = "Descrição não pode ficar vaziz") String descricao,
            @NotBlank(message = "Preço não pode ficar vazio") Double preco,
            @NotBlank(message = "Categorias não pode ficar vaziz") List<Categoria> categorias,
            @NotBlank(message = "Imagem não pode ficar vazia") String img) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categorias = categorias;
        this.img = img;
    }

    

    public ProdutoEntradaDTO(@NotBlank(message = "Imagem não pode ficar vazia") String img) {
        this.img = img;
    }



    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public Double getPreco() {
        return preco;
    }
    public void setPreco(Double preco) {
        this.preco = preco;
    }
    public List<Categoria> getCategorias() {
        return categorias;
    }
    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }
    public String getImg() {
        return img;
    }
    public void setImg(String img) {
        this.img = img;
    }

    
    
}
