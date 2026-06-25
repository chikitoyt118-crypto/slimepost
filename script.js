const downloads = [
  {
    title: "Slime Starter Pack",
    type: "mods",
    version: "v1.0",
    size: "12 MB",
    date: "25 JUN 2026",
    file: "downloads/slime-starter-pack.txt",
    description: "Pack inicial para abrir el servidor con energia slime: ajustes, recursos base y extras visuales.",
    tags: ["PC", "Survival", "Pack"],
  },
  {
    title: "Arena Neon Map",
    type: "maps",
    version: "v0.9",
    size: "8 MB",
    date: "25 JUN 2026",
    file: "downloads/arena-neon-map.txt",
    description: "Mapa estilo arcade con zonas de combate, rutas rapidas y puntos de loot marcados.",
    tags: ["PvP", "Mapa", "Neon"],
  },
  {
    title: "Slime Skin Bundle",
    type: "skins",
    version: "v1.2",
    size: "5 MB",
    date: "25 JUN 2026",
    file: "downloads/slime-skin-bundle.txt",
    description: "Coleccion de skins verdes, cyan y magenta para que el clan entre con identidad propia.",
    tags: ["Skins", "Clan", "Cosmetico"],
  },
  {
    title: "Post Tool Kit",
    type: "tools",
    version: "v1.0",
    size: "3 MB",
    date: "25 JUN 2026",
    file: "downloads/post-tool-kit.txt",
    description: "Plantillas y archivos de apoyo para preparar proximos drops antes de subirlos a GitHub.",
    tags: ["Tools", "Plantilla", "GitHub"],
  },
];

const posts = [
  {
    title: "Abre Slime Post",
    date: "25 JUN 2026",
    text: "El tablero ya esta listo para publicar drops con enlaces directos y filtros por categoria.",
  },
  {
    title: "Primer pack disponible",
    date: "25 JUN 2026",
    text: "Slime Starter Pack queda como ejemplo para cambiarlo por tu primer archivo real.",
  },
  {
    title: "Zona de comunidad",
    date: "25 JUN 2026",
    text: "Los botones de GitHub, Discord y YouTube se pueden apuntar a tus perfiles oficiales.",
  },
];

const typeLabels = {
  mods: "Mod",
  maps: "Mapa",
  skins: "Skin",
  tools: "Tool",
};

const typeIcons = {
  mods: '<path d="M7 8h10M7 12h10M9 16h6"></path><path d="M5 4h14v16H5z"></path>',
  maps: '<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"></path><path d="M9 3v15M15 6v15"></path>',
  skins: '<path d="M9 4h6l2 4-2 2v10H9V10L7 8l2-4Z"></path><path d="M10 8h4"></path>',
  tools: '<path d="m14 7 3 3-7 7H7v-3l7-7Z"></path><path d="m16 5 3 3"></path>',
};

let currentFilter = "all";
let currentSearch = "";

const downloadGrid = document.querySelector("#downloadGrid");
const postFeed = document.querySelector("#postFeed");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const totalDownloads = document.querySelector("#totalDownloads");
const latestVersion = document.querySelector("#latestVersion");

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchesSearch(item) {
  const needle = normalize(currentSearch.trim());
  if (!needle) return true;

  const haystack = normalize(
    [item.title, item.type, item.version, item.description, item.tags.join(" ")].join(" ")
  );
  return haystack.includes(needle);
}

function getVisibleDownloads() {
  return downloads.filter((item) => {
    const matchesFilter = currentFilter === "all" || item.type === currentFilter;
    return matchesFilter && matchesSearch(item);
  });
}

function createDownloadCard(item) {
  const card = document.createElement("article");
  card.className = "download-card";

  const tags = item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  const icon = typeIcons[item.type] || typeIcons.tools;

  card.innerHTML = `
    <div class="card-top">
      <span class="file-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">${icon}</svg>
      </span>
      <div class="card-title">
        <h3>${item.title}</h3>
        <div class="meta">
          <span>${typeLabels[item.type] || "Drop"}</span>
          <span>${item.version}</span>
          <span>${item.size}</span>
        </div>
      </div>
    </div>
    <p class="description">${item.description}</p>
    <div class="tag-row">${tags}</div>
    <a class="button button-primary download-link" href="${item.file}" download>
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 21h14"></path>
      </svg>
      Descargar
    </a>
  `;

  return card;
}

function renderDownloads() {
  const visibleDownloads = getVisibleDownloads();
  downloadGrid.replaceChildren(...visibleDownloads.map(createDownloadCard));
  emptyState.hidden = visibleDownloads.length > 0;
}

function renderPosts() {
  const cards = posts.map((post) => {
    const card = document.createElement("article");
    card.className = "post-card";
    card.innerHTML = `
      <span class="post-date">${post.date}</span>
      <h3>${post.title}</h3>
      <p>${post.text}</p>
    `;
    return card;
  });

  postFeed.replaceChildren(...cards);
}

function updateStats() {
  totalDownloads.textContent = downloads.length;
  latestVersion.textContent = downloads[0]?.version ?? "1.0";
}

searchInput.addEventListener("input", (event) => {
  currentSearch = event.target.value;
  renderDownloads();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderDownloads();
  });
});

renderDownloads();
renderPosts();
updateStats();
