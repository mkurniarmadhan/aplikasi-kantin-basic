export let cart = JSON.parse(localStorage.getItem("carts")) || [];
import { orders } from "./orders.js";
export const badgeCart = (countCart) => {
  const elements = document.getElementsByClassName("countCart");
  Array.from(elements).forEach(element => {
    element.innerHTML = countCart ?? 0;
  });
};

badgeCart(cart.length);

export const tambahKeranjang = (barang) => {
  const cekBarang = cart.find(i => i.id === barang.id);
  
  if (cekBarang) {
    cekBarang.qty += 1;
  } else {
    cart.push({ ...barang, qty: 1 });
  }
  
  localStorage.setItem("carts", JSON.stringify(cart));
  badgeCart(cart.length);
};

const hapusItem = (id) => {
  cart = cart.filter(item => item.id !== parseInt(id));
  localStorage.setItem("carts", JSON.stringify(cart));
  badgeCart(cart.length);
  ambilDataKeranjang();
};

const ambilDataKeranjang = () => {
  try {
    let cartItem = "";
    let total = 0;

    cart.forEach(item => {
      const subtotal = item.qty * item.price;
      total += subtotal;
      cartItem += `
        <li class="list-group-item d-flex justify-content-between">
          <div>
            <h6>${item.name}</h6>
            <small>${item.price} x ${item.qty} = Rp ${subtotal}</small>
            <button class="btn btn-danger removeFromCart" data-id="${item.id}">Hapus</button>
          </div>
        </li>
      `;
    });

    cartItem += `<li class="list-group-item d-flex justify-content-between"><strong>Total</strong> Rp. ${total}</li>`;
    cartItems.innerHTML = cartItem;

    cartItems.addEventListener("click", (event) => {
      if (event.target.classList.contains("removeFromCart")) {
        const id = event.target.getAttribute("data-id");
        hapusItem(id);
      }
    });
  } catch (error) {
    console.error("Error ambilDataKeranjang:", error);
  }
};

try {
  document.getElementById("buatPesanan").addEventListener("submit", function (e) {
    e.preventDefault();
    let selectedPaymentMethod = null;

    document.getElementsByName("metode_pembayaran").forEach(paymentMethod => {
      if (paymentMethod.checked) {
        selectedPaymentMethod = paymentMethod.value;
      }
    });

    const data = {
      nomor_identitas: document.getElementById("nomor_identitas").value,
      nama_pemesan: document.getElementById("nama_pemesan").value,
      phone_pemesan: document.getElementById("phone_pemesan").value,
      metode_pembayaran: selectedPaymentMethod,
    };

    orders.push({ ...data, id: orders.length + 1 });
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("carts");

    window.location.href = "/public/order-history.html";
  });
} catch (error) {
  console.error("Error in form submission:", error);
}

ambilDataKeranjang();
badgeCart(cart.length);