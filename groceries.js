const platformLabels = {
  zepto: 'Zepto',
  instamart: 'Instamart',
  blinkit: 'Blinkit',
  bigbasket: 'BigBasket',
};

const platformColors = {
  zepto: 'bg-platform-zepto',
  instamart: 'bg-platform-instamart',
  blinkit: 'bg-platform-blinkit',
  bigbasket: 'bg-platform-bigbasket',
};

const platformTextColors = {
  zepto: 'platform-zepto',
  instamart: 'platform-instamart',
  blinkit: 'platform-blinkit',
  bigbasket: 'platform-bigbasket',
};

const mockGroceries = [
  // 🥦 Vegetables
  {
    name: "Tomato",
    category: "69bc8397cffa2a3df5740b7f",
    image: "🍅",
    unit: "kg",
    prices: [
      { platform: "blinkit", price: 30, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 28, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 32, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 29, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Potato",
    category: "69bc8397cffa2a3df5740b7f",
    image: "🥔",
    unit: "kg",
    prices: [
      { platform: "blinkit", price: 25, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 24, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 27, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 26, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Onion",
    category: "69bc8397cffa2a3df5740b7f",
    image: "🧅",
    unit: "kg",
    prices: [
      { platform: "blinkit", price: 35, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 34, deliveryTime: "9 mins", inStock: true },
      { platform: "instamart", price: 36, deliveryTime: "12 mins", inStock: false },
      { platform: "bigbasket", price: 33, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Spinach",
    category: "69bc8397cffa2a3df5740b7f",
    image: "🥬",
    unit: "bundle",
    prices: [
      { platform: "blinkit", price: 20, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 18, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 22, deliveryTime: "12 mins", inStock: false },
      { platform: "bigbasket", price: 19, deliveryTime: "1 day", inStock: true }
    ]
  },

  // 🍎 Fruits
  {
    name: "Apple",
    category: "69bc8397cffa2a3df5740b7e",
    image: "🍎",
    unit: "kg",
    prices: [
      { platform: "blinkit", price: 120, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 115, deliveryTime: "9 mins", inStock: true },
      { platform: "instamart", price: 125, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 118, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Banana",
    category: "69bc8397cffa2a3df5740b7e",
    image: "🍌",
    unit: "dozen",
    prices: [
      { platform: "blinkit", price: 50, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 48, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 52, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 49, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Orange",
    category: "69bc8397cffa2a3df5740b7e",
    image: "🍊",
    unit: "kg",
    prices: [
      { platform: "blinkit", price: 80, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 78, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 85, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 79, deliveryTime: "1 day", inStock: true }
    ]
  },

  // 🥛 Dairy
  {
    name: "Milk",
    category: "69bc8397cffa2a3df5740b7c",
    image: "🥛",
    unit: "liter",
    prices: [
      { platform: "blinkit", price: 60, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 58, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 62, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 59, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Paneer",
    category: "69bc8397cffa2a3df5740b7c",
    image: "🧀",
    unit: "200g",
    prices: [
      { platform: "blinkit", price: 90, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 85, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 95, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 88, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Curd",
    category: "69bc8397cffa2a3df5740b7c",
    image: "🥣",
    unit: "500g",
    prices: [
      { platform: "blinkit", price: 35, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 33, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 38, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 34, deliveryTime: "1 day", inStock: true }
    ]
  },

  // 🌾 Staples
  {
    name: "Rice",
    category: "69bc8397cffa2a3df5740b7d",
    image: "🍚",
    unit: "kg",
    prices: [
      { platform: "blinkit", price: 60, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 58, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 62, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 59, deliveryTime: "1 day", inStock: true }
    ]
  },
  {
    name: "Wheat Flour",
    category: "69bc8397cffa2a3df5740b7d",
    image: "🌾",
    unit: "kg",
    prices: [
      { platform: "blinkit", price: 45, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 43, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 47, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 44, deliveryTime: "1 day", inStock: true }
    ]
  },

  // 🍞 Bakery
  {
    name: "Bread",
    category: "69bc8397cffa2a3df5740b81",
    image: "🍞",
    unit: "pack",
    prices: [
      { platform: "blinkit", price: 40, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 38, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 42, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 39, deliveryTime: "1 day", inStock: true }
    ]
  },

  // 🥤 Beverages
  {
    name: "Coca Cola",
    category: "69bc8397cffa2a3df5740b82",
    image: "🥤",
    unit: "750ml",
    prices: [
      { platform: "blinkit", price: 40, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 38, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 42, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 39, deliveryTime: "1 day", inStock: true }
    ]
  },

  // 🥜 Dry Fruits
  {
    name: "Almonds",
    category: "69bf948c8c104b0f5ba6deda",
    image: "🥜",
    unit: "250g",
    prices: [
      { platform: "blinkit", price: 220, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 210, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 230, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 215, deliveryTime: "1 day", inStock: true }
    ]
  },

  // 🍜 Packaged Food
  {
    name: "Maggi Noodles",
    category: "69bc8397cffa2a3df5740b80",
    image: "🍜",
    unit: "pack",
    prices: [
      { platform: "blinkit", price: 14, deliveryTime: "10 mins", inStock: true },
      { platform: "zepto", price: 13, deliveryTime: "8 mins", inStock: true },
      { platform: "instamart", price: 15, deliveryTime: "12 mins", inStock: true },
      { platform: "bigbasket", price: 14, deliveryTime: "1 day", inStock: true }
    ]
  }
];


const categories = [
  { name: "All" },
  { name: "Dairy" },
  { name: "Staples" },
  { name: "Fruits" },
  { name: "Vegetables" },
  { name: "Packaged Food" },
  { name: "Bakery" },
  { name: "Beverages" },
  { name: "Dry Fruits" }
];

const users = [
  {
    name: "Krupa Patel",
    email: "krupapatel@gmail.com",
    isAdmin: true
  }
]

module.exports = {
  platformLabels,
  platformColors,
  platformTextColors,
  mockGroceries,
  categories
};