const orderId = document.getElementById("orderId");
const stored = new URL(window.location).searchParams.get("id");;
console.log(stored);
orderId.textContent = stored ;
