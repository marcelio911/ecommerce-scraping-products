class Fornecedor {
    nome;
    cnpj;
    email;
    telefone;
    endereco;
    cidade;
    estado;
    cep;
    data_criacao;
    data_atualizacao;
    data_exclusao;

    constructor(
        nome,
        cnpj,
        email,
        telefone,
        endereco,
        cidade,
        estado,
        cep,
        data_criacao,
        data_atualizacao,
        data_exclusao
    ) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
        this.data_exclusao = data_exclusao;
    }
}

class ProdutoCategoria {
    nome;
    descricao;

    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Subcategoria {
    nome;
    descricao;
    categoria;

    constructor(nome, descricao, categoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
    }
}

class Tag {
    nome;

    constructor(nome) {
        this.nome = nome;
    }

}

class Produto {

    nome = '';
    descricao = '';
    preco = 0;
    fornecedor = null;
    nota = 0;
    url = '';
    imagesArr = [];
    categoria = null;
    subcategoria = null;
    avaliacoes = 0;
    totalVendas = 0;
    tags = [];
    status = true;
    data_criacao = new Date();
    data_atualizacao = new Date();
    data_exclusao = null;

    constructor() {
    }

    initialize(
        nome,
        descricao,
        preco,
        fornecedor ,
        rating,
        url,
        images,
        categoria,
        subcategoria,
        avaliacoes,
        totalVendas,
        tags,
        status,
        data_criacao,
        data_atualizacao,
        data_exclusao
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.fornecedor = fornecedor;
        this.nota = rating;
        this.url = url;
        this.imagesArr = images;
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.tags = tags;
        this.avaliacoes = avaliacoes;
        this.totalVendas = totalVendas;
        this.status = status;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
        this.data_exclusao = data_exclusao;
    }

    addImage(src, filename) {
        if (!this.imagesArr) {
            this.imagesArr = [];
        }
        const singleImage = {
            src,
            filename
        }
        this.imagesArr.push(singleImage);
    }
}

const product = new Produto();
Object.freeze(product);

module.exports = { product };
