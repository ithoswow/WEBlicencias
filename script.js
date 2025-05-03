document.getElementById("paypal-button").onclick = () => {
  fetch("https://TU_BACKEND_URL/pay/paypal", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = "Licencia generada: " + data.licencia;
    })
    .catch(err => alert("Error al generar licencia"));
};

document.getElementById("pse-button").onclick = () => {
  fetch("https://TU_BACKEND_URL/pay/pse", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = "Licencia generada: " + data.licencia;
    })
    .catch(err => alert("Error al generar licencia"));
};
