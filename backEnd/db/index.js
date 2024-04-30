const { Client } = require('pg'); // imports the pg module
const bcrypt = require('bcrypt');
const config = require('../config');

const client = new Client({
  connectionString: config.postgresEndpoint,
  ssl: { rejectUnauthorized : false }, // render deploy
  //ssl: true // local / comment out for committing to git
});

/**
 * Customer Methods
 */

async function createCustomer({ 
  username, 
  password,
  name,
  address
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows: [ customer ] } = await client.query(`
      INSERT INTO customer(username, password, name, address) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, hashedPassword, name, address]);

    if (!customer) {
      throw new Error('Failed to create user');
    }
    return customer;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}

async function updateCustomer({
  id, 
  fields = {}
}) {
   // build the set string
   const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ customer ] } = await client.query(`
      UPDATE customer
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return customer;
  } catch (error) {
    throw error;
  }
}

async function getAllCustomers() {
  try {
    const { rows } = await client.query(`
      SELECT id, username, name, address, active 
      FROM customer;
    `);
  
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCustomerById(userId) {
  try {
    const { rows: [ customer ] } = await client.query(`
      SELECT id, username, name, address, active
      FROM customer
      WHERE id=${ userId }
    `);

    if (!customer) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist"
      }
    }

    return customer;
  } catch (error) {
    throw error;
  }
}

async function getCustomerByUsername(username) {
  try {
    const { rows: [ customer ] } = await client.query(`
      SELECT *
      FROM customer
      WHERE username=$1
    `, [ username ]);



    return customer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllProducts() {
    try {
        const { rows } = await client.query(`
          SELECT id, price, name, "imageUrl" 
          FROM product;
        `);

        return rows;
      } catch (error) {
    console.log(error);
    throw error;
      }
}

async function getProductById(productId) {
  try {
      const { rows } = await client.query(`
        SELECT id, price, name, "imageUrl" 
        FROM product
        WHERE id = ${productId};
      `);

      return rows[0];
    } catch (error) {
    console.log(error);
    throw error;
    }
}

async function getProductSizesByProductId(productId) {
  try {
      const { rows } = await client.query(`
        SELECT id, "productId", size, quantity 
        FROM productSize
        WHERE "productId" = ${productId};
      `);

      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
}

async function getCartItemsByCustomerId(customerId) {
  if (!customerId) {
    throw 'customerId must have value';
  }

  try {
    const { rows } = await client.query(`
      SELECT  ci.id
            , ci."productSizeId"
            , ci."customerId"
            , ci."addedTimestamp"
            , ci.quantity
            , ps.size
            , p.name
            , p."imageUrl"
            , p.price
      FROM cartItem ci
      INNER JOIN productSize ps ON ps.id = ci."productSizeId"
      INNER JOIN product p ON p.id = ps."productId"
      WHERE ci."customerId" = ${customerId};
    `);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createCartItem({
  productSizeId,
  quantity,
  customerId
}) {
  try {
    const { rows: [ cartItem ] } = await client.query(`
      INSERT INTO cartItem("customerId", "productSizeId", "addedTimestamp", quantity) 
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [customerId, productSizeId, new Date(), quantity]);

    if (!cartItem) {
      throw new Error('Failed to create cartItem');
    }
    return cartItem;
  } catch (error) {
    throw new Error('Error creating cartItem: ' + error.message);
  }
}

async function clearCartItems(customerId) {
  try {
    console.log('clearing for ucstomer', customerId);
    await client.query(`
      DELETE FROM cartItem
      WHERE "customerId" = $1;
    `, [customerId]);
  } catch (error) {
    throw new Error('Error clearing cartItems: ' + error.message);
  }
}

async function createProduct({ 
  price,
  name,
  imageUrl
}) {
  try {
    const { rows: [ product ] } = await client.query(`
      INSERT INTO product(price, name, "imageUrl") 
      VALUES($1, $2, $3)
      RETURNING *;
    `, [price, name, imageUrl]);

    if (!product) {
      throw new Error('Failed to create product');
    }
    return product;
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
}


async function createProductSize({ 
  productId,
  size,
  quantity
}) {
  try {
    const { rows: [ productSize ] } = await client.query(`
      INSERT INTO productSize("productId", size, quantity) 
      VALUES($1, $2, $3)
      RETURNING *;
    `, [productId, size, quantity]);

    if (!productSize) {
      throw new Error('Failed to create productSize');
    }
    return productSize;
  } catch (error) {
    throw new Error('Error creating productSize: ' + error.message);
  }
}

async function getOrder(orderId) {
  if (!orderId) {
    throw 'orderId must have value';
  }

  try {
    const { rows } = await client.query(`
      SELECT  o.id
            , o."orderNumber"
            , o."customerId"
            , o."totalItems"
            , o."totalPrice"
            , o."placedTimestamp"
      FROM "order" o
      WHERE o."id" = ${orderId};
    `);

    if (rows.length) {
      return rows[0];
    } else {
      throw 'Order not found';
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getOrders() {
  
  try {
    const { rows } = await client.query(`
      SELECT  o.id
            , o."orderNumber"
            , o."customerId"
            , o."totalItems"
            , o."totalPrice"
            , o."placedTimestamp"
      FROM "order" o
    `);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getOrderItemsByOrderId(orderId) {
  if (!orderId) {
    throw 'orderId must have value';
  }

  try {
    const { rows } = await client.query(`
      SELECT  oi.id
            , oi."productSizeId"
            , oi.quantity
            , oi.price
            , ps.size
            , p.name
            , p."imageUrl"
      FROM orderItem oi
      INNER JOIN productSize ps ON ps.id = oi."productSizeId"
      INNER JOIN product p ON p.id = ps."productId"
      WHERE oi."orderId" = ${orderId};
    `);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createOrder({
  customerId,
  totalItems,
  totalPrice,
  placedTimestamp}) {
    try {
      let { rows: [ orderNumber ] } = await client.query(`
        select "orderNumber" 
        from "order" 
        order by "orderNumber" desc 
        limit 1`);

      if (!orderNumber) {
        orderNumber = 0;
      } else {
        orderNumber = orderNumber.orderNumber;
      }

      orderNumber += 1;
      const { rows: [ order ] } = await client.query(`
        INSERT INTO "order"("orderNumber", "customerId", "totalItems", "totalPrice", "placedTimestamp") 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING *;
      `, [orderNumber, customerId, totalItems, totalPrice, placedTimestamp]);
  
      if (!order) {
        throw new Error('Failed to create order');
      }
      return order;
    } catch (error) {
      throw new Error('Error creating order: ' + error.message);
    }
}

async function createOrderItems(orderItems) {
  try {
    let allAddedItems = [];

    for (const orderItemSource of orderItems) {

        const { rows: [ orderItem ] } = await client.query(`
        INSERT INTO orderItem("orderId", "productSizeId", quantity, price) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [orderItemSource.orderId, orderItemSource.productSizeId, orderItemSource.quantity, orderItemSource.price]);
        allAddedItems.push(orderItem);
    }

    if (allAddedItems.length != orderItems.length) {
      throw new Error('Failed to create all order items');
    }
    return allAddedItems;
  } catch (error) {
    throw new Error('Error creating order items: ' + error.message);
  }
}

module.exports = {  
  client,
  createCustomer,
  updateCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerByUsername,
  getAllProducts,
  getProductById,
  getProductSizesByProductId,
  getCartItemsByCustomerId,
  createCartItem,
  clearCartItems,
  createProduct,
  createProductSize,
  createOrder,
  createOrderItems,
  getOrderItemsByOrderId,
  getOrder,
  getOrders
}