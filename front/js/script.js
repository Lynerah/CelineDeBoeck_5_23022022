fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(products) {
   createCardItem(products)

  })




  .catch(function(err) {
    // Une erreur est survenue
  });

  function createCardItem(value) {
   for (let i = 0; i < value.length; i++) { // index 0, Condition, incrémentation de l'index

       // Création a

       let a = document.createElement("a");
       a.classList.add("a");

       items.appendChild(a).href =`html/product.html?id=${value[i]._id}`;

       // Création article

       let article = document.createElement("article");
       article.classList.add("article");

       a.appendChild(article);

}}