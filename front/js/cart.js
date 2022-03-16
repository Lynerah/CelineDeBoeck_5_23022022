// let localStorageItems = JSON.parse(localStorage.getItem("products"));

loadDataFromLocalStorage()
function loadDataFromLocalStorage() {
   // 1 cree une variable qui va stocker ton product
   let localStorageItems = JSON.parse(localStorage.getItem("products"));
   console.log(localStorageItems);
   // 2 recuperer les data a partir de local storage
   for (let item in localStorageItems) {
      let id = localStorageItems[item]._id;
      let quantity = localStorageItems[item].quantity;
      let color = localStorageItems[item].color;
      console.log(color);

   // 3 appeler l'api a partir de l'id stocker
      fetch(`http://localhost:3000/api/products/${id}`)
      .then(function(res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function(product) {
         console.log("ok");
         product.color = color;
         product.quantity = quantity;
         showProduct(product);
         

      })
      .catch(function(err) {
         // Une erreur est survenue
         console.log(err);
      });
      // 4 afficher les donnees 

   }
}

// function loadDataFromAPI(){
//    fetch(`http://localhost:3000/api/products`)
//    .then(function(res) {
//       if (res.ok) {
//       return res.json();
//       }
//    })
//    .then(function(product) {
//       console.log("ok");
//       showProduct(product);

//    })
//    .catch(function(err) {
//       // Une erreur est survenue
//       console.log(err);
//    });
// }

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
   colorInfoItem = data.color;
   console.log(colorInfoItem)
;}




// fetchData()
// console.log(localStorageItems)

// function fetchData(){
//    console.log("coucou");
//    fetch(`http://localhost:3000/api/products`)
//    .then(function(res) {
//       if (res.ok) {
//       return res.json();
//       }
//    })
//    .then(function(product) {
//       console.log("ok");
//       showProduct(product);

//    })
//    .catch(function(err) {
//       // Une erreur est survenue
//       console.log(err);
//    });
// }
//    // for (let item in localStorageItems) {
//       // showProduct();
//       // console.log(item);
//    // }

// function showProduct(product) {
//    for (let item in localStorageItems) {
//    // show signle product
//    console.log(item);
//    //CREATE <article>
//    let articleCart = document.createElement("article");
//    articleCart.classList.add("cart__item");
//    cart__items.appendChild(articleCart);

//    //CREATE div with img
//    let cart__item__img = document.createElement("div");
//    let imgItem = document.createElement("img");
//    cart__item__img.classList.add("cart__item__img");
//    articleCart.appendChild(cart__item__img);
//    cart__item__img.appendChild(imgItem).src = `${product[localStorageItems[item]._id].imageUrl}`;

//    //CREATE div description item

//    let cart__item__content = document.createElement("div");
//    let cart__item__content__description = document.createElement("div");
//    let titleCartItem = document.createElement("h2");
//    let colorInfoItem = document.createElement("p");
//    let priceItem = document.createElement("p");

//    cart__item__content.classList.add("cart__item__content");
//    cart__item__content__description.classList.add("cart__item__content__description");

//    articleCart.appendChild(cart__item__content);
//    cart__item__content.appendChild(cart__item__content__description);
//    cart__item__content__description.appendChild(titleCartItem);
//    cart__item__content__description.appendChild(colorInfoItem);
//    cart__item__content__description.appendChild(priceItem);

//    titleCartItem.innerHTML = localStorageItems[item].name;
//    // colorInfoItem.innerHTML = localStorageItems[item].colors;

//    }
// };
