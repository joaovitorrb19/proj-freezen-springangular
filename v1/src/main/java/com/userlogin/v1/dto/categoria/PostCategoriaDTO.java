package com.userlogin.v1.dto.categoria;

import jakarta.validation.constraints.NotBlank;

public class PostCategoriaDTO {
    @NotBlank(message = "Nome não pode ficar vazio")
    private String nome;

    @NotBlank(message = "Nome não pode ficar vazio")
    private String descricao;

    public PostCategoriaDTO(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
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
