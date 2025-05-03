document.getElementById('paypal-button').addEventListener('click', async () => {
  const confirm = window.confirm("¿Confirmas el pago por PayPal?");
  if (!confirm) return;

  // Generar código de licencia
  const code = [...Array(20)].map(() => Math.random().toString(36)[2].toUpperCase()).join('');
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 1);
  const licencia = {
    [code]: {
      expiracion: expiry.toISOString().split('T')[0]
    }
  };

  // Enviar a GitHub
  const response = await fetch('https://api.github.com/repos/ithoswow/threads-license/contents/database.json', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer TU_TOKEN',
      Accept: 'application/vnd.github+json'
    }
  });

  const file = await response.json();
  const currentContent = JSON.parse(atob(file.content));
  const updatedContent = JSON.stringify({ ...currentContent, ...licencia }, null, 2);
  const encoded = btoa(updatedContent);

  const update = await fetch('https://api.github.com/repos/ithoswow/threads-license/contents/database.json', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer TU_TOKEN',
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify({
      message: 'Agregar nueva licencia',
      content: encoded,
      sha: file.sha
    })
  });

  if (update.ok) {
    document.getElementById('status').innerText = `¡Pago exitoso! Tu licencia es: ${code}`;
  } else {
    document.getElementById('status').innerText = 'Error al guardar la licencia.';
  }
});
