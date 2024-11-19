// script.js

// Sample Data
const bakeryItems = [
    { id: 1, name: "Chocolate Cake", price: 500, weight: "500g", img: "cake.jpg" },
    { id: 2, name: "Blueberry Muffin", price: 150, weight: "150g", img: "muffin.jpg" },
    { id: 3, name: "Croissant", price: 120, weight: "100g", img: "croissant.jpg" },
    { id: 4, name: "Strawberry Tart", price: 200, weight: "200g", img: "tart.jpg" }
  ];
  
  // Shopping Cart
  let cart = [];
  
  // Create an Item Object Prototype
  function Item(id, name, price, weight, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.weight = weight;
    this.img = img;
  }
  
  // Add to Cart Function
  function addToCart(itemId) {
    const item = bakeryItems.find((item) => item.id === itemId);
    cart.push(item);
    displayCart();
  }
  
  // Display Items
  function displayItems() {
    const itemsContainer = document.getElementById("items");
    bakeryItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "item";
      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Weight: ${item.weight}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      itemsContainer.appendChild(itemElement);
    });
  }
  
  // Display Cart
  function displayCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.innerHTML = `
        <p>${item.name} - ₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
    });
  }
  
  // Remove from Cart Function
  function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
  }
  
  // Initialize Page
  displayItems();