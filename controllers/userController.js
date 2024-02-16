const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (usersCollection) => {
  return {
    registerUser: async (req, res) => {
      const { username, email, password } = req.body;
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const currentDate = new Date();

        await usersCollection.insertOne({
          username,
          email,
          password: hashedPassword,
          createdDate: currentDate,
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
  };
};
