const categories = [
    {
        category: "Healthy Recipes",
        items: [
            { title: "Fruit Smoothie", image: "images/recipe1.jpg", price: 5 },
            { title: "Veggie Wrap", image: "images/recipe2.jpg", price: 6 },
            { title: "Oatmeal Pancakes", image: "images/recipe3.jpg", price: 4 },
            { title: "Mini Pizzas", image: "images/recipe4.jpg", price: 7 },
            { title: "Quinoa Salad", image: "images/recipe5.jpg", price: 8 },
            { title: "Baked Apple Slices", image: "images/recipe6.jpg", price: 3 },
        ],
    },
    {
        category: "Children's Clothing",
        items: [
            { title: "Summer Dress", image: "images/clothing1.jpg", price: 15 },
            { title: "Winter Jacket", image: "images/clothing2.jpg", price: 25 },
            { title: "Playful T-Shirt", image: "images/clothing3.jpg", price: 10 },
            { title: "Cozy Sweater", image: "images/clothing4.jpg", price: 20 },
            { title: "Casual Pants", image: "images/clothing5.jpg", price: 18 },
            { title: "Rain Boots", image: "images/clothing6.jpg", price: 22 },
        ],
    },
    // Add other categories similarly...
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
            <button onclick="decreaseQuantity('${item.title}')">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity('${item.title}')">+</button>
            <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
        `;

        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    document.getElementById("cart-count").textContent = cart.reduce((count, item) => count + item.quantity, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    updateCart();
}

function increaseQuantity(title) {
    const item = cart.find(item => item.title === title);
    if (item) item.quantity++;
    updateCart();
}

function decreaseQuantity(title) {
    const item = cart.find(item => item.title === title);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(cartItem => cartItem.title !== title);
    }
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("show");
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

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.onclick = () => addToCart(item);

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

        const cardContainer = document.createElement("div");
        cardContainer.classList.add("category-cards");

        category.items.forEach((item) => {
            const card = createCardComponent(item);
            cardContainer.appendChild(card);
        });

        categoryDiv.appendChild(cardContainer);
        categoriesSection.appendChild(categoryDiv);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    updateCart();
});
