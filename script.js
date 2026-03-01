let cart = JSON.parse(localStorage.getItem("cart")) || [];

function tambahCart(nama, harga){

let item = cart.find(i => i.nama === nama);

if(item){
    item.qty++;
}else{
    cart.push({nama, harga, qty:1});
}

simpanCart();
tampilCart();
}

function simpanCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function tampilCart(){

let div = document.getElementById("cart");
if(!div) return;

div.innerHTML="";
let total=0;

cart.forEach((item,index)=>{

total += item.harga * item.qty;

div.innerHTML += `
<p>
${item.nama} (${item.qty})
<button onclick="kurang(${index})">-</button>
<button onclick="tambah(${index})">+</button>
</p>
`;
});

document.getElementById("total").innerText = total;
}

function tambah(i){
cart[i].qty++;
simpanCart();
tampilCart();
}

function kurang(i){
cart[i].qty--;
if(cart[i].qty<=0) cart.splice(i,1);
simpanCart();
tampilCart();
}

function checkout(){

let orders = JSON.parse(localStorage.getItem("orders")) || [];

orders.push({
items: cart,
tanggal: new Date().toLocaleString()
});

localStorage.setItem("orders", JSON.stringify(orders));

localStorage.setItem("struk", JSON.stringify(cart));

cart=[];
simpanCart();

window.location="struk.html";
}

tampilCart();