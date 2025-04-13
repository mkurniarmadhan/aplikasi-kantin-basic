
export let orders = JSON.parse(localStorage.getItem("orders")) || [];


// Function to view order details (placeholder)
const viewOrderDetails = (orderId) => {
  const containerDetail = document.getElementById("container-detail");
  const detailPesanan = document.getElementById("detailPesanan");

  detailPesanan.innerHTML ="";
  containerDetail.classList.remove("d-none");

  const order = orders.find((item) => item.id === parseInt(orderId));
  const {id, nomor_identitas, nama_pemesan, phone_pemesan, metode_pembayaran } =
    order;
  console.log(`View details for order ID: ${orderId}`);

  detailPesanan.innerHTML+=`
    <strong>ID Pesanan:</strong> ${id}<br>
    <strong>Nama:</strong> ${nama_pemesan}<br>
    <strong>WA:</strong> ${phone_pemesan}<br>
    <strong>Status:</strong> ${status ? "Selesai" : "Belum selesai"} <br>
    <strong>Metode Pembayaran:</strong> ${metode_pembayaran}`;
};

// Function to display order history
const tampilkanRiwayatPesanan = () => {
  const riwayatPesanan = document.getElementById("riwayatPesanan");

  // Clear existing rows
  riwayatPesanan.innerHTML = "";

  // Populate the table with order data
  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.nama_pemesan}</td>
      <td>Rp ${order.total_bayar}</td>
      <td>${order.metode_pembayaran}</td>
      <td>${order.status_pesanan || "Pending"}</td>
      <td>
        <button class="btn btn-info detailOrder" data-id="${
          order.id
        }">Detail</button>
        <button class="btn btn-danger removeFromOrder" data-id="${
          order.id
        }">Batal</button>
      </td>
    `;
    riwayatPesanan.appendChild(row);
  });

  // Add event listener for button clicks
  riwayatPesanan.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id");
    if (event.target.classList.contains("removeFromOrder")) {
      cancelOrder(id);
      //   alert(`Order ID ${id} has been canceled.`);
    } else if (event.target.classList.contains("detailOrder")) {
      viewOrderDetails(id);
    }
  });
};

// Function to cancel an order
const cancelOrder = (orderId) => {
  orders = orders.filter((item) => item.id !== parseInt(orderId));
  localStorage.setItem("orders", JSON.stringify(orders));
  tampilkanRiwayatPesanan();
};

// Initialize the display of order history when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", tampilkanRiwayatPesanan);
