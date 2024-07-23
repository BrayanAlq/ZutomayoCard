import requests
from bs4 import BeautifulSoup
import os

# Crear una sesión de requests
session = requests.Session()

# Definir los encabezados HTTP basados en lo que encontraste
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0',
    'Referer': 'https://zutomayo.net/',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Sec-Ch-Ua': '"Opera GX";v="109", "Not:A-Brand";v="8", "Chromium";v="123"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
}

# URL base de la página
URL_BASE = 'https://zutomayo.net/thebattlebegins_cardsearch_2nd/'

# Obtener HTML
response = session.get(URL_BASE, headers=headers)
html_obtenido = response.text

# Parsear HTML
soup = BeautifulSoup(html_obtenido, "html.parser")

# Encontrar todas las etiquetas con atributo src
all_src = soup.find_all(src=True)

# Crear el directorio para guardar las imágenes
os.makedirs('images', exist_ok=True)

# Descargar imágenes
i = 1
for img in all_src:
    img_url = img["src"]
    
    # Verifica si la URL de la imagen es relativa y la convierte a absoluta
    if not img_url.startswith("http"):
        img_url = f"https://etbr-cms-site.s3.ap-northeast-1.amazonaws.com/{img_url}"

    # Descargar la imagen
    print(f"Descargando: {img_url}")
    img_response = session.get(img_url, headers=headers)
    
    # Verifica si la respuesta fue exitosa
    if img_response.status_code == 200:
        img_path = os.path.join('images', f'image_{i}.png')
        with open(img_path, 'wb') as img_file:
            img_file.write(img_response.content)
        i += 1

print("Imágenes descargadas exitosamente")
