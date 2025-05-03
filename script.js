document.getElementById("paypal-button").onclick = () => {
  fetch("https://helpful-purpose-production-7db9.up.railway.app/pay/paypal", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = "Licencia generada: " + data.licencia;
    })
    .catch(err => alert("Error al generar licencia"));
};

document.getElementById("pse-button").onclick = () => {
  fetch("https://helpful-purpose-production-7db9.up.railway.app/pay/pse", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = "Licencia generada: " + data.licencia;
    })
    .catch(err => alert("Error al generar licencia"));
};
