const categories = [
    {
        category: "Healthy Recipes",
        items: [
            { title: "Fruit Smoothie", image: "images/recipe1.jpg", buttonText: "See Recipe" },
            { title: "Veggie Wrap", image: "images/recipe2.jpg", buttonText: "See Recipe" },
            // Add more items as needed
        ]
    },
    {
        category: "Children's Clothing",
        items: [
            { title: "Summer Dress", image: "images/clothing1.jpg", buttonText: "View Details" },
            { title: "Winter Jacket", image: "images/clothing2.jpg", buttonText: "View Details" },
            // Add more items as needed
        ]
    },
    {
        category: "Games for Children",
        items: [
            { title: "Memory Match", image: "images/game1.jpg", buttonText: "Play Now" },
            { title: "Puzzle Fun", image: "images/game2.jpg", buttonText: "Play Now" },
            // Add more items as needed
        ]
    },
    {
        category: "Educational Books",
        items: [
            { title: "Learning Colors", image: "images/book1.jpg", buttonText: "Read More" },
            { title: "Numbers & Counting", image: "images/book2.jpg", buttonText: "Read More" },
            // Add more items as needed
        ]
    },
];

let cart = [];

// Function to add item to the cart
function addToCart(item) {
    cart.push(item);
    updateCartCount();
    alert(`${item.title} has been added to your cart!`);
}

// Function to update the cart count displayed in the nav
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

// Display cart items (for demo purposes, in console)
function displayCart() {
    console.log("Cart Items:", cart);
}

// Create card component with "Add to Cart" functionality
function createCardComponent(title, image, buttonText) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = image;
    img.alt = title;

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = title;

    const button = document.createElement("button");
    button.textContent = buttonText;
    button.onclick = () => showMore(title);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.onclick = () => addToCart({ title, image });

    card.appendChild(img);
    card.appendChild(cardTitle);
    card.appendChild(button);
    card.appendChild(addToCartButton);

    return card;
}

// Function to display all categories and items
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
            const card = createCardComponent(item.title, item.image, item.buttonText);
            cardContainer.appendChild(card);
        });

        categoryDiv.appendChild(cardContainer);
        categoriesSection.appendChild(categoryDiv);
    });
}

function showMore(item) {
    alert(`More information about ${item} will be displayed here!`);
}

document.getElementById("cart-icon").addEventListener("click", displayCart);
document.addEventListener("DOMContentLoaded", displayCategories);
