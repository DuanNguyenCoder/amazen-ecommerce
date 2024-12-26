const mongoose = require("mongoose");
const faker = require("faker");
const Category = require("../models/category");
const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");
const Brand = require("../models/brand");
require("dotenv").config();

mongoose.connect(process.env.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  // Check if database is empty
  const collections = await mongoose.connection.db.listCollections().toArray();

  if (collections.length === 0) {
    console.log("Database is empty. Adding fake data...");
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    await Brand.deleteMany({});

    // Create fake categories
    const categories = [];
    for (let i = 0; i < 5; i++) {
      const category = new Category({
        name: faker.commerce.department(),
      });
      categories.push(category);
      await category.save();
    }

    // Create fake brands
    const brands = [];
    for (let i = 0; i < 5; i++) {
      const brand = new Brand({
        name: faker.company.companyName(),
      });
      brands.push(brand);
      await brand.save();
    }

    // Create fake users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      users.push(user);
      await user.save();
    }

    // create admin for testing
    const admin = new User({
      name: "admin",
      email: "admin",
      password: "admin",
    });
    users.push(admin);
    await admin.save();

    // Create fake products
    const products = [];
    for (let i = 0; i < 10; i++) {
      const product = new Product({
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
        category: categories[Math.floor(Math.random() * categories.length)]._id,
        brand: brands[Math.floor(Math.random() * brands.length)]._id,
        owner: users[Math.floor(Math.random() * users.length)]._id,
      });
      products.push(product);
      await product.save();
    }

    // Create fake reviews
    for (let i = 0; i < 10; i++) {
      const review = new Review({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        rating: Math.floor(Math.random() * 5) + 1,
        owner: users[Math.floor(Math.random() * users.length)]._id,
        product: products[Math.floor(Math.random() * products.length)]._id,
      });
      await review.save();
    }

    console.log("Data seeded successfully");
    mongoose.connection.close();
  }
});
