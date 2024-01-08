package com.userlogin.v1.dto.produto;

import com.userlogin.v1.domain.entity.Produto;

public class ProdutoCarrinhoDTO {

    Produto produto;

    int quantidade;

    public ProdutoCarrinhoDTO(Produto produto, int quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    
    
    
}
