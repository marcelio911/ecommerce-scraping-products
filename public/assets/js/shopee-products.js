
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
  const response = await chrome.runtime.sendMessage({ type: 'produto', request: { product } });
  console.log('response::product', response);

}

const getInfoProduct = async () => {

  const searchMetadataElements = (elements) => {
    let idx=-1;
    let copy = [];
    elements.forEach((el) => {
      copy.push(el);
      if (el.nodeType === Node.ELEMENT_NODE) {
        try {
          if (String(el.innerText).startsWith('Cor')) {
            product.frete = copy[idx].innerText.split('\n');
            console.log('frete[idx]', copy[idx]  )
          }
          if (String(el.innerText).startsWith('Tam')) {
            product.cores = copy[idx].innerText.split('\n');
            console.log('cores[idx]', copy[idx]  )

          }
          if (String(el.innerText).startsWith('Frete')) {
            product.tamanho = copy[idx].innerText.split('\n');
            console.log('tamanho[idx]', copy[idx]  )
            console.log('tamanho[idx - 1]', copy[idx - 1]  )
            console.log('tamanho[idx + 1]', copy[idx + 1]  )

          }
          if (String(el.innerText).startsWith('Quantidade')) {
            product.disponibilidade = copy[idx + 1].innerText.split('\n');
            console.log('Quantidade[idx]', copy[idx]  )
            console.log('Quantidade[idx - 1]', copy[idx - 1]  )
            console.log('Quantidade[idx + 1]', copy[idx + 1]  )

          }
        } catch (error) {

        }
        idx++;
        searchMetadataElements(el.childNodes);
      }
    });
  };
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const briefing = document.getElementsByClassName('product-briefing')[0]
    .childNodes[3].childNodes[1];

  product.nome = briefing.childNodes[0].innerText;
  product.totalVendas = briefing.childNodes[1].childNodes[2].innerText;
  const price = briefing.childNodes[2].childNodes[1] ?? briefing.childNodes[2].childNodes[0];
  product.preco = price.innerText.split('\n');
  product.frete = briefing.childNodes[3].childNodes[0].childNodes[2].innerText.split('\n');

  const meta = Array.from(briefing.childNodes[3].childNodes[0].childNodes)
  searchMetadataElements(meta);

  console.log('window:: ', window.scrollY);
  scroll(window.scrollY, window.scrollY + 1680);
  await new Promise((resolve) => setTimeout(resolve, 2500));


  const avaliacoesSession = document.getElementsByClassName('product-ratings')[0].childNodes[1];
  product.rating = avaliacoesSession.childNodes[0].childNodes[0].innerText;
  product.avaliacoes = avaliacoesSession.childNodes[1].innerText;


  const detalhes = document.getElementsByClassName('product-detail')[0];
  console.log('detalhes:: ', detalhes);
  console.log('detalhes:: ', detalhes.childNodes);

  product.categoria = detalhes.childNodes[0].childNodes[1].childNodes[0].innerText;
  console.log('categoria:: ', product.categoria);
  product.descricao = detalhes.childNodes[1].childNodes[1].innerText;

  product.totalEstoqueDesconto = detalhes.childNodes[0].childNodes[1].childNodes[2].innerText;
  product.totalEstoque = detalhes.childNodes[0].childNodes[1].childNodes[3].innerText;
  product.origemDoProduto = detalhes.childNodes[0].childNodes[1].childNodes[4].innerText;

  console.log('window:: ', window.scrollY);
  scroll(window.scrollY, window.scrollY - 1200);

  product.status = true;
  product.data_criacao = new Date();
  product.data_atualizacao = new Date();
  product.data_exclusao = null;


  console.log('product:: ', product);
  return product;
}

const getShopeeImages = async () => {

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
  }
}


const initializeGetShopeeProductInfoByPage = async () => {
  const {Produto} = await getProducts();
  product = new Produto();
  await getInfoProduct();
  await eventsToPrepareLoadProductsModal();
  await getShopeeImages();
  prepareSendMessageToExtension();

}


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
    totalEstoque = 0;
    totalEstoqueDesconto = 0;
    tags = [];
    disponibilidade = 0;
    cores = [];
    tamanho = [];
    origemDoProduto = '';

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
        totalEstoque,
        totalEstoqueDesconto,
        tags,
        disponibilidade,
        cores,
        tamanho,
        origemDoProduto,
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
        this.disponibilidade = disponibilidade;
        this.cores = cores;
        this.tamanho = tamanho;
        this.origemDoProduto = origemDoProduto;
        this.avaliacoes = avaliacoes;
        this.totalVendas = totalVendas;
        this.totalEstoque = totalEstoque;
        this.totalEstoqueDesconto = totalEstoqueDesconto;
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

(async () => {
  console.log('Content script running');
  await initializeGetShopeeProductInfoByPage();
})();

