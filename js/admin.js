import { supabase } from "./supabase.js";

// kontrola při načtení stránky
window.addEventListener("load", async () => {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    showAdmin();
  }
});

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    document.getElementById("status").innerText = "❌ " + error.message;
    return;
  }

  showAdmin();
};

function showAdmin() {
  document.getElementById("status").innerText = "✅ Přihlášeno";
  document.getElementById("login-box").classList.add("hidden");
  document.getElementById("admin-panel").classList.remove("hidden");

  loadProducts();
}

window.addProduct = async function () {

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  const description = document.getElementById("description").value;

  const image = document.getElementById("image").value;
  const image2 = document.getElementById("image2").value;
  const image3 = document.getElementById("image3").value;

  const { error } = await supabase.from("products").insert([
    {
      name,
      price,
      stock,
      description,
      category,
      image_url: image,
      image2_url: image2,
      image3_url: image3,
      visible: true,
    },
  ]);

  if (error) {
    alert("❌ chyba: " + error.message);
  } else {
    alert("✅ produkt přidán!");
    loadProducts();
  }
};
async function loadProducts() {
  const container = document.getElementById("admin-products");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    container.innerHTML = "Chyba načítání produktů";
    return;
  }

  container.innerHTML = "";

  data.forEach(product => {
    container.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>

        <p>💰 ${product.price} Kč</p>
        <p>📦 ${product.stock} ks</p>
        <p>🏷 ${product.category}</p>
        <p>${product.visible ? "🟢 Viditelný" : "🔴 Skrytý"}</p>

        <button onclick="toggleProduct(${product.id}, ${product.visible})">
          ${product.visible ? "👁️ Skrýt" : "👁️ Zobrazit"}
        </button>

        <button onclick="editProduct(${product.id}, '${product.name}', ${product.price}, ${product.stock})">
          ✏️ Upravit
        </button>

        <button onclick="deleteProduct(${product.id})">
          🗑️ Smazat
        </button>
      </div>
    `;
  });
}

window.deleteProduct = async function(id) {
  if (!confirm("Opravdu smazat produkt?")) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadProducts();
};

window.toggleProduct = async function(id, visible) {
  const { error } = await supabase
    .from("products")
    .update({
      visible: !visible
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadProducts();
};

window.editProduct = async function(id, oldName, oldPrice, oldStock) {

  const name = prompt("Název produktu:", oldName);
  if (name === null) return;

  const price = prompt("Cena:", oldPrice);
  if (price === null) return;

  const stock = prompt("Sklad:", oldStock);
  if (stock === null) return;

  const { error } = await supabase
    .from("products")
    .update({
      name,
      price,
      stock
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadProducts();
};
