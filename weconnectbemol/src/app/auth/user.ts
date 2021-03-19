export interface User {
    _id?: string;
    token?: string;
    //Aba de Dados Pessoais
    pessoafisjur: string;
    nome: string;
    dtnascimento: string,
    sexo: string;
    cpf: string;
    rg: string;
    telefone: string;
    celular: string;
    //Aba de Dados de Endereço
    cep: string;
    endereco: string;
    cidade: string;
    estado: string;
    bairro: string;
    numero: string;
    complemento: string;
    referencia: string;
    //Aba de Dados da Conta
    email: string;
    senha: String;
    confirmasenha: String;
}
