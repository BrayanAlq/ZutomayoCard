const TOTAL_CARDS = 104; // Número total de cartas
const PADDING = 4; // Padding antes y después de las cartas
const CARD_PATHS = [
  "images/second/image_", // Primera ruta de las imágenes
  "images/first/image_", // Segunda ruta de las imágenes
];
const FILE_EXTENSION = ".png"; // Extensión de archivo

let currentPathIndex = 0; // Índice de la ruta de imágenes actual

const CARD_CONTAINER = document.querySelector("#cards");
const NAME_WRAPPER = document.querySelector("#name-wrapper");
const BUTTON_PREV = document.querySelector("#prev");
const BUTTON_NEXT = document.querySelector("#next");

const generateNames = (count) => {
  NAME_WRAPPER.innerHTML = ""; // Limpiar nombres previos
  for (let i = 4; i < count + 4; i++) {
    const NAME = document.createElement("div");
    NAME.classList.add("name");
    NAME.textContent = `#${i - 3} Zutomayo Card ${i - 3}`;
    NAME_WRAPPER.appendChild(NAME);
  }
};

const generateCards = (count, cardPath) => {
  CARD_CONTAINER.innerHTML = ""; // Limpiar cartas previas

  // Añadir padding inicial
  for (let i = TOTAL_CARDS - PADDING + 3; i < TOTAL_CARDS + 3; i++) {
    const ITEM = document.createElement("li");
    ITEM.setAttribute("aria-hidden", "true");
    ITEM.innerHTML = `<div class="image-wrapper"><img src="${cardPath}${
      i + 1
    }${FILE_EXTENSION}" alt="Card Image" /></div>`;
    CARD_CONTAINER.appendChild(ITEM);
  }

  // Añadir cartas principales
  for (let i = 4; i < count + 4; i++) {
    const ITEM = document.createElement("li");
    ITEM.innerHTML = `<div class="image-wrapper"><img src="${cardPath}${i}${FILE_EXTENSION}" alt="Card Image" /></div>`;
    CARD_CONTAINER.appendChild(ITEM);
  }

  // Añadir padding final
  for (let i = 0; i < PADDING; i++) {
    const ITEM = document.createElement("li");
    ITEM.setAttribute("aria-hidden", "true");
    ITEM.innerHTML = `<div class="image-wrapper"><img src="${cardPath}${
      i + 4
    }${FILE_EXTENSION}" alt="Card Image" /></div>`;
    CARD_CONTAINER.appendChild(ITEM);
  }

  const ITEMS = Array.from(CARD_CONTAINER.children);

  ITEMS.forEach((ITEM, index) => {
    if (index <= PADDING - 1 || index >= ITEMS.length - PADDING) {
      ITEM.setAttribute("aria-hidden", "true");
    }
  });

  let scrollBounds = { max: 0, min: 0 };

  const UPDATE = () => {
    if (CARD_CONTAINER.scrollLeft < scrollBounds.min) {
      CARD_CONTAINER.scrollLeft = scrollBounds.max;
    } else if (CARD_CONTAINER.scrollLeft > scrollBounds.max) {
      CARD_CONTAINER.scrollLeft = scrollBounds.min;
    }
  };

  const SET_SCROLL_BOUNDS = () => {
    ITEMS[ITEMS.length - 1].scrollIntoView();
    scrollBounds.max = CARD_CONTAINER.scrollLeft + ITEMS[0].offsetWidth;
    ITEMS[0].scrollIntoView();
    scrollBounds.min = CARD_CONTAINER.scrollLeft - ITEMS[0].offsetWidth;
  };

  SET_SCROLL_BOUNDS();

  CARD_CONTAINER.addEventListener("scroll", UPDATE);
};

const switchPath = (direction) => {
  currentPathIndex =
    (currentPathIndex + direction + CARD_PATHS.length) % CARD_PATHS.length;
  generateNames(TOTAL_CARDS);
  generateCards(TOTAL_CARDS, CARD_PATHS[currentPathIndex]);
};

BUTTON_PREV.addEventListener("click", () => switchPath(-1));
BUTTON_NEXT.addEventListener("click", () => switchPath(1));

// Inicializar con la primera ruta de imágenes
generateNames(TOTAL_CARDS);
generateCards(TOTAL_CARDS, CARD_PATHS[currentPathIndex]);
