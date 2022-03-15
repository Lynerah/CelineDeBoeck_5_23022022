let localStorageItems = JSON.parse(localStorage.getItem("products"));

function showSelectProduct (value){
   if (localStorage.getItem("products")) {
      for (let item in localStorageItems) {
         //CREATE <article>
         let articleCart = document.createElement("article");
         articleCart.classList.add("cart__item");
         cart__items.appendChild(articleCart);

         //CREATE div with img
         let cart__item__img = document.createElement("div");
         // let imgItem = document.createElement("img");
         cart__item__img.classList.add("cart__item__img");
         articleCart.appendChild(cart__item__img);
         // cart__item__img.appendChild(imgItem).src = localStorageItems;

         //CREATE div description item

         let cart__item__content = document.createElement("div");
         let cart__item__content__description = document.createElement("div");
         let titleCartItem = document.createElement("h2");
         let colorInfoItem = document.createElement("p");
         let priceItem = document.createElement("p");

         cart__item__content.classList.add("cart__item__content");
         cart__item__content__description.classList.add("cart__item__content__description");


   }
}};
