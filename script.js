/* =========================
   ELEMENTS
========================= */

const nav =
    document.getElementById("nav");

const modal =
    document.getElementById("modal");

const modalImage =
    document.getElementById("modalImage");

const modalName =
    document.getElementById("modalName");

const modalPrice =
    document.getElementById("modalPrice");

const messageButton =
    document.getElementById("messageButton");


/* =========================
   VARIABLES
========================= */

const instagramUrl =
    "https://www.instagram.com/threadedby.ella/";

const instagramDmUrl =
    "https://ig.me/m/threadedby.ella";

const productVarieties = {
    "Cloud Tote": [
        "Cream",
        "Oat",
        "Blush",
        "Sage"
    ],
    "Daisy Pouch": [
        "Ivory Daisy",
        "Pink Daisy",
        "Blue Daisy",
        "Yellow Daisy"
    ],
    "Cozy Beanie": [
        "Mocha",
        "Cream",
        "Dusty Rose",
        "Charcoal"
    ],
    "Mini Flower Bag": [
        "White Flower",
        "Brown Flower",
        "Pink Flower",
        "Mixed Flower"
    ],
    "Soft Scrunchie Set": [
        "Neutral Set",
        "Pastel Set",
        "Earth Set",
        "Custom Set"
    ],
    "Little Bear Charm": [
        "Brown Bear",
        "Cream Bear",
        "Pink Bear",
        "Custom Bear"
    ],
    "Tiny Bunny Plush": [
        "Cream Bunny",
        "Blush Bunny",
        "Oat Bunny",
        "Custom Bunny"
    ]
};

const productCategories = [
    {
        id: "keychains",
        label: "Keychains",
        products: [
            "Little Bear Charm"
        ]
    },
    {
        id: "plushies",
        label: "Plushies",
        products: [
            "Tiny Bunny Plush"
        ]
    },
    {
        id: "bags",
        label: "Bags",
        products: [
            "Cloud Tote",
            "Mini Flower Bag"
        ]
    },
    {
        id: "pouches",
        label: "Pouches",
        products: [
            "Daisy Pouch"
        ]
    },
    {
        id: "headwears",
        label: "Headwears",
        products: [
            "Cozy Beanie",
            "Soft Scrunchie Set"
        ]
    }
];

const placeholderProducts = {
    "Tiny Bunny Plush": {
        price: "699",
        meta: "Soft crochet • Placeholder",
        badge: "Placeholder"
    }
};

let activeProduct = null;

let activeVarieties = [];

let activeSlide = 0;


/* =========================
   NAVIGATION SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        nav.classList.add("scrolled");

    } else {

        nav.classList.remove("scrolled");

    }

});


/* =========================
   PRODUCT SCROLL ANIMATION
========================= */

setupProductSections();

setupCategoryFilters();


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.14
        }

    );


const revealElements =
    document.querySelectorAll(".reveal");


revealElements.forEach((element) => {

    observer.observe(element);

});


setupProductCardCarousels();


function setupProductSections() {

    const shop =
        document.getElementById("shop");

    const originalGrid =
        shop.querySelector(".products");

    if (!originalGrid || originalGrid.classList.contains("sectioned")) {

        return;

    }

    const existingProducts =
        [...originalGrid.querySelectorAll(".product")];

    const productByName =
        new Map();

    existingProducts.forEach((product) => {

        productByName.set(product.dataset.name, product);

    });

    const filteredGrid =
        document.createElement("div");

    const categoryTitle =
        document.createElement("div");

    categoryTitle.className =
        "category-head";

    categoryTitle.innerHTML =
        `
            <span>Showing</span>
            <h3>All</h3>
        `;

    filteredGrid.className =
        "products sectioned";

    productCategories.forEach((category) => {

        category.products.forEach((productName) => {

            const product =
                productByName.get(productName) ||
                createPlaceholderProduct(productName);

            product.dataset.category =
                category.id;

            filteredGrid.appendChild(product);

        });

    });

    originalGrid.replaceWith(categoryTitle, filteredGrid);

}


function createPlaceholderProduct(name) {

    const details =
        placeholderProducts[name];

    const product =
        document.createElement("article");

    product.className =
        "product reveal";

    product.dataset.name =
        name;

    product.dataset.price =
        details.price;

    product.innerHTML =
        `
            <div
                class="product-image"
                onclick="openProduct(this)"
            >
                <span class="product-badge">${details.badge}</span>
            </div>

            <div class="product-info">
                <div>
                    <div class="product-name">${name}</div>
                    <div class="product-meta">${details.meta}</div>
                </div>
                <div class="price">₱${details.price}</div>
            </div>
        `;

    return product;

}


function setupCategoryFilters() {

    const buttons =
        document.querySelectorAll(".category-nav button");

    const products =
        document.querySelectorAll(".products.sectioned .product");

    const categoryTitle =
        document.querySelector(".category-head h3");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedCategory =
                button.dataset.category;

            const selectedLabel =
                button.textContent.trim();

            buttons.forEach((item) => {

                item.classList.toggle(
                    "active",
                    item === button
                );

            });

            products.forEach((product) => {

                const shouldShow =
                    selectedCategory === "all" ||
                    product.dataset.category === selectedCategory;

                product.classList.toggle(
                    "hidden",
                    !shouldShow
                );

            });

            if (categoryTitle) {

                categoryTitle.textContent =
                    selectedLabel;

            }

        });

    });

}


function setupProductCardCarousels() {

    const products =
        document.querySelectorAll(".product");

    products.forEach((product) => {

        const image =
            product.querySelector(".product-image");

        const badge =
            image.querySelector(".product-badge");

        const name =
            product.dataset.name;

        const varieties =
            productVarieties[name] || [
                "Option 1",
                "Option 2",
                "Option 3"
            ];

        let slide =
            0;

        const renderCard =
            () => {

                image.innerHTML =
                    `
                        ${badge ? badge.outerHTML : ""}
                        <div class="product-card-slide">
                            <div class="product-card-name">${name}</div>
                            <div class="product-card-photo">
                                <span>${varieties[slide]}</span>
                            </div>
                            <div class="product-card-dots">
                                ${varieties
                                    .map((_, index) => (
                                        `<span class="${index === slide ? "active" : ""}"></span>`
                                    ))
                                    .join("")}
                            </div>
                        </div>
                    `;

            };

        renderCard();

    });

}


/* =========================
   PRODUCT MODAL
========================= */

function openProduct(image) {

    const product =
        image.closest(".product");

    activeProduct =
        product;

    activeSlide =
        0;

    const name =
        product.dataset.name;

    const price =
        product.dataset.price;

    activeVarieties =
        productVarieties[name] || [
            "Option 1",
            "Option 2",
            "Option 3"
        ];

    modalName.textContent =
        name;

    modalPrice.textContent =
        `₱${price}`;

    renderCarousel();

    modal.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


function renderCarousel() {

    if (!activeProduct) {

        return;

    }

    const productName =
        activeProduct.dataset.name;

    const currentVariety =
        activeVarieties[activeSlide];

    modalImage.innerHTML =
        `
            <div class="carousel-slide">
                <div class="carousel-heading">
                    <span>${productName}</span>
                    <strong>${currentVariety}</strong>
                </div>

                <div class="placeholder-photo">
                    <span>Photo placeholder</span>
                </div>

                <button
                    type="button"
                    class="carousel-arrow carousel-prev"
                    aria-label="Previous variety"
                    onclick="previousSlide()"
                >
                    ‹
                </button>

                <button
                    type="button"
                    class="carousel-arrow carousel-next"
                    aria-label="Next variety"
                    onclick="nextSlide()"
                >
                    ›
                </button>

                <div class="carousel-dots">
                    ${activeVarieties
                        .map((_, index) => (
                            `<button
                                type="button"
                                class="${index === activeSlide ? "active" : ""}"
                                aria-label="Show variety ${index + 1}"
                                onclick="showSlide(${index})"
                            ></button>`
                        ))
                        .join("")}
                </div>
            </div>
        `;

    const message =
        `Hi! I want to order ${productName} - ${currentVariety}.`;

    messageButton.href =
        `${instagramDmUrl}?text=${encodeURIComponent(message)}`;

}


function showSlide(index) {

    activeSlide =
        index;

    renderCarousel();

}


function previousSlide() {

    if (activeVarieties.length === 0) {

        return;

    }

    activeSlide =
        (activeSlide - 1 + activeVarieties.length) % activeVarieties.length;

    renderCarousel();

}


function nextSlide() {

    if (activeVarieties.length === 0) {

        return;

    }

    activeSlide =
        (activeSlide + 1) % activeVarieties.length;

    renderCarousel();

}


function closeProduct(event) {

    if (event.target === modal) {

        closeModal();

    }

}


function closeModal() {

    modal.classList.remove("open");

    document.body.style.overflow = "";

}


/* =========================
   CONTACT BUTTONS
========================= */

function openInstagram() {

    window.open(
        instagramUrl,
        "_blank",
        "noopener"
    );

}


function showMessage() {

    window.open(
        instagramDmUrl,
        "_blank",
        "noopener"
    );

}


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);
