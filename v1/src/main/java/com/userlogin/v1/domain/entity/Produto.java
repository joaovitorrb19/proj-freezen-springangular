package com.userlogin.v1.domain.entity;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
public class Produto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String nome;

    private String descricao;

    private Double preco;

    private String dataCriacao = LocalDate.now().toString();

    private String idPrecoStripe;

    private String idProdutoStripe;

    @ManyToMany
    private List<Categoria> categorias;

    private String enderecoImg ;

    public Produto() {
    }

    public Produto(int id, String nome, String descricao, Double preco, String dataCriacao, List<Categoria> categorias) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.dataCriacao = dataCriacao;
        this.categorias = categorias;
    }

    public Produto(int id, String nome, String descricao, Double preco, String dataCriacao, List<Categoria> categorias,String idProdutoStripe,String idPrecoStripe) {
        this(id,nome,descricao,preco,dataCriacao,categorias);
        this.idPrecoStripe = idPrecoStripe;
        this.idProdutoStripe = idProdutoStripe;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Produto produto = (Produto) o;
        return id == produto.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }

    public String getEnderecoImg() {
        return enderecoImg;
    }

    public void setEnderecoImg(String enderecoImg) {
        this.enderecoImg = enderecoImg;
    }

    public String getIdPrecoStripe() {
        return idPrecoStripe;
    }

    public void setIdPrecoStripe(String idPrecoStripe) {
        this.idPrecoStripe = idPrecoStripe;
    }

    public String getIdProdutoStripe() {
        return idProdutoStripe;
    }

    public void setIdProdutoStripe(String idProdutoStripe) {
        this.idProdutoStripe = idProdutoStripe;
    }

    
}

