// Card data array with additional items for each category
const categories = [
    {
        category: "Healthy Recipes",
        items: [
            { title: "Fruit Smoothie", image: "images/recipe1.jpg", buttonText: "See Recipe" },
            { title: "Veggie Wrap", image: "images/recipe2.jpg", buttonText: "See Recipe" },
            { title: "Oatmeal Pancakes", image: "images/recipe3.jpg", buttonText: "See Recipe" },
            { title: "Mini Pizzas", image: "images/recipe4.jpg", buttonText: "See Recipe" },
            { title: "Quinoa Salad", image: "images/recipe5.jpg", buttonText: "See Recipe" },
            { title: "Baked Apple Slices", image: "images/recipe6.jpg", buttonText: "See Recipe" }
        ]
    },
    {
        category: "Children's Clothing",
        items: [
            { title: "Summer Dress", image: "images/clothing1.jpg", buttonText: "View Details" },
            { title: "Winter Jacket", image: "images/clothing2.jpg", buttonText: "View Details" },
            { title: "Playful T-Shirt", image: "images/clothing3.jpg", buttonText: "View Details" },
            { title: "Cozy Sweater", image: "images/clothing4.jpg", buttonText: "View Details" },
            { title: "Casual Pants", image: "images/clothing5.jpg", buttonText: "View Details" },
            { title: "Rain Boots", image: "images/clothing6.jpg", buttonText: "View Details" }
        ]
    },
    {
        category: "Games for Children",
        items: [
            { title: "Memory Match", image: "images/game1.jpg", buttonText: "Play Now" },
            { title: "Puzzle Fun", image: "images/game2.jpg", buttonText: "Play Now" },
            { title: "Coloring Adventure", image: "images/game3.jpg", buttonText: "Play Now" },
            { title: "Shape Sorter", image: "images/game4.jpg", buttonText: "Play Now" },
            { title: "Maze Challenge", image: "images/game5.jpg", buttonText: "Play Now" },
            { title: "Building Blocks", image: "images/game6.jpg", buttonText: "Play Now" }
        ]
    },
    {
        category: "Educational Books",
        items: [
            { title: "Learning Colors", image: "images/book1.jpg", buttonText: "Read More" },
            { title: "Numbers & Counting", image: "images/book2.jpg", buttonText: "Read More" },
            { title: "Alphabet Book", image: "images/book3.jpg", buttonText: "Read More" },
            { title: "Animals Around Us", image: "images/book4.jpg", buttonText: "Read More" },
            { title: "My First Words", image: "images/book5.jpg", buttonText: "Read More" },
            { title: "Shapes & Patterns", image: "images/book6.jpg", buttonText: "Read More" }
        ]
    }
];

// Existing code for creating cards and displaying categories (no changes needed)
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

    card.appendChild(img);
    card.appendChild(cardTitle);
    card.appendChild(button);

    return card;
}

function displayCategories() {
    const categoriesSection = document.getElementById("categories");

    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.id = category.category.replace(/ /g, '-');

        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category.category;
        categoryDiv.appendChild(categoryTitle);

        // Container for cards in horizontal row
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("category-cards");

        // Add cards to the container
        category.items.forEach(item => {
            const card = createCardComponent(item.title, item.image, item.buttonText);
            cardContainer.appendChild(card);
        });

        categoryDiv.appendChild(cardContainer);
        categoriesSection.appendChild(categoryDiv);
    });
}

// Display additional information when button is clicked
function showMore(item) {
    alert(`More information about ${item} will be displayed here!`);
}

// Initialize categories on page load
document.addEventListener("DOMContentLoaded", displayCategories);
