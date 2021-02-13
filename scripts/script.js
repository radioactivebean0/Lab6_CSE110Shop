// Script.js


async function fetchProducts(){
  let response = await fetch('https://fakestoreapi.com/products');
  let products = await response.json();
  window.localStorage.setItem("products", JSON.stringify(products));
  window.localStorage.setItem("cart", "");
}

function addToCart(event){
  let cartCount = document.getElementById("cart-count");
  cartCount.innerText = Number(cartCount.innerText)+1;
  let cart = [];
  try{
    cart = JSON.parse(window.localStorage.getItem("cart"));
  }
  catch(exception){}
  cart.push(event.target.getAttribute("title"));
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(event){
  let cartCount = document.getElementById("cart-count");
  cartCount.innerText = Number(cartCount.innerText)-1;
  let cart = [];
  try{
    cart = JSON.parse(window.localStorage.getItem("cart"));
  }
  catch(exception){}
  for(let i = 0; i < cart.length; i++){
    if (cart[i] == event.target.getAttribute("title")){
      cart.splice(i, i+1);
    }
  }
  window.localStorage.setItem("cart", JSON.stringify(cart));
}

function addProducts(){
  let list = document.getElementById("product-list");
  let products = JSON.parse(window.localStorage.getItem("products"));
  let cart = JSON.parse(window.localStorage.getItem('cart'));
  let cartCount = document.getElementById("cart-count");
  for(let i = 0; i < products.length; i++){
    let prod = document.createElement("product-item");
    prod.setAttribute('src', products[i].image);
    prod.setAttribute('title', products[i].title);
    prod.setAttribute('price', "$"+products[i].price);
    prod.addEventListener('add-to-cart', addToCart);
    prod.addEventListener('remove-from-cart', removeFromCart);
    if (cart != null && cart.indexOf(products[i].title)!=-1){
      prod.setAttribute('in-cart', true);
      cartCount.innerText = Number(cartCount.innerText)+1;
    }

    list.appendChild(prod);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if(!window.localStorage.getItem("products")){
    fetchProducts().then(addProducts);
  }
  else{
    addProducts();
  }
  
});

