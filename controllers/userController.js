const bcrypt = require("bcrypt");
const saltRounds = 10;
const { ObjectId } = require("mongodb");
const { Binary } = require("mongodb");

module.exports = (usersCollection, db) => {
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

        const result = await usersCollection.insertOne({
          username,
          email,
          password: hashedPassword,
          createdDate: formattedDate,
        });

        res.status(201).send({
          _id: result.insertedId, // This is how you get the _id
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
          req.session.isLoggedIn = true;
          req.session.user = user;
          res
            .status(200)
            .send({
              message: "Login successful!",
              token: username,
              _id: user._id.toString(),
            });
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
    updateUser: async (req, res) => {
      const { realName, surname, country, gender, phone, countryCode } =
        req.body;
      const { id } = req.params;
      let imageBinary;

      if (req.file) {
        imageBinary = new Binary(req.file.buffer);
      }

      try {
        const updateData = {
          realName,
          surname,
          country,
          gender,
          phone,
          countryCode,
        };

        if (imageBinary) {
          updateData.image = imageBinary;
        }

        const updateResult = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: updateData,
          }
        );

        if (updateResult.matchedCount === 0) {
          return res.status(404).send({ message: "User not found." });
        }

        res.status(200).send({ message: "User updated successfully!" });
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Failed to update user." });
      }
    },
    profilImage: async (req, res) => {
      try {
        const { id } = req.params;
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(id) });

        if (!user || !user.image) {
          return res.status(404).send("Image not found.");
        }

        res.setHeader("Content-Type", "image/png"); // Adjust the content type accordingly
        res.send(user.image.buffer); // Send the binary data of the image
      } catch (error) {
        console.error("Error serving image:", error);
        res.status(500).send({ message: "Failed to serve image." });
      }
    },
    getUserDetails: async (req, res) => {
      const { id } = req.params;
      try {
        const user = await usersCollection.findOne(
          { _id: new ObjectId(id) },
          {
            projection: {
              password: 0,
              image: 0,
            },
          }
        );

        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }

        res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).send({ message: "Failed to fetch user details." });
      }
    },
  };
};
