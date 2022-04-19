let productId = new URL(window.location).searchParams.get("id");

fetchItem();

function fetchItem (){
   fetch(`http://localhost:3000/api/products/${productId}`)
   .then(function(res) {
      if (res.ok) {
      return res.json();
      }
   })
   .then(function(fetchedProduct) {
      console.log("ok");
      show(fetchedProduct);

   })
   .catch(function(err) {
      // Une erreur est survenue
      console.log(err);
   });
}

function show(product){
   const item__img = document.querySelector(".item__img");
   let imgItem = document.createElement("img");
   item__img.appendChild(imgItem).src =`${product.imageUrl}`;
   item__img.appendChild(imgItem).alt =`${product.altTxt}`;

   document.getElementById("price").textContent = `${product.price}`;
   document.getElementById("description").textContent = `${product.description}`;
   document.getElementById("title").textContent = `${product.name}`;

   updateColorSelector(product.colors)
}

function updateColorSelector(colors) {
   let select = document.getElementById("colors");

   for(let i = 0; i < colors.length; i++) {
      let color = colors[i];
      let option = document.createElement("option");
      option.textContent = color;
      option.value = color;
      select.appendChild(option);
   }
}

const btnAddToCart = document.getElementById("addToCart");
btnAddToCart.addEventListener("click", () =>{
   addButtonEvent();
} )

function addButtonEvent() {
   const quantity = document.getElementById("quantity");
   const color = document.getElementById("colors").value;
   addItemToCart(quantity, color);
}

function addItemToCart(quantity, color) {
   // check quantity is enough to be add to cart

   let quantityRequirement = quantity.value > 0 && quantity.value < 100;

   let colorRequirement = color !== "";


   if (quantityRequirement && colorRequirement) {
      let newProduct = {
         quantity: parseInt(document.getElementById("quantity").value),
         _id: productId,
         color: color,
      };
      storeProduct(newProduct);
   }
}

function storeProduct(newProduct) {
   
   let products = [];

   // loadProduct from local storage
   if (localStorage.getItem("products") !== null) {
      products = JSON.parse(localStorage.getItem("products"));
   } 

   // try to find the index of an existing product
   function alreadyInCart(product) {
      return product._id == newProduct._id && product.color == newProduct.color;
   }
   let index = products.findIndex(alreadyInCart);



   // if the product exist, update, else add
   if (index !== -1) {
      quantity = parseInt(document.getElementById("quantity").value),
      products[index].quantity += quantity;

   } else {
      products.push(newProduct);
   }

   // save to local storage
   localStorage.setItem("products", JSON.stringify(products));

}