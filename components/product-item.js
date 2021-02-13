// product-item.js

class ProductItem extends HTMLElement {
  


  constructor() {
    super();

    let shadow = this.attachShadow({mode: 'open'});

    shadow.innerHTML = `
      <li class="product">
        <img src="src" alt="alt" width=200>
        <p class="title">title</p>
        <p class="price">price</p>
        <button onclick="this.getRootNode().host.buttonClick()">Add to Cart</button>
      </li>
    `;
    let style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;
    shadow.appendChild(style);
    
  }

  connectedCallback(){
    let shadow = this.shadowRoot;


    let image = shadow.querySelector('img');
    if(this.hasAttribute('src')){
      image.setAttribute('src', this.getAttribute('src'));
    }

    let title = shadow.querySelector('.title');
    if(this.hasAttribute('title')){
      title.textContent = this.getAttribute('title');
      image.setAttribute('alt', this.getAttribute('title'));
    }
    
    let price = shadow.querySelector('.price');
    if(this.hasAttribute('price')){
      price.textContent = this.getAttribute('price');
    }

    let button = shadow.querySelector('button');
    if(this.hasAttribute('in-cart')){
      button.textContent = 'Remove from Cart'
    }
  }

  buttonClick(){
    let button = this.shadowRoot.querySelector('button');
    if(button.textContent=='Add to Cart'){
      alert('Added to Cart!');
      this.dispatchEvent(new Event('add-to-cart', {bubbles: true, composed:true}));
      button.textContent = 'Remove from Cart';
    }
    else{
      this.dispatchEvent(new Event('remove-from-cart', {bubbles: true, composed: true}));
      button.textContent = 'Add to Cart';
    }
  }

}

customElements.define('product-item', ProductItem);