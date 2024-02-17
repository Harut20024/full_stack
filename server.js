const app = require("./app");
const createUniqueIndex = require("./module/module");
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://htarzyanh:GG9rpIFW8u3WxlaQ@cluster.ewqtdot.mongodb.net/?retryWrites=true&w=majority";
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

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
    secret: "your secret key", 
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
      usersCollection
    );

    const router = express.Router();

    router
      .post("/register", userController.registerUser)
      .post("/login", userController.loginUser);

    app.use("/api", router);

    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

run().catch(console.dir);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
