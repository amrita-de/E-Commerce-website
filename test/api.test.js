// Integration tests for the E-Commerce backend.
// Uses an in-memory MongoDB so no real database or credentials are needed.
process.env.JWT_SECRET = "test-secret-for-ci";
process.env.ADMIN_EMAILS = "t@example.com";
process.env.NODE_ENV = "test";

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongod;
let server;
let base;
let failures = 0;

const check = (name, cond) => {
  if (cond) {
    console.log("PASS  " + name);
  } else {
    failures++;
    console.log("FAIL  " + name);
  }
};

const post = async (path, body, token) => {
  const res = await fetch(base + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "auth-token": token } : {}),
    },
    body: body ? JSON.stringify(body) : "",
  });
  return { status: res.status, data: await res.json() };
};

(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  const app = require("../index.js");
  await mongoose.connection.asPromise();
  await new Promise((resolve) => {
    server = app.listen(0, () => resolve());
  });
  base = "http://localhost:" + server.address().port;

  // 1. Signup returns a token and stores a HASHED password
  const signup = await post("/signup", { username: "Test User", email: "t@example.com", password: "pw12345" });
  check("signup returns token", signup.data.success === true && typeof signup.data.token === "string");
  const Users = mongoose.model("Users");
  const created = await Users.findOne({ email: "t@example.com" });
  check("signup stores bcrypt hash, not plaintext", created.password.startsWith("$2") && created.password !== "pw12345");

  // 2. Login against the hashed password
  const login = await post("/login", { email: "t@example.com", password: "pw12345" });
  check("login succeeds with correct password", login.data.success === true);
  const loginBad = await post("/login", { email: "t@example.com", password: "wrong" });
  check("login rejects wrong password", loginBad.data.success === false);

  // 3. Legacy plaintext account: login works once and upgrades to a hash
  await Users.create({ name: "Legacy", email: "old@example.com", password: "plainpw", cartData: { 1: 0 } });
  const legacyLogin = await post("/login", { email: "old@example.com", password: "plainpw" });
  check("legacy plaintext account can still log in", legacyLogin.data.success === true);
  const upgraded = await Users.findOne({ email: "old@example.com" });
  check("legacy password upgraded to bcrypt hash", upgraded.password.startsWith("$2"));
  const legacyRelogin = await post("/login", { email: "old@example.com", password: "plainpw" });
  check("upgraded account logs in via hash compare", legacyRelogin.data.success === true);

  // 4. Token verification on protected routes
  const noToken = await post("/getcart", {});
  check("protected route rejects missing token (401)", noToken.status === 401);
  const badToken = await post("/getcart", {}, "not-a-real-token");
  check("protected route rejects invalid token (401)", badToken.status === 401);
  const forged = require("jsonwebtoken").sign({ user: { id: created.id } }, "wrong-secret");
  const forgedRes = await post("/getcart", {}, forged);
  check("token signed with another secret is rejected", forgedRes.status === 401);

  // 5. Cart persistence round-trip
  const token = signup.data.token;
  await post("/addtocart", { itemId: 5 }, token);
  await post("/addtocart", { itemId: 5 }, token);
  await post("/addtocart", { itemId: 7 }, token);
  let cart = await post("/getcart", {}, token);
  check("cart persists add operations", cart.data["5"] === 2 && cart.data["7"] === 1);
  await post("/removefromcart", { itemId: 5 }, token);
  cart = await post("/getcart", {}, token);
  check("cart persists remove operation", cart.data["5"] === 1);

  // 6. Product endpoints: add needs ADMIN auth, list is public, remove needs admin
  const addAnon = await post("/addproduct", { name: "Kurta", image: "img", category: "women", new_price: 20, old_price: 30 });
  check("addproduct rejects unauthenticated request", addAnon.status === 401);
  const shopperSignup = await post("/signup", { username: "Shopper", email: "shopper@example.com", password: "pw12345" });
  const addShopper = await post("/addproduct", { name: "Kurta", image: "img", category: "women", new_price: 20, old_price: 30 }, shopperSignup.data.token);
  check("addproduct rejects a logged-in non-admin (403)", addShopper.status === 403);
  const removeShopper = await post("/removeproduct", { id: 1 }, shopperSignup.data.token);
  check("removeproduct rejects a logged-in non-admin (403)", removeShopper.status === 403);
  const add = await post("/addproduct", { name: "Kurta", image: "img", category: "women", new_price: 20, old_price: 30 }, token);
  check("addproduct works for an admin token", add.data.success === true);
  const list = await (await fetch(base + "/allproducts")).json();
  check("allproducts lists the added product", Array.isArray(list) && list.length === 1 && list[0].name === "Kurta" && list[0].id === 1);
  const add2 = await post("/addproduct", { name: "Shirt", image: "img", category: "men", new_price: 10, old_price: 15 }, token);
  const list2 = await (await fetch(base + "/allproducts")).json();
  check("product ids auto-increment", list2.length === 2 && list2[1].id === 2);
  await post("/removeproduct", { id: 1 }, token);
  const list3 = await (await fetch(base + "/allproducts")).json();
  check("removeproduct deletes by id", list3.length === 1 && list3[0].id === 2);

  await new Promise((resolve) => server.close(resolve));
  await mongoose.disconnect();
  await mongod.stop();
  console.log(failures === 0 ? "\nALL TESTS PASSED" : `\n${failures} TEST(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
})().catch((e) => {
  console.error("TEST RUN ERROR:", e);
  process.exit(1);
});
