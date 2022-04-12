let storedProducts = [];

loadData()
checkForm()

function loadData() {
   storedProducts = JSON.parse(localStorage.getItem("products"));
   document.getElementById("totalQuantity").textContent = 0;
   document.getElementById("totalPrice").textContent = 0;
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

function checkForm(){
   const submit = document.getElementById("order");
   let firstName = document.getElementById("firstName");
   let lastName = document.getElementById("lastName");
   let address = document.getElementById("address");
   let city = document.getElementById("city");
   let email = document.getElementById("email");
   let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
   let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
   let addressErrorMsg = document.getElementById("addressErrorMsg");
   let cityErrorMsg = document.getElementById("cityErrorMsg");
   let emailErrorMsg = document.getElementById("emailErrorMsg");
   function msgErrGlobal (){
      return "Vous devez renseigner tous les champs !"
   }
   submit.addEventListener("click", (e) =>{
      if (!firstName.value) {
         firstNameErrorMsg.textContent = msgErrGlobal();
         e.preventDefault();
      } else if (!lastName.value){
         lastNameErrorMsg.textContent = msgErrGlobal();
         e.preventDefault();
      } else if (!address.value){
         addressErrorMsg.textContent = msgErrGlobal();
         e.preventDefault();
      } else if (!city.value){
         cityErrorMsg.textContent = msgErrGlobal();
         e.preventDefault();
      } else if (!email.value){
         emailErrorMsg.textContent = msgErrGlobal();
         e.preventDefault();
      } 
      else{
         console.log("c'est ok")
         e.preventDefault();
         correctInputTest(e)
      }
   })

}

function correctInputTest (e){
   const regex = /[0-9]/g;
   const regexEmail = /[@]/;

   if(regex.test(firstName.value)){
      firstNameErrorMsg.textContent = "Ce champs ne peut pas contenir de chiffre";
      e.preventDefault();
   } 
   else if (regex.test(lastName.value)){
      lastNameErrorMsg.textContent = "Ce champs ne peut pas contenir de chiffre";
      e.preventDefault();
   } 
   else if (regex.test(city.value) ){
      cityErrorMsg.textContent = "Ce champs ne peut pas contenir de chiffre";
      e.preventDefault();
   } 
   else if (!regexEmail.test(email.value)){
      emailErrorMsg.textContent = "Veuillez introduire une adresse valide";
      e.preventDefault();
   } 
   else{
      e.preventDefault();
      console.log("c'est tjs ok")
      sendOrder();
      

   }



}

function sendOrder(){

   for (let index in storedProducts) {

   const orderProducts = {
      contact :{
      
         "firstName": firstName.value,
         "lastName": lastName.value,
         "city": city.value,
         "address": address.value,
         "email": email.value,
      }, products : [storedProducts[index]._id,] 

   };

   storedProducts.push(orderProducts);

   console.log(storedProducts)
   console.log(orderProducts)
   const sendOption = {
      method: "POST",
      body: JSON.stringify(orderProducts),
      headers: {
         'Accept': 'application/json', 
         'Content-Type': 'application/json'
       },
   }


   fetch(`http://localhost:3000/api/products/order`, sendOption)
   .then(function(res) {
      if (res.ok) {
         return res.json();
      }
   })
   .then(function(data) {
      localStorage.clear();
      document.location.href = `confirmation.html?id=${data.orderId}`;
   })
   .catch(function(err) {
      console.log(err);
   }); 
   }
}