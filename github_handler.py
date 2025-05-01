import requests
import base64
import json

# 🔐 CONFIGURA TU TOKEN Y REPO AQUÍ
GITHUB_TOKEN = "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"
REPO_OWNER = "ithos"
REPO_NAME = "threads-license"
FILE_PATH = "database.json"

def actualizar_json(nuevo_codigo, fecha_vencimiento):
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{FILE_PATH}"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    res = requests.get(url, headers=headers)
    data = res.json()
    sha = data["sha"]
    contenido = base64.b64decode(data["content"]).decode("utf-8")
    json_data = json.loads(contenido)

    json_data[nuevo_codigo] = {"expires": fecha_vencimiento}
    nuevo_contenido = json.dumps(json_data, indent=2)

    update_data = {
        "message": f"Agregar licencia {nuevo_codigo}",
        "content": base64.b64encode(nuevo_contenido.encode("utf-8")).decode("utf-8"),
        "sha": sha
    }

    requests.put(url, headers=headers, json=update_data)