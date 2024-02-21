const app = require("./app");
const createUniqueIndex = require("./module/module");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.DB_URI;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

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

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    createUniqueIndex(usersCollection);
    const userController = require("./controllers/userController")(
      usersCollection,
      db,
      io
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
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
