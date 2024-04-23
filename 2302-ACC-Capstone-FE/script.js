
  // Get the price element
  var priceElement = document.getElementById('price');

  // Generate a random price (for demonstration purposes)
  const { Client } = require('pg');
  const client = new Client({
      user: 'joelc',
      password: 'new_password',
      host: 'localhost',
      port: 5432,
      database: 'db_example',
  });
  client
      .connect()
      .then(() => {
          console.log('Connected to PostgreSQL database');
      })
      .catch((err) => {
          console.error('Error connecting to PostgreSQL database', err);
      });
  client.query('SELECT level FROM gold_member', (err, result) => {
      if (err) {
          console.error('Error executing query', err);
      } else {
          console.log('Query result:', result.rows[0]);
          priceElement.textContent = 'result.rows';
      }
  });

//   document.getElementById("loginButton").addEventListener("click", function () {
//       window.location.href = "email.html";
//   });

//   // Return priceElement or any other necessary variables if needed
//   return priceElement;
// }

// function addToCart() {
//   var productName = "Vintage Denim Jacket";
//   var productPrice = 49.99;
//   var productQuantity = 1; // For simplicity, assuming the user adds one item at a time

//   // Create a data structure to represent the product
//   var product = {
//       name: productName,
//       price: productPrice,
//       quantity: productQuantity
//   };

//   // Add the product to the cart
//   cartItems.push(product);

//   // Update the cart count display
//   updateCartCount();

//   // Display a confirmation message to the user
//   alert("Product added to cart!");

//   // Update the price element with the new price
//   // Access priceElement from setPriceOnLoad if needed
//   var priceElement = setPriceOnLoad();
//   if (priceElement) {
//       priceElement.textContent = '10';
//   }
// }
    }