const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Configuration comes from the environment - no secrets in source code.
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  (() => {
    if (process.env.NODE_ENV === "production") {
      // Fail safe: refuse to start without a real secret instead of silently
      // invalidating everyone's sessions on every restart.
      throw new Error(
        "JWT_SECRET is not set. Set it in the environment before starting in production."
      );
    }
    // Development only: generate a random per-start secret so nothing secret
    // is committed. Tokens stop validating on restart; set JWT_SECRET for
    // persistent sessions.
    console.warn(
      "JWT_SECRET is not set - using a random per-start secret (development only). Set JWT_SECRET in your environment for sessions that survive restarts."
    );
    return crypto.randomBytes(32).toString("hex");
  })();

// Admin authorization: only these accounts may change products.
// Comma-separated emails in ADMIN_EMAILS; product mutations are rejected
// for everyone else until at least one admin email is configured.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Database Connection with mongodb
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error: " + error));

//API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Schema creating for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Schema for products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Middleware: verify the JWT sent in the auth-token header and attach the
// user id to the request. Protects the cart and product-mutation endpoints.
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, errors: "Please authenticate using a valid token" });
  }
};

// Requires fetchuser first: confirms the authenticated account is an admin.
const fetchadmin = async (req, res, next) => {
  const user = await Users.findById(req.user.id);
  if (!user || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
    return res
      .status(403)
      .json({ success: false, errors: "Admin access required" });
  }
  next();
};

const isBcryptHash = (value) => typeof value === "string" && value.startsWith("$2");

const signToken = (user) =>
  jwt.sign({ user: { id: user.id } }, JWT_SECRET);

// Creating endpoint for registering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "existing user found with same email address" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cartData: cart,
  });

  await user.save();
  res.json({ success: true, token: signToken(user) });
});

//Creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ success: false, errors: "Wrong Email Id" });
  }

  let passCompare;
  if (isBcryptHash(user.password)) {
    passCompare = await bcrypt.compare(req.body.password, user.password);
  } else {
    // Account created before passwords were hashed: compare the stored
    // plaintext once, then upgrade it to a bcrypt hash on this login.
    passCompare = req.body.password === user.password;
    if (passCompare) {
      user.password = await bcrypt.hash(req.body.password, 10);
      await user.save();
    }
  }

  if (!passCompare) {
    return res.json({ success: false, errors: "Wrong Password" });
  }
  res.json({ success: true, token: signToken(user) });
});

// Image storage for the admin product upload
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));

app.post("/upload", fetchuser, fetchadmin, upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    img_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
});

// Endpoint for adding a product (admin)
app.post("/addproduct", fetchuser, fetchadmin, async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  res.json({ success: true, name: req.body.name });
});

// Endpoint for removing a product (admin)
app.post("/removeproduct", fetchuser, fetchadmin, async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

// Endpoint for listing all products (public)
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// Cart endpoints: persist the shopper's cart on their user record so it
// survives a page refresh. All require a valid auth-token.
app.post("/addtocart", fetchuser, async (req, res) => {
  let userData = await Users.findById(req.user.id);
  userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.json({ success: true });
});

app.post("/removefromcart", fetchuser, async (req, res) => {
  let userData = await Users.findById(req.user.id);
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.json({ success: true });
});

app.post("/getcart", fetchuser, async (req, res) => {
  let userData = await Users.findById(req.user.id);
  res.json(userData.cartData || {});
});

module.exports = app;

if (require.main === module) {
  app.listen(port, (error) => {
    if (!error) {
      console.log("Server Running on port " + port);
    } else {
      console.log("Error : " + error);
    }
  });
}
