
function setPriceOnLoad() {
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
              priceElement.textContent = 'result.rows' 
          }
      });
  
  
  
  // Update the price element with the new price
  priceElement.textContent = '10' ;


}

