let storedProducts = [];

loadData()


function loadData() {
   storedProducts = JSON.parse(localStorage.getItem("products"));

   for (let index in storedProducts) {

      fetch(`http://localhost:3000/api/products/${storedProducts[index]._id}`)
      .then(function(res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function(fetchedProduct) {

         storedProducts[index].price = fetchedProduct.price;
         storedProducts[index].name = fetchedProduct.name;
         storedProducts[index].imageUrl = fetchedProduct.imageUrl;

         showProduct(index);
         addEventListenerOnButton(index);

      })
      .catch(function(err) {
         console.log(err);
      }); 
   }
}

function showProduct(index) {
  
   //CREATE <article>
   let articleCart = document.createElement("article");
   articleCart.classList.add("cart__item");
   cart__items.appendChild(articleCart);

   //CREATE div with img
   let cart__item__img = document.createElement("div");
   let imgItem = document.createElement("img");
   cart__item__img.classList.add("cart__item__img");
   articleCart.appendChild(cart__item__img);
   cart__item__img.appendChild(imgItem).src = `${storedProducts[index].imageUrl}`;

   //CREATE div description item

   let cart__item__content = document.createElement("div");
   let cart__item__content__description = document.createElement("div");
   let titleCartItem = document.createElement("h2");
   let colorInfoItem = document.createElement("p");
   let priceItem = document.createElement("p");

   cart__item__content.classList.add("cart__item__content");
   cart__item__content__description.classList.add("cart__item__content__description");
   priceItem.classList.add("price");

   articleCart.appendChild(cart__item__content);
   cart__item__content.appendChild(cart__item__content__description);
   cart__item__content__description.appendChild(titleCartItem);
   cart__item__content__description.appendChild(colorInfoItem);
   cart__item__content__description.appendChild(priceItem);

   titleCartItem.textContent = storedProducts[index].name;
   priceItem.textContent = storedProducts[index].price+ " €";
   colorInfoItem.textContent = storedProducts[index].color;

   //CREATE block quantity
   let content__settings = document.createElement("div");
   let content__settings__quantity = document.createElement("div");
   let quantityItem = `<p>Qté : ${storedProducts[index].quantity}</p>
   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storedProducts[index].quantity}">`;

   content__settings.classList.add("cart__item__content__settings");
   content__settings__quantity.classList.add("cart__item__content__settings__quantity");

   cart__item__content.appendChild(content__settings);
   content__settings.appendChild(content__settings__quantity).innerHTML = `<p>Qté : ${storedProducts[index].quantity}</p>
   <input type="number" class="itemQuantity${index}" name="itemQuantity" min="1" max="100" value="${storedProducts[index].quantity}">`;

   //CREATE div delete

   let content__settings__delete = document.createElement("div");
   content__settings__delete.classList.add("cart__item__content__settings__delete");
   content__settings.appendChild(content__settings__delete).innerHTML = `<p class="deleteItem${index}">Supprimer</p>`

   //Total
   totalPrice();
   totalQuantity();

   //Update Quantity
   updateQuantityArticle(index, storedProducts[index].quantity);

}


function totalPrice() {
   let sommeTotalPrice = storedProducts.reduce((previous, current) => previous + (current.price * current.quantity), 0);
   document.getElementById("totalPrice").textContent = sommeTotalPrice;

}

// function totalPrice() {
//    ArrayOfPrice = [];

//    for(let priceIndex in storedProducts){
//       ArrayOfPrice.push(storedProducts[priceIndex].price * storedProducts[priceIndex].quantity);
//       console.log(ArrayOfPrice);
//    }
//    const reducer = (accumulator, curr) => accumulator + curr;
//    let total = ArrayOfPrice.reduce(reducer)
//    document.getElementById("totalPrice").textContent = total;
// }

// function totalPrice() {
//    let totalPrice = 0;

//    for(let priceIndex in storedProducts){
//       totalPrice += storedProducts[priceIndex].price * storedProducts[priceIndex].quantity;
//       console.log(totalPrice);
//    }
//    document.getElementById("totalPrice").textContent = totalPrice;

// }




function totalQuantity() {
   let totalQuantity = 0;

   for(let quantityIndex in storedProducts){
      totalQuantity += storedProducts[quantityIndex].quantity;
      // console.log(totalQuantity);
   }
   document.getElementById("totalQuantity").textContent = totalQuantity;

}

function addEventListenerOnButton(index){
   const button = document.querySelector(".deleteItem"+index);
   button.addEventListener("click", ()=>{
         storedProducts.splice(index, 1);
         localStorage.setItem("products", JSON.stringify(storedProducts));
         location.reload();
      });
}

function updateQuantityArticle(index){
  const itemQuantity = document.querySelector(".itemQuantity"+index);
   itemQuantity.addEventListener("change", ()=>{
      storedProducts[index].quantity = parseInt(document.querySelector(".itemQuantity"+index).value)
      localStorage.setItem("products", JSON.stringify(storedProducts));
      location.reload();
   });
};
