paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '5.00'
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      document.getElementById('status').textContent = "✅ Pago confirmado. Generando licencia...";
      fetch("/generar_licencia", {
        method: "POST"
      })
      .then(res => res.json())
      .then(data => {
        if (data.codigo) {
          document.getElementById('status').innerHTML += "<br>Tu licencia es:<br><strong>" + data.codigo + "</strong>";
        } else {
          document.getElementById('status').textContent = "Error al generar licencia.";
        }
      });
    });
  }
}).render('#paypal-button-container');