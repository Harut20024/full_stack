const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (usersCollection) => {
  return {
    registerUser: async (req, res) => {
      const { username, email, password } = req.body;
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; 
        const day = currentDate.getDate();
        const hour = currentDate.getHours();
        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
          .toString()
          .padStart(2, "0")}:00`;

        await usersCollection.insertOne({
          username,
          email,
          password: hashedPassword,
          createdDate: formattedDate,
        });

        console.log(`New user created: ${username}`);
        res.status(201).send({
          message: "User registered successfully!",
        });
      } catch (error) {
        let errorMessage = "Username or email has already been used.";
        if (error.code === 11000) {
          errorMessage = "Username or email already exists.";
        }
        console.error("Error registering user:", error);
        res.status(500).send({ message: errorMessage });
      }
    },
    loginUser: async (req, res) => {
      const { username, password } = req.body;

      try {
        const user = await usersCollection.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
          res.status(200).send({ message: "Login successful!" });
        } else {
          res.status(401).send({ message: "Invalid username or password" });
        }
      } catch (error) {
        console.error("Error logging in user:", error);
        res
          .status(500)
          .send({ message: "An error occurred during the login process" });
      }
    },
  };
};
