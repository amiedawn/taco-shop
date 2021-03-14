const db = require("./connection");
const { User, Item, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Main" },
    { name: "Appetizer" },
    { name: "Drink" },
  ]);

  console.log("categories seeded");

  await DataTransferItem.deleteMany();

  const items = await Item.insertMany([
    {
      name: "Tacos",
      description:
        "3 tacos stuffed with your choice of grade A meat, cheese, lettuce, pico de gallo, guacamole, and sour cream",
      image: "tacos.jpg",
      category: categories[0]._id,
      price: $8,
      quantity: 500,
    },
    {
      name: "Burrito",
      description:
        "Gigantic burrito stuffed with your choice of grade A meat, rice, beans, cheese, lettuce, pico de gallo, guacamole, and sour cream",
      image: "burritos.jpg",
      category: categories[0]._id,
      price: $9,
      quantity: 500,
    },
    {
      name: "Quesadilla",
      category: categories[0]._id,
      description:
        "4 large quarters of tortilla stuffed with your choice of grade A meat and cheese",
      image: "quesadillas.jpeg",
      price: $5,
      quantity: 500,
    },
    {
      name: "Nachos Supreme",
      category: categories[0]._id,
      description:
        "Large pile of crisp tortilla chips piled high with your choice of grade A meat, beans, cheese, lettuce, pico de gallo, guacamole, and sour cream",
      image: "soap.jpg",
      price: $9,
      quantity: 500,
    },
    {
      name: "Chips and Salsa",
      category: categories[1]._id,
      description:
        "Hot and fresh tortilla chips along with our award-winning salsa",
      price: $3,
      quantity: 100,
    },
    {
      name: "Chips and Queso",
      category: categories[1]._id,
      description:
        "Hot and fresh tortilla chips along with our hot, flavorful queso",
      price: $4,
      quantity: 100,
    },
    {
      name: "Soda - Coca Cola Products",
      category: categories[2]._id,
      description:
        "Regular and Diet Coke, Sprite, Barq's Root Beer, and Fanta Orange sodas", 
      price: $2,
      quantity: 300,
    },
    {
      name: "Bottled Water",
      category: categories[2]._id,
      description:
        "Dasani bottled water",
      price: $2,
      quantity: 300,
    },
  ]);

  console.log("items seeded");

  await User.deleteMany();

  await User.create({
    username: "bobwhite",
    email: "bob@email.com",
    password: "password",
    orders: [
      {
        items: [items[0]._id, items[0]._id, items[1]._id],
      },
    ],
  });

  await User.create({
    username: "shellysmith",
    email: "ssmith@email.com",
    password: "password",
  });

  console.log("users seeded");

  process.exit();
});