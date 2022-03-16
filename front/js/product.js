let params = new URL(window.location).searchParams.get("id");
console.log("params");
console.log(params);

// const item__img = document.getElementsByClassName("item__img");

getItem();
// addToCart();

function getItem (){
   fetch(`http://localhost:3000/api/products/${params}`)
   .then(function(res) {
      if (res.ok) {
      return res.json();
      }
   })
   .then(function(product) {
      console.log("ok");
      show(product);

   })
   .catch(function(err) {
      // Une erreur est survenue
      console.log(err);
   });
}

function show(value){
   const item__img = document.querySelector(".item__img");
   let imgItem = document.createElement("img");
console.log("Show say hello");
console.log(item__img);
   item__img.appendChild(imgItem).src =`${value.imageUrl}`;
   item__img.appendChild(imgItem).alt =`${value.altTxt}`;

   document.getElementById("price").textContent = `${value.price}`;
   document.getElementById("description").textContent = `${value.description}`;
   document.getElementById("title").textContent = `${value.name}`;

   updateSelectorChoice(value.colors)
}

function updateSelectorChoice(colors) {
   let select = document.getElementById("colors");

   for(let i = 0; i < colors.length; i++) {
      let color = colors[i];
      let option = document.createElement("option");
      option.textContent = color;
      option.value = color;
      select.appendChild(option);
   }
}

// function addToCart() {
   // save also the color!
   const btnAddToCart = document.getElementById("addToCart");
   btnAddToCart.addEventListener("click", () =>{
      const quantity = document.getElementById("quantity");
      // const title = document.getElementById("title");
      // const price = document.getElementById("price");
      const selectColor = document.getElementById("colors").value;
      

      if (quantity.value > 0 && quantity.value < 100) {
         let infoProduct = {
            // name: title.textContent,
            // price: parseFloat(price.textContent),
            quantity: parseInt(document.getElementById("quantity").value),
            _id: params,
            color: selectColor,
          };
          console.log(infoProduct);
         let arrayOfProducts = [];
         if (localStorage.getItem("products") !== null) {
            arrayOfProducts = JSON.parse(localStorage.getItem("products"));

          } 
          arrayOfProducts.push(infoProduct);
            localStorage.setItem("products", JSON.stringify(arrayOfProducts));

            console.log(arrayOfProducts)
      }
   } )
// }

// document.getElementById("addToCart").onclick = function addToCart() {
//    let objJson = {
//       id : objectID,
//       quantity : document.getElementById("quantity").value,
//       color : document.getElementById("colors").value
//   }
//   console.log(objJson);
//   let cartItem = JSON.stringify(objJson);
//   localStorage.setItem("cartItem", cartItem);
// }

