
// show the order id from backend
const orderId = document.getElementById("orderId");
const stored = new URL(window.location).searchParams.get("id");;
orderId.textContent = stored ;
