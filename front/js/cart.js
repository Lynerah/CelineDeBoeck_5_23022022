// Mains values
let storedProducts = [];


const regex = /(?=^.{3,15}$)(?!^[_-].+)(?!.+[_-]$)(?!.*[_-]{2,})[^<>[\]{}|\\\/^~%# :;,$%@!&*()+={}'"`.?0-9\0-\cZ]+$/;
// General Email Regex (RFC 5322 Official Standard)
// https://www.emailregex.com
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Load stored data from local storage
loadStoredData()

// UI Elements
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

// call setups methods
// - setup fields values
setupDefaultFieldsValue()
// - setup fields conditions
setupFieldsConditions();
// - setup send button
setupSendButton()

// Set price and quantity to 0 by default 
function setupDefaultFieldsValue() {
   document.getElementById("totalQuantity").textContent = 0;
   document.getElementById("totalPrice").textContent = 0;
}

// Fetch data for single product 
function loadStoredData() {
   storedProducts = JSON.parse(localStorage.getItem("products"));
   for (let index in storedProducts) {
      fetch(`http://localhost:3000/api/products/${storedProducts[index]._id}`)
      .then(function(res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function(fetchedProduct) {

         // update storedProduct values at index with fetched values
         storedProducts[index].price = fetchedProduct.price;
         storedProducts[index].name = fetchedProduct.name;
         storedProducts[index].imageUrl = fetchedProduct.imageUrl;

         createUIElement(index);
         deleteButtonEventListener(index);
      })
      .catch(function(err) {
        console.log(err);
      }); 
   }
}

// Create HTML UI element 
function createUIElement(index) {
  
   // CREATE <article>
   let articleCart = document.createElement("article");
   articleCart.classList.add("cart__item");
   cart__items.appendChild(articleCart);

   // CREATE div with img
   let cart__item__img = document.createElement("div");
   let imgItem = document.createElement("img");
   cart__item__img.classList.add("cart__item__img");
   articleCart.appendChild(cart__item__img);
   cart__item__img.appendChild(imgItem).src = `${storedProducts[index].imageUrl}`;

   // CREATE div description item
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

   // CREATE block quantity
   let content__settings = document.createElement("div");
   let content__settings__quantity = document.createElement("div");
   let quantityItem = `<p>Qté : ${storedProducts[index].quantity}</p>
   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storedProducts[index].quantity}">`;

   content__settings.classList.add("cart__item__content__settings");
   content__settings__quantity.classList.add("cart__item__content__settings__quantity");

   let quantityRequirement = storedProducts[index].quantity > 0 && storedProducts[index].quantity <= 100;
   cart__item__content.appendChild(content__settings);
   
   if (quantityRequirement) {
      content__settings.appendChild(content__settings__quantity).innerHTML = `<p>Qté : ${storedProducts[index].quantity}</p>
      <input type="number" class="itemQuantity${index}" name="itemQuantity" min="1" max="100" value="${storedProducts[index].quantity}">`;
      totalPrice();
      updateTotalQuantity();
   }

   // CREATE div delete
   let content__settings__delete = document.createElement("div");
   content__settings__delete.classList.add("cart__item__content__settings__delete");
   content__settings.appendChild(content__settings__delete).innerHTML = `<p class="deleteItem${index}">Supprimer</p>`

   // Update Quantity
   updateArticleQuantity(index, storedProducts[index].quantity);
}

// Calculate the total price and show
function totalPrice() {
   let result = storedProducts.reduce((previous, current) => previous + (current.price * current.quantity), 0);
   document.getElementById("totalPrice").textContent = result;
}

// Update the total quantity of items in the cart
function updateTotalQuantity() {
   let result = 0;
   for (let quantityIndex in storedProducts) {
      result += storedProducts[quantityIndex].quantity;
   }
   document.getElementById("totalQuantity").textContent = result;
}

// Add delete event listener on button
function deleteButtonEventListener(index) {
   const button = document.querySelector(".deleteItem"+index);
   button.addEventListener("click", () => {
      storedProducts.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(storedProducts));
      location.reload();
   });
}

// Check the quantity entered in the input and update the quantity in the localStorage
function updateArticleQuantity(index) {
  const item = document.querySelector(".itemQuantity" + index);
   item.addEventListener("change", () => {
      storedProducts[index].quantity = parseInt(document.querySelector(".itemQuantity" + index).value)
      if (storedProducts[index].quantity > 100) {
         storedProducts[index].quantity = 100;
         localStorage.setItem("products", JSON.stringify(storedProducts));
         item.textContent = "100";
      }
      if (storedProducts[index].quantity <= 0) {
         storedProducts[index].quantity = 1;
         localStorage.setItem("products", JSON.stringify(storedProducts));
         item.textContent = "1";
      }
      localStorage.setItem("products", JSON.stringify(storedProducts));
      location.reload();
   });
};

// Setup regex condition
// Add event listener on differents fields to show error message when the regex expression is not satisfied
function setupFieldsConditions() {
   firstName.addEventListener("input", function(e) {
      if(regex.test(firstName.value)) {
         document.getElementById("firstNameErrorMsg").innerText = "";
         return true;
      } else {
         firstNameErrorMsg.textContent = "Ce champs ne peut pas contenir de chiffre";
         e.preventDefault();
      };
   });

   lastName.addEventListener("input", function(e) {
      if (regex.test(lastName.value)) {
         document.getElementById("lastNameErrorMsg").innerText = "";
         return true;
      }  else {
         lastNameErrorMsg.textContent = "Ce champs ne peut pas contenir de chiffre";
         e.preventDefault();
      };
   });

   address.addEventListener("input", function(e) {
      if (!address.value) {
         addressErrorMsg.textContent = "Ce champs ne peut pas etre vide";
         e.preventDefault();
      }  else {
         document.getElementById("addressErrorMsg").innerText = "";
         return true;
      };
   });

   city.addEventListener("input", function(e) {
      if (regex.test(city.value)) {
         document.getElementById("cityErrorMsg").innerText = "";
         return true;
      }  else {
         cityErrorMsg.textContent = "Ce champs ne peut pas contenir de chiffre";
         e.preventDefault();
      };
   });

   email.addEventListener("input", function(e) {
      if (!regexEmail.test(email.value)) {
         emailErrorMsg.textContent = "Veuillez introduire une adresse valide";
         e.preventDefault();
      } else {
         document.getElementById("emailErrorMsg").innerText = "";
         return true;
      };
   });
};

// Setup the event listener of the send button
function setupSendButton() {
   const submit = document.getElementById("order");
   submit.addEventListener("click", (e) => {
     
      let fieldsFull = fieldsAreFull();
      let fieldsValueValid = fieldsValueAreValid();

      if (fieldsFull && fieldsValueValid) {
         sendOrder() 
      } else {
        
      }
      e.preventDefault();
      updateFieldsStatus()
   })
}

// General message error
function msgErrGlobal() {
   return "Vous devez renseigner tous les champs!"
}

// Logic for check all inputs are completed
function updateFieldsStatus() {
   if (!firstName.value) {
      firstNameErrorMsg.textContent = msgErrGlobal();
   }

   if (!lastName.value) {
      lastNameErrorMsg.textContent = msgErrGlobal();
   }

   if (!address.value) {
      addressErrorMsg.textContent = msgErrGlobal();
   }

   if (!city.value) {
      cityErrorMsg.textContent = msgErrGlobal();
   }

   if (!email.value) {
      emailErrorMsg.textContent = msgErrGlobal();
   }
}

//check all inputs are completed
function fieldsAreFull() {
   if (firstName.value && lastName.value && address.value && city.value && email.value) {
      return true
   } else {
      return false
   }
}

//
function fieldsValueAreValid() {

   let firstNameIsValid = !regex.test(lastName.value);
   let lastNameIsValid = !regex.test(firstName.value);
   let cityIsValid = !regex.test(city.value);
   let emailIsValid = regexEmail.test(email.value);

   if (firstNameIsValid && lastNameIsValid && cityIsValid && emailIsValid) {
      return true   
   } else {
      return false
   }
}

function sendOrder() {
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
