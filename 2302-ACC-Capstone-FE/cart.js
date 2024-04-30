
function addToCart() {
    var productName = "Vintage Denim Jacket";
    var productPrice = 49.99;
    var productQuantity = 1; // For simplicity, assuming the user adds one item at a time

    // Create a data structure to represent the product
    var product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity
    };

    // Add the product to the cart
    cartItems.push(product);

    // Update the cart count display
    updateCartCount();

    // Display a confirmation message to the user
    alert("Product added to cart!");

    // Update the price element with the new price
    // Access priceElement from setPriceOnLoad if needed
    var priceElement = setPriceOnLoad(); // Assuming setPriceOnLoad is defined elsewhere
    if (priceElement) {
        priceElement.textContent = '10'; // Example update to the price element
    }
}
