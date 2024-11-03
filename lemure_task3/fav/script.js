const categories = [
    {
        category: "Healthy Recipes",
        items: [
            { title: "Fruit Smoothie", image: "images/recipe1.jpg", price: 5 },
            { title: "Veggie Wrap", image: "images/recipe2.jpg", price: 6 },
            { title: "Oatmeal Pancakes", image: "images/recipe3.jpg", price: 4 }
        ],
    },
    {
        category: "Children's Clothing",
        items: [
            { title: "Summer Dress", image: "images/clothing1.jpg", price: 15 },
            { title: "Winter Jacket", image: "images/clothing2.jpg", price: 25 }
        ],
    },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.title === item.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <span>${item.title} - $${item.price}</span>
            <button onclick="removeFromCart('${item.title}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    document.getElementById("cart-count").textContent = cart.reduce((count, item) => count + item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleFavorite(item) {
    const isFavorite = favorites.some(fav => fav.title === item.title);
    if (isFavorite) {
        favorites = favorites.filter(fav => fav.title !== item.title);
    } else {
        favorites.push(item);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteIcon(item.title);
}

function updateFavoriteIcon(itemTitle) {
    const heartIcon = document.querySelector(`.heart-icon[data-title="${itemTitle}"]`);
    if (heartIcon) {
        const isFavorite = favorites.some(fav => fav.title === itemTitle);
        heartIcon.classList.toggle('favorited', isFavorite);
    }
}

function createCardComponent(item) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = item.title;

    const priceTag = document.createElement("p");
    priceTag.textContent = `$${item.price}`;

    const heartIcon = document.createElement("span");
    heartIcon.classList.add("heart-icon");
    heartIcon.dataset.title = item.title;
    heartIcon.onclick = () => toggleFavorite(item);
    updateFavoriteIcon(item.title);

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.onclick = () => addToCart(item);

    card.appendChild(heartIcon);
    card.appendChild(img);
    card.appendChild(cardTitle);
    card.appendChild(priceTag);
    card.appendChild(button);

    return card;
}

function displayCategories() {
    const categoriesSection = document.getElementById("categories");

    categories.forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.id = category.category.replace(/ /g, "-");

        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category.category;
        categoryDiv.appendChild(categoryTitle);

        const categoryCards = document.createElement("div");
        categoryCards.classList.add("category-cards");

        category.items.forEach((item) => {
            const card = createCardComponent(item);
            categoryCards.appendChild(card);
        });

        categoryDiv.appendChild(categoryCards);
        categoriesSection.appendChild(categoryDiv);
    });
}

function removeFromCart(itemTitle) {
    cart = cart.filter(item => item.title !== itemTitle);
    updateCart();
}

function toggleCart() {
    const cart = document.getElementById("cart");
    cart.classList.toggle("show");
}

function clearCart() {
    cart = [];
    updateCart();
}

displayCategories();
updateCart();
