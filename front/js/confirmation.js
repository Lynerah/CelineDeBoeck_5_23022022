
const orderId = document.getElementById("orderId");
const stored = JSON.parse(localStorage.getItem("orderId"));
console.log(stored)
orderId.textContent = stored ;
