let params = new URL(window.location).searchParams.get("id");
console.log("params");
console.log(params);

// const item__img = document.getElementsByClassName("item__img");

getItem();

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
   const item__img = document.querySelector(".item__img")
   let imgItem = document.createElement("img");

   item__img.appendChild(imgItem).src =`${value.imageUrl}`;
   item__img.appendChild(imgItem).alt =`${value.altTxt}`;

   document.getElementById("price").innerHTML = `${value.price}`;
   document.getElementById("description").innerHTML = `${value.description}`;
   document.getElementById("title").innerHTML = `${value.name}`;

   updateSelectorChoice(value.colors)
}

function updateSelectorChoice(colors) {
   var select = document.getElementById("colors");

   for(var i = 0; i < colors.length; i++) {
      var color = colors[i];
      var option = document.createElement("option");
      option.textContent = color;
      option.value = color;
      select.appendChild(option);
   }
}

