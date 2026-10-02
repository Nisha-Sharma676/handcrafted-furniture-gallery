const furnitureData = [
    { name: "Oak Dining Table", material: "Oak Wood", category: "Dining" },
    { name: "Classic Wooden Chair", material: "Teak Wood", category: "Seating" },
    { name: "Handcrafted Coffee Table", material: "Walnut Wood", category: "Living" },
    { name: "Wooden Bookshelf", material: "Oak Wood", category: "Storage" },
    { name: "Minimal Side Table", material: "Sheesham Wood", category: "Living" },
    { name: "Handmade Armchair", material: "Teak Wood", category: "Seating" }
];

const furnitureList = document.getElementById("furniture-list");
const searchInput = document.getElementById("search");
const loading = document.getElementById("loading");
const emptyState = document.getElementById("empty-state");
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function sanitizeText(value) {
    return value.replace(/[<>&"'`]/g, "");
}

function displayFurniture(items) {
    furnitureList.innerHTML = "";
    emptyState.hidden = items.length !== 0;

    items.forEach(item => {
        const card = document.createElement("article");
        card.className = "furniture-card";

        const visual = document.createElement("div");
        visual.className = "furniture-visual";
        visual.setAttribute("aria-hidden", "true");

        const title = document.createElement("h3");
        title.textContent = sanitizeText(item.name);

        const material = document.createElement("p");
        material.textContent = `Material: ${sanitizeText(item.material)}`;

        const category = document.createElement("p");
        category.textContent = `Category: ${sanitizeText(item.category)}`;

        card.append(visual, title, material, category);
        furnitureList.appendChild(card);
    });
}

function loadFurniture() {
    loading.hidden = false;

    setTimeout(() => {
        loading.hidden = true;
        displayFurniture(furnitureData);
    }, 1000);
}

searchInput.addEventListener("input", () => {
    const query = sanitizeText(searchInput.value.trim()).toLowerCase();

    const filteredFurniture = furnitureData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.material.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    displayFurniture(filteredFurniture);
});

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = {
        name: sanitizeText(nameInput.value.trim()),
        email: emailInput.value.trim()
    };

    nameInput.classList.remove("error");
    emailInput.classList.remove("error");

    let valid = true;

    if (!formData.name) {
        nameInput.classList.add("error");
        nameInput.setAttribute("aria-invalid", "true");
        valid = false;
    } else {
        nameInput.setAttribute("aria-invalid", "false");
    }

    if (!formData.email || !emailInput.validity.valid) {
        emailInput.classList.add("error");
        emailInput.setAttribute("aria-invalid", "true");
        valid = false;
    } else {
        emailInput.setAttribute("aria-invalid", "false");
    }

    if (!valid) return;

    console.log("[Analytics] User interacted with Handcrafted Furniture Workshop Gallery");
    alert("Thank you! Your message has been submitted.");
    contactForm.reset();
});

loadFurniture();