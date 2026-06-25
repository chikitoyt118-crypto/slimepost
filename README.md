# Slime Post

Pagina estatica con tematica gamer para publicar archivos descargables en GitHub Pages.

## Publicarla en GitHub Pages

1. Crea un repositorio en GitHub llamado `slime-post`.
2. Sube todos los archivos de esta carpeta al repositorio.
3. En GitHub, entra en `Settings` > `Pages`.
4. En `Build and deployment`, elige `Deploy from a branch`.
5. Selecciona la rama `main` y la carpeta `/root`.
6. Guarda los cambios. Tu web quedara en `https://TU-USUARIO.github.io/slime-post/`.

## Agregar una descarga

1. Mete tu archivo real dentro de la carpeta `downloads`.
2. Abre `script.js`.
3. Copia una entrada de la lista `downloads` y cambia:

```js
{
  title: "Nombre del drop",
  type: "mods",
  version: "v1.0",
  size: "20 MB",
  date: "25 JUN 2026",
  file: "downloads/tu-archivo.zip",
  description: "Descripcion corta de lo que van a descargar.",
  tags: ["PC", "Pack", "Nuevo"],
}
```

Tipos disponibles para el filtro: `mods`, `maps`, `skins`, `tools`.

## Cambiar enlaces sociales

En `index.html`, busca la seccion `contacto` y cambia los enlaces de GitHub, Discord y YouTube por los tuyos.
