package com.userlogin.v1.dto.categoria;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public class CategoriaUpdateDTO implements Serializable {
    @NotBlank(message = "Id não pode ser vazio")
    private int id;
    @NotBlank(message = "Nome não pode ser vazio")
    private String nome;
    @NotBlank(message = "Descrição não pode ser vazia")
    private String descricao;

    public CategoriaUpdateDTO(int id, String nome, String descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
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
}
