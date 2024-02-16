const app = require("./app");
const createUniqueIndex = require('./module/module');
const express = require("express");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://htarzyanh:GG9rpIFW8u3WxlaQ@cluster.ewqtdot.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Connect to MongoDB and setup routes within the async function
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
    router.post("/register", userController.registerUser);
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
