package com.userlogin.v1.dto.produto;

public class ProdutoFinalizarCarrinhoDTO {
        String idPrecoStripe;
        long quantidade;

        

        public ProdutoFinalizarCarrinhoDTO(String idPrecoStripe, long quantidade) {
            this.idPrecoStripe = idPrecoStripe;
            this.quantidade = quantidade;
        }
        public String getIdPrecoStripe() {
            return idPrecoStripe;
        }
        public void setIdPrecoStripe(String idPrecoStripe) {
            this.idPrecoStripe = idPrecoStripe;
        }
        public long getQuantidade() {
            return quantidade;
        }
        public void setQuantidade(long quantidade) {
            this.quantidade = quantidade;
        }

        
}
