import { CategoriaDTO } from "./categoria-dto";

export interface ProdutoDTO{
    id : number,
    nome : String,
    descricao : String,
    enderecoImg : String,
    preco : number,
    categorias :  CategoriaDTO[]
    dataCriacao : String
    idPrecoStripe : String
    idProdutoStripe : String
}