# jonacruz.github.io
# Sitio de apps · Jonathan Cruz Orozco

Sitio estático en HTML y CSS, bilingüe (español / inglés) y con modo oscuro automático. Está listo para GitHub Pages y no usa frameworks ni dependencias externas.

## Estructura

```
index.html                  Inicio
apps/index.html             Catálogo
apps/edoctronics/           Detalle de Edoctronics
apps/letreo/                Detalle de Letreo
apps/lunapos/               Detalle de LunaPOS (Próximamente)
privacy/index.html          Índice de políticas
privacy/<app>/              Política de privacidad de cada app
support/index.html          Soporte y FAQ (anclas #edoctronics, #letreo, #lunapos)
404.html                    Página de error
assets/css/styles.css       Estilos y tokens de color
assets/js/main.js           Idioma, menú móvil y año
assets/img/                 Favicon e imágenes de las apps
.nojekyll                   Evita que GitHub procese el sitio con Jekyll
```

## URLs para App Store Connect

Reemplaza `miusuario` por tu usuario de GitHub.

| App         | Privacidad                                      | Soporte                                       |
|-------------|-------------------------------------------------|-----------------------------------------------|
| Edoctronics | `https://miusuario.github.io/privacy/edoctronics/` | `https://miusuario.github.io/support/#edoctronics` |
| Letreo      | `https://miusuario.github.io/privacy/letreo/`      | `https://miusuario.github.io/support/#letreo`      |
| LunaPOS     | `https://miusuario.github.io/privacy/lunapos/`     | `https://miusuario.github.io/support/#lunapos`     |

Para forzar un idioma en un enlace agrega `?lang=en` o `?lang=es` (por ejemplo, para la ficha en inglés del App Store). Sin el parámetro, el sitio usa el idioma que eligió el visitante o, la primera vez, el idioma del navegador.

## Reemplazar imágenes

Sustituye los archivos manteniendo el mismo nombre y formato PNG:

| Archivo                                   | Tamaño recomendado |
|-------------------------------------------|--------------------|
| `assets/img/apps/<app>/icon.png`          | 1024 × 1024 px, cuadrado y sin esquinas redondeadas (el CSS las aplica) |
| `assets/img/apps/<app>/screen-1.png` a `screen-3.png` | 1290 × 2796 px (capturas de iPhone 6,7″) |

Para mostrar más capturas, agrega `screen-4.png` y copia una línea `<img>` dentro de `<div class="shots">` en la página de detalle.

## Cómo funciona el idioma

Cada texto está escrito dos veces:

```html
<span data-l="es">Texto en español</span><span data-l="en">English text</span>
```

El CSS oculta el idioma inactivo según el atributo `data-lang` de `<html>`. El título de la pestaña y la meta descripción en inglés están en el atributo `data-en`.

## Cambiar colores

Los colores están en las variables de `:root` al inicio de `assets/css/styles.css`. El bloque `@media (prefers-color-scheme: dark)` define el modo oscuro.

## Publicar en GitHub Pages

1. Crea un repositorio público llamado exactamente `miusuario.github.io`.
2. Sube el contenido de esta carpeta a la raíz de la rama `main`:
   ```bash
   git init
   git add .
   git commit -m "Sitio inicial"
   git branch -M main
   git remote add origin https://github.com/miusuario/miusuario.github.io.git
   git push -u origin main
   ```
3. En el repositorio ve a **Settings › Pages** y en *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Espera uno o dos minutos y abre `https://miusuario.github.io`.
5. Busca `miusuario` en todos los archivos y reemplázalo por tu usuario (aparece en las etiquetas `canonical` y `og:url`).

## Vista previa local

Los enlaces apuntan a carpetas (`apps/`, `support/`), así que usa un servidor local en lugar de abrir los archivos directamente:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Agregar una app nueva

1. Copia `apps/letreo/` como `apps/nueva-app/` y edita textos, enlace al App Store y rutas de imágenes.
2. Copia `privacy/letreo/` como `privacy/nueva-app/` y ajusta la política.
3. Crea `assets/img/apps/nueva-app/` con `icon.png` y las capturas.
4. Agrega la tarjeta `<a class="app-card">` en `index.html` y `apps/index.html`, la tarjeta en `privacy/index.html`, el grupo de preguntas en `support/index.html` y el enlace en el pie de página de todas las páginas.

## Antes de publicar: revisa las políticas de privacidad

Las políticas se redactaron con lo que se sabe de cada app:

- **Edoctronics**: Google AdMob, ATT y formulario de consentimiento RGPD.
- **Letreo**: Firebase (análisis y diagnóstico), AdMob y compras con StoreKit.
- **LunaPOS**: datos del negocio, cámara con VisionKit y Firebase. Marcada como borrador hasta el lanzamiento.

Comprueba que coincidan con las etiquetas de privacidad que declaraste en App Store Connect (sección *App Privacy*). Si alguna app usa otro SDK o recopila otro dato, agrégalo en la sección "Información que se recopila" y en "Servicios de terceros". Este texto no sustituye asesoría legal.

