import { supabase } from "./supabase.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !data) {
    document.getElementById("product-detail").innerHTML =
      "<h2>❌ Produkt nebyl nalezen</h2>";
    return;
  }

  const images = [
    data.image_url,
    data.image2_url,
    data.image3_url
  ].filter(Boolean);

  document.getElementById("product-detail").innerHTML = `
  
    <div class="product">

      <h2>${data.name}</h2>

      <div class="gallery">
        <button id="prev-image">◀</button>

        <img
          id="main-image"
          src="${images[0]}"
          class="gallery-image"
        >

        <button id="next-image">▶</button>
      </div>

      <h3>💰 ${data.price} Kč</h3>

      <p>📦 Skladem: ${data.stock} ks</p>

      <p>🏷 Kategorie: ${data.category}</p>

      <hr style="margin:20px 0;">

      <h3>Popis produktu</h3>

      <p>${data.description || "Bez popisu."}</p>

      <br>

      <button id="add-cart">
        🛒 Přidat do košíku
      </button>

    </div>
  `;

  let currentImage = 0;

  document.getElementById("prev-image").onclick = () => {
    currentImage--;

    if (currentImage < 0) {
      currentImage = images.length - 1;
    }

    document.getElementById("main-image").src =
      images[currentImage];
  };

  document.getElementById("next-image").onclick = () => {
    currentImage++;

    if (currentImage >= images.length) {
      currentImage = 0;
    }

    document.getElementById("main-image").src =
      images[currentImage];
  };
}

loadProduct();
