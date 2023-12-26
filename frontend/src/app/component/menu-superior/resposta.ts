
export interface Resposta{

    id : number,
    nome : string,
    email : string,
    cpf : string,
    nascimento : string,
    password : string,
    telefone : string,
    role : {
        id : number,
        role : string
    }

}