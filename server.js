const app = require("./app");
const createUniqueIndex = require("./module/module");
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.DB_URI;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB session
const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function run() {
  try {
    await client.connect();
    const db = client.db("Cluster");
    const usersCollection = db.collection("users");

    createUniqueIndex(usersCollection);
    const userController = require("./controllers/userController")(
      usersCollection,
      db
    );

    const loginRoutes = require("./routes/loginRoutes")(userController);

    app.use("/api", loginRoutes);

    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

run().catch(console.dir);

//starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
