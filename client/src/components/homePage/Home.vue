<template>
  <div class="container">
    <div class="top-bar">
      <div class="user-info">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          alt="User Profile Image"
          class="user-image"
        />
        <span class="user-name">{{ realName }} {{ surname }}</span>
        <font-awesome-icon icon="coins" class="coin" />
        <span class="coin">{{ coin }}</span>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <main>
      <h1>Welcome {{ realName }} {{ surname }}</h1>
      <div id="main">
        <p>
          In this website, users are invited to engage in a series of
          challenges, each accompanied by its own set of exercises designed to
          test and enhance their skills. As participants navigate through the
          content, they are prompted to read carefully and complete the
          exercises with precision. Success is not only measured by completion
          but rewarded materially; with every correct answer, users earn coins,
          adding a tangible sense of achievement to the learning experience.
          <br /><br />This gamified approach not only makes the learning process
          more interactive and engaging but also instills a sense of motivation
          among users. They are encouraged to delve deeper into the challenges,
          driven by the prospect of earning more coins with each exercise they
          conquer. These coins can symbolize a range of accomplishments, from
          mastering a particularly tough challenge to demonstrating consistency
          across a series of tasks. <br /><br />The website's structure is
          designed to cater to a wide array of interests and skill levels,
          ensuring there is something for everyone. Whether you are looking to
          polish your skills in a familiar domain or venture into uncharted
          territories, the site offers a well-curated selection of challenges
          that promise to test your abilities and push the boundaries of your
          knowledge.<br /><br />
          Beyond the immediate reward of coins, this platform fosters a deeper
          engagement with the material, encouraging users to not just passively
          consume information but actively apply what they've learned. It's an
          innovative way to make learning a more dynamic and rewarding process,
          turning the journey of acquiring new skills into an exciting adventure
          filled with challenges to overcome and rewards to be earned.
        </p>
        <br /><br />
      </div>
      <div class="boxes">
        <div class="box">
          <img :src="htmlAndCssImage" alt="HTML/CSS" />
          <h2>HTML/CSS</h2>
          <p>Markup and styling languages for web design and layout.</p>
        </div>
        <div class="box">
          <img :src="sqlImage" alt="SQL" />
          <h2>SQL</h2>
          <p>Standard language for managing and manipulating databases.</p>
        </div>
        <div class="box">
          <img :src="mongoImg" alt="MongoDB" />
          <h2>MongoDB</h2>
          <p>NoSQL database for modern, scalable applications.</p>
        </div>
        <div class="box">
          <img :src="jsImage" alt="JavaScript" />
          <h2>JavaScript</h2>
          <p>Dynamic programming language for web development.</p>
        </div>
      </div>
    </main>

    <footer>© 2024 Your Website. All Rights Reserved.</footer>
  </div>
</template>

<script>
import js from "../../assets/js.png";
import htmlAndJs from "../../assets/html_css.png";
import sql from "../../assets/sql.png";
import mongo from "../../assets/mongo.png";

export default {
  name: "Home",
  data() {
    return {
      imageUrl: "",
      username: "",
      email: "",
      country: "",
      countryCode: "",
      gender: "",
      phone: "",
      realName: "",
      surname: "",
      coin: "",
      jsImage: js,
      htmlAndCssImage: htmlAndJs,
      sqlImage: sql,
      mongoImg: mongo,
    };
  },

  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("registered");
      this.$router.push("/login");
    },
    async fetchUserImage() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/user/details/${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const userData = await response.json();
          this.imageUrl = `http://localhost:3000/api/user/image/${userId}`;
          this.username = userData.username;
          this.email = userData.email;
          this.country = userData.country;
          this.countryCode = userData.countryCode;
          this.gender = userData.gender;
          this.phone = userData.phone;
          this.realName = userData.realName;
          this.surname = userData.surname;
          this.coin = userData.coin;
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        console.log("User ID not found");
      }
    },
  },
  created() {
    this.fetchUserImage();
  },
};
</script>

<style scoped lang="scss">
@import "./home.scss";
</style>
