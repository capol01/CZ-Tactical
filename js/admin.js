import { supabase } from "./supabase.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    document.getElementById("status").innerText = "❌ " + error.message;
    return;
  }

  document.getElementById("status").innerText = "✅ Přihlášeno";
  document.getElementById("admin-panel").classList.remove("hidden");
};
