const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

//Function to seed the data

const seedData = async () => {
  try {
    //Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //Create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    //Assign the default userID t0 each product
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //Insert dummy products to database
    await Product.insertMany(sampleProducts);
    console.log("Product Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data");
    process.exit(1);
  }
};

seedData();
