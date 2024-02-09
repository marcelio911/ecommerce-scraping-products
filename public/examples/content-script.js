
(async () => {
  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
//   document.body.style.backgroundColor = 'green';

})();
let product = {};

const eventsToPrepareLoadProductsModal = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const clickElements = (elements) => {
    elements.forEach((el) => {
      if (el.nodeType === Node.ELEMENT_NODE) {
        try {
          document.getElementsByClassName(el.className)[0].click();
          // console.log('el', el.className  )
        } catch (error) {

        }
        clickElements(el.childNodes);
      }
    });
  };
  // how to getElementsByClassName after select section
  const product = document.getElementsByClassName('product-briefing')[0];
  const briefing = product.childNodes[2].childNodes[1];

  if (briefing) {
    clickElements(Array.from(briefing.childNodes));
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

}

const prepareSendMessageToExtension = async (src, ext) => {
  const newPerms = { permissions: ['topSites'] };
  // Enviar a URL para o listener na extensão
  await chrome.runtime.sendMessage({greeting: "hello"});
  await chrome.runtime.sendMessage({ type: 'product', request: { product } });

}

const getInfoProduct = () => {
}

const getShopeeImages = async () => {
  const {Produto} = await getProducts();
  product = new Produto();
  // console.log('Produto:: ', product.addImage);
  const innerModal = document.querySelector('#modal');
  if (!innerModal) {
    return;
  }
  const images = innerModal.querySelectorAll('img');
  for (const image of images) {
    const ext = image.src.split('.').pop();
    // console.log('img ', image.src, + ' filename: '+ image.className + ext);
    product.addImage(image.src, image.className + ext);
    await chrome.runtime.sendMessage({ type: 'url', request: { url: image.src } });

  }
}


const initializeGetShopeeProductInfoByPage = async () => {
  await eventsToPrepareLoadProductsModal();
  await getShopeeImages();
  await getInfoProduct();
  prepareSendMessageToExtension();

}


(async () => {
  console.log('Content script running');
  await initializeGetShopeeProductInfoByPage();

})();

const getProducts = async () => {
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

  return { Produto, Fornecedor, ProdutoCategoria, Subcategoria, Tag};
}


