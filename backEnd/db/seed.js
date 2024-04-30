const {  
  client,
  createCustomer,
  updateCustomer,
  getAllCustomers,
  getCustomerById,
  getAllProducts,
  createProduct,
  createProductSize
} = require('./index');

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    //have to make sure to drop in correct order
    await client.query(`
    
      DROP TABLE IF EXISTS orderItem;
      DROP TABLE IF EXISTS "order";
      DROP TABLE IF EXISTS cartItem;
      DROP TABLE IF EXISTS productSize;
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS customer;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE customer (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL, 
          address VARCHAR(1024) NOT NULL,
          active boolean DEFAULT true
      );
      
      CREATE TABLE product (
        id SERIAL PRIMARY KEY,
        price DECIMAL NOT NULL,
        name VARCHAR(255) NOT NULL,
        "imageUrl" VARCHAR(1024) NOT NULL
      );


    CREATE TABLE productSize (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES product(id),
      size VARCHAR(255) NOT NULL,
      quantity INTEGER NOT NULL
    );

  CREATE TABLE cartItem (
      id SERIAL PRIMARY KEY,
      "customerId" INTEGER REFERENCES customer(id),
      "productSizeId" INTEGER REFERENCES productSize(id),
      "addedTimestamp" timestamp NOT NULL,
      quantity INTEGER NOT NULL
  );

  CREATE TABLE "order" (
      id SERIAL PRIMARY KEY,
      "orderNumber" INTEGER NOT NULL,
      "customerId" INTEGER REFERENCES customer(id),
      "totalItems" INTEGER NOT NULL,
      "totalPrice" DECIMAL NOT NULL,
      "placedTimestamp" timestamp NOT NULL
  );

  CREATE TABLE orderItem (
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES "order"(id),
      "productSizeId" INTEGER REFERENCES productSize(id),
      quantity INTEGER NOT NULL,
      price DECIMAL NOT NULL
  );

  `);
  
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialCustomers() {
  try {
    console.log("Starting to create customers...");

    await createCustomer({ 
      username: 'albert', 
      password: 'bertie99',
      name: 'Al Bert',
      address: '9492 Corwin Gateway, Jevonmouth, SD 16074'
  });
    await createCustomer({ 
      username: 'sandra', 
      password: '2sandy4me',
      name: 'Just Sandra',
      address: '773 Tristin Ranch Suite 243, Steveland, WI 80318'
    });
    await createCustomer({ 
      username: 'glamgal',
      password: 'soglam',
      name: 'Joshua',
      address: '27380 Dewayne Pike Suite 248, Raeganfort, FL 77829'
    });
    
    console.log("Finished creating customers!");
  } catch (error) {
    console.error("Error creating customers!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

      // TODO: Flesh out product names
      // TODO: Flesh out prices
    await createProduct({
      price: 50.00,
      name: "Carhartt Double Kneed Pants",
      imageUrl: "https://assets.basspro.com/image/upload/c_limit,dpr_1.0,f_auto,h_948,q_auto,w_2000/c_limit,h_948,w_2000/v1/ProductImages/600/brown_84638_main?pgw=1"
    });

    await createProduct({
      price: 45.00,
      name: "Levi Vintage Denim Jacket",
      imageUrl: "https://houghtonnyc.com/cdn/shop/products/Soulmates1-HP_Front_Jpeg_1024x1024.jpg?v=1555815188"
    });

    await createProduct({
      price: 550.00,
      name: "COOGI Crewneck",
      imageUrl: "https://media-photos.depop.com/b1/14580575/1759493930_022e9abc3872456db823ba135e13cfbd/P0.jpg"
    });

    await createProduct({
      price: 35.00,
      name: "Vintage Liquid BLue T-Shirt ",
      imageUrl: "https://media-assets.grailed.com/prd/listing/46956585/eea120c1f82a4ad496723f062485066a?w=1000"
    });

    await createProduct({
      price: 20.00,
      name: "Cowboys Hat",
      imageUrl: "https://cobblestore.com/cdn/shop/products/IMG_1777_3ab93662-5010-482f-9216-104de932d80b_1024x1024.jpg?v=1666383891"
    });

    await createProduct({
      price: 40.00,
      name: "Long Sleeve Button Up",
      imageUrl: "https://i.ebayimg.com/images/g/-AgAAOSwOhNkfz8G/s-l1600.png"
    });

    await createProduct({
      price:80.00,
      name: "Vintage Texas Rangers Jersey",
      imageUrl: "https://img.gem.app/630474292/1f/1693393869/salem-sportswear-vintage-90s-texas-rangers-tee.jpg"
    });

    await createProduct({
      price: 40.00,
      name: "Vintage SD Graphic Tee",
      imageUrl: "https://www.vintagerareusa.com/cdn/shop/products/3_5e443418-9945-4fb2-8d80-00debb85b2b3.jpg?v=1667536414"
    });

    await createProduct({
      price: 90.00,
      name: "Apex Hoodie",
      imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTMH_AvMGALZCvmn-ueXmuA10Fd8LFdPbQoH4vubpsxQ9cuZo3Fju6tdfLX1QOslC_24uHcewGu6oRlcfV6NRJUDrzABjX2PFXjBjBbudtIiMJlEX0wp9n6&usqp=CAE"
    });

    console.log("Finished creating products!");
  } catch (error) {
    console.log("Error creating products!");
    throw error;
  }
}


async function createInitialProductSizes() {
  try {
    console.log("Starting to create product sizes...");

      const [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9] = await getAllProducts();

      // TODO: Flesh out product sizes
    await createProductSize({
      productId: prod1.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod1.id,
      size: "ML",
      quantity: 10
    });

    await createProductSize({
      productId: prod1.id,
      size: "L",
      quantity: 10
    });

    await createProductSize({
      productId: prod2.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod2.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod2.id,
      size: "L",
      quantity: 10
    });
    
    await createProductSize({
      productId: prod3.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod3.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod3.id,
      size: "L",
      quantity: 10
    });
    
    await createProductSize({
      productId: prod4.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod4.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod4.id,
      size: "L",
      quantity: 10
    });
    
    await createProductSize({
      productId: prod5.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod5.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod5.id,
      size: "L",
      quantity: 10
    });
    
    await createProductSize({
      productId: prod6.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod6.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod6.id,
      size: "L",
      quantity: 10
    });
    
    await createProductSize({
      productId: prod7.id,
      size: "S",
      quantity: 10
    });
    
    await createProductSize({
      productId: prod7.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod7.id,
      size: "L",
      quantity: 10
    });

    await createProductSize({
      productId: prod8.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod8.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod8.id,
      size: "L",
      quantity: 10
    });

    await createProductSize({
      productId: prod9.id,
      size: "S",
      quantity: 10
    });

    await createProductSize({
      productId: prod9.id,
      size: "M",
      quantity: 10
    });

    await createProductSize({
      productId: prod9.id,
      size: "L",
      quantity: 10
    });

    console.log("Finished creating products!");
  } catch (error) {
    console.log("Error creating products!");
    throw error;
  }
}




async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialCustomers();
    await createInitialProducts();
    await createInitialProductSizes();
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllCustomers");
    const customers = await getAllCustomers();
    console.log("Result:", customers);

    console.log("Calling updateCustomer on customers[0]");
    const updateCustomerResult = await updateCustomer(customers[0].id, {
      name: "Newname Sogood",
      address: "156 Frami Isle, Arliestad, VT 00297"
    });
    console.log("Result:", updateCustomerResult);

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);

    console.log("Calling getCustomerById with 1");
    const albert = await getCustomerById(1);
    console.log("Result:", albert);

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());