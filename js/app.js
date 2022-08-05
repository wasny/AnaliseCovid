import dados from '../data/products.json' assert { type: 'json' }

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
  <figure class="product-figure">
    <img src="${product.image_link}" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
<span class="product-brand background-price">R$ ${Number(product.price * 5.50).toFixed(2)}</span></div>
  </section>
  ${loadDetails(product)}
</div>`;
return item;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${Number(product.price* 5.50).toFixed(2)}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${(product.rating?product.rating:0)}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>`;
      return details;
}

const catalog = document.querySelector('.catalog');

function filtrarName(vDados, filtro){
  console.log(`filtrarName :  ${filtro}`)
  const vAux = vDados.filter(item => item.name.includes(filtro));
  return vAux;
}
function filtrarbrand(vDados, filtro){
  const vAux = vDados.filter(item => item.brand === filtro);
  return vAux;
}
function filtrarType(vDados, filtro){
  console.log(`filtrarType ${filtro}`)
  const vAux = vDados.filter(item => item.product_type == filtro);
  return vAux;
}

function orderRating(vDados){
  const vAux = vDados.sort((a,b) => {
    return  (!b.rating?0:b.rating) -  (!a.rating?0:a.rating) ;
  });
  return vAux;
}
function orderPreco(vDados, asc){
  const vAux = vDados.sort((a,b) => {
    return (a.price - b.price) * asc;
  });
  return vAux;
}
function orderName(vDados, asc){
  const vAux = vDados.sort((a,b) => {
    return (a.name.localeCompare(b.name)) * asc;
  });
  return vAux;
}

function ordenarGaleria(pDados){
  let elem = document.getElementById('sort-type');

  let oDados = pDados;

  if(elem.value == 'Melhor Avaliados'){
    oDados =orderRating(oDados);
  }
  if(elem.value == 'Menores Preços'){
    oDados =orderPreco(oDados, 1);
  }
  if(elem.value == 'Maiores Preços'){
    oDados =orderPreco(oDados, -1);
  }
  if(elem.value == 'A-Z'){
    oDados =orderName(oDados, 1);
  }
  if(elem.value == 'Z-A'){
    oDados = orderName(oDados, -1);
  }
  exibirCatalogo(oDados);
}

function exibirCatalogo(vDados){
  let items = '';
  vDados.forEach(element => {
    items = items + productItem(element);
  });
  
  catalog.innerHTML = items;
}

const elem = document.getElementById('sort-type');
elem.addEventListener("change", filtrarDados);

const vTipos = new Array();
const vMarca = new Array();

dados.forEach(elem => {
  if(vTipos.indexOf(elem.product_type) === -1){
    vTipos.push(elem.product_type);
  }
  if(vMarca.indexOf(elem.brand) === -1){
    vMarca.push(elem.brand);
  }
});

let ovTipos = vTipos.sort();
let ovMarca = vMarca.sort();

let tipoSelect = document.getElementById('filter-type');
let marcaSelect = document.getElementById('filter-brand');
let filtroNome  = document.getElementById('filter-name');
ovTipos.forEach(elem =>{
  let novoItem = document.createElement('option');
  novoItem.value = elem;
  novoItem.innerText = elem;
  tipoSelect.appendChild(novoItem);
})

ovMarca.forEach(elem =>{
  let novoItem = document.createElement('option');
  novoItem.value = elem;
  novoItem.innerText = elem;
  marcaSelect.appendChild(novoItem);
})

function filtrarDados(){
  console.log('evento executado');
  let tipoSelect = document.getElementById('filter-type');
  let marcaSelect = document.getElementById('filter-brand');
  let filtroNome  = document.getElementById('filter-name');
  let fDados = dados;
  if(filtroNome.value){
    fDados = filtrarName(fDados, filtroNome.value);
  }
  if(marcaSelect.value){
    fDados = filtrarbrand(fDados, marcaSelect.value);
  }
  if(tipoSelect.value){
    fDados = filtrarType(fDados, tipoSelect.value);
  }
  ordenarGaleria(fDados);
}

tipoSelect.addEventListener('change', filtrarDados);
marcaSelect.addEventListener('change', filtrarDados);
filtroNome.addEventListener('keypress', filtrarDados);

filtrarDados();