import { tambahKeranjang } from "./cart.js";

export const ambilDataBarang = async () => {
  try {
    const response = await fetch("/data/data-barang.json");

    if (!response.ok) return;

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`gagal ambil data barang`, error);
  }
};



export const tampilkanBarang = (barangs) => {
  const container = document.getElementById("listBarang");
  let card = "";
  barangs.forEach((barang, index) => {
    card += `
      <div class="col">
        <div class="card shadow-sm">
          <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
            <rect width="100%" height="100%" fill="#55595c" />
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">${barang.name}</text>
          </svg>
          <div class="card-body">
            <p class="card-text">Rp. ${barang.price}</p>
            <div class="d-flex justify-content-between align-items-center">
              <button type="button" class="btn btn-sm btn-outline-secondary tambahKeranjang" data-index="${index}">Tambah Keranjang</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = card;

  container.addEventListener("click", (event) => {
    if (event.target.classList.contains("tambahKeranjang")) {
      const index = event.target.getAttribute("data-index");
      const selectedBarang = barangs[index];
      tambahKeranjang(selectedBarang);
    }
  });
};

ambilDataBarang().then((barangs) => {
  if (barangs) {
    tampilkanBarang(barangs); 
  }
});

