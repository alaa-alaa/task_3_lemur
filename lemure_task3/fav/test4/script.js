// Categories data
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
];

// Loading cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.title === item.title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

// Function to update cart
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
        `;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    document.getElementById("cart-count").innerText = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove item from cart
function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    updateCart();
}

// Function to increase item quantity
function increaseQuantity(title) {
    const item = cart.find(cartItem => cartItem.title === title);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Function to decrease item quantity
function decreaseQuantity(title) {
    const item = cart.find(cartItem => cartItem.title === title);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            removeFromCart(title);
        } else {
            updateCart();
        }
    }
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// Function to toggle cart display
function toggleCart() {
    const cartDropdown = document.getElementById("cart");
    cartDropdown.classList.toggle("show");
}

// Function to filter items based on search and filters
function filterItems() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll("#category-filters input:checked")).map(input => input.value);
    const priceRange = document.getElementById("priceRange").value;

    document.getElementById("priceValue").innerText = `$0 - $${priceRange}`;

    const categorySections = document.querySelectorAll(".category");
    categorySections.forEach(category => {
        const cards = category.querySelectorAll(".card");
        let hasVisibleCard = false;

        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const price = parseInt(card.getAttribute("data-price"), 10);
            const categoryName = category.querySelector("h2").textContent;

            const isVisible = title.includes(searchTerm) &&
                (selectedCategories.length === 0 || selectedCategories.includes(categoryName)) &&
                price <= priceRange;

            card.style.display = isVisible ? "flex" : "none";
            if (isVisible) hasVisibleCard = true;
        });

        category.style.display = hasVisibleCard ? "block" : "none";
    });
}

// Function to load categories
function loadCategories() {
    const categoriesSection = document.getElementById("categories");
    categories.forEach(categoryData => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `<h2>${categoryData.category}</h2><div class="category-cards"></div>`;
        const cardsContainer = categoryDiv.querySelector(".category-cards");

        categoryData.items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-price", item.price); // Set price as a data attribute
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Price: $${item.price}</p>
                <button onclick="addToCart(${JSON.stringify(item)})">Add to Cart</button>
            `;
            cardsContainer.appendChild(card);
        });

        categoriesSection.appendChild(categoryDiv);
    });
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    updateCart(); // Initialize cart display
});
