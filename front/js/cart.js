
loadData()

function loadData() {

   let localStorageItems = JSON.parse(localStorage.getItem("products"));
   for (let index in localStorageItems) {

      fetch(`http://localhost:3000/api/products/${localStorageItems[index]._id}`)
      .then(function(res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function(product) {
         console.log("ok");
         let productToShow = [];
         productToShow.price = product.price;
         productToShow.name = product.name;
         productToShow.imageUrl = product.imageUrl;
         productToShow.color = localStorageItems[index].color;
         productToShow.quantity = localStorageItems[index].quantity;
         showProduct(productToShow);
         
      })
      .catch(function(err) {
         console.log(err);
      }); 

   }
}

function showProduct(data) {
   //CREATE <article>
   let articleCart = document.createElement("article");
   articleCart.classList.add("cart__item");
   cart__items.appendChild(articleCart);

   //CREATE div with img
   let cart__item__img = document.createElement("div");
   let imgItem = document.createElement("img");
   cart__item__img.classList.add("cart__item__img");
   articleCart.appendChild(cart__item__img);
   cart__item__img.appendChild(imgItem).src = `${data.imageUrl}`;

   //CREATE div description item

   let cart__item__content = document.createElement("div");
   let cart__item__content__description = document.createElement("div");
   let titleCartItem = document.createElement("h2");
   let colorInfoItem = document.createElement("p");
   let priceItem = document.createElement("p");

   cart__item__content.classList.add("cart__item__content");
   cart__item__content__description.classList.add("cart__item__content__description");

   articleCart.appendChild(cart__item__content);
   cart__item__content.appendChild(cart__item__content__description);
   cart__item__content__description.appendChild(titleCartItem);
   cart__item__content__description.appendChild(colorInfoItem);
   cart__item__content__description.appendChild(priceItem);

   titleCartItem.textContent = data.name;
   priceItem.textContent = data.price;
   colorInfoItem.textContent = data.color;
   console.log(data.color);
}
