<template>
  <div class="container">
    <div class="top-bar">
      <div id="icon">
        <img :src="iconImg" alt="icon" />
        <h2>Easy Learn</h2>
      </div>
      <div class="user-info">
        <img
          @click="profil"
          v-if="imageUrl"
          :src="imageUrl"
          alt="User Profile Image"
          class="user-image"
        />
        <span class="user-name">{{ realName }} {{ surname }}</span>
        <span class="coin">{{ coin }}</span>
        <font-awesome-icon v-if="coin" icon="coins" class="coin" />
        <button v-if="coin" @click="logout">Logout</button>
        <button v-else @click="login">Login</button>
      </div>
    </div>
    <div class="welcome-container">
      <h1>Welcome</h1>
    </div>
    <main>
      <div id="main">
        <br />
        <h2>Welcome to Easy Learn</h2>
        <br />
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
      <div v-if="leaderboard.length > 1">
        <div class="rank-container">
          <h1 class="rank-title">Leaderboard</h1>
          <p class="rank-description">
            Below are our top performers, showcasing users who have excelled in
            completing exercises and accumulating rewards. Your dedication and
            skill can earn you a spot among them, or perhaps even at the very
            top. Join the challenge and climb the ranks!
          </p>
        </div>
        <div class="leaderboard-container">
          <ul>
            <li v-for="(user, index) in leaderboard" :key="user._id">
              <img
                :src="user.imageUrl"
                alt="Profile Image"
                class="leaderboard-image"
              />
              <span
                >{{ index + 1 }}. {{ user.username }} -
                {{ user.coin }} coins</span
              >
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <h2>Loading leaderboard...</h2>
      </div>

      <div class="boxes">
        <h1>Courses</h1>
        <p>
          Explore our diverse selection of courses and choose the path that
          excites you the most. Embark on your learning journey and expand your
          horizons with each step forward.
        </p>
        <div
          class="box"
          v-for="course in courses"
          :key="course.id"
          @click="visitToTour(course.h2)"
        >
          <img :src="course.src" :alt="course.alt" />
          <h2>{{ course.h2 }}</h2>
          <p>{{ course.p }}</p>
        </div>
      </div>
    </main>
  </div>
  <footer class="footer">
    <div class="footer-content">
      <h3>Connect with us</h3>
      <ul class="social-links">
        <li>
          <a href="https://instagram.com" target="_blank"
            ><font-awesome-icon :icon="['fab', 'instagram']" /> Instagram</a
          >
        </li>
        <li>
          <a href="https://github.com" target="_blank"
            ><font-awesome-icon :icon="['fab', 'github']" /> GitHub</a
          >
        </li>
        <li>
          <a href="https://linkedin.com" target="_blank"
            ><font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn</a
          >
        </li>
        <li>
          <a href="https://facebook.com" target="_blank"
            ><font-awesome-icon :icon="['fab', 'facebook']" /> Facebook</a
          >
        </li>
      </ul>
    </div>
    <p>© 2024 Your Website. All Rights Reserved.</p>
  </footer>
</template>

<script>
import htmlAndCssImage from "@/assets/html_css.png";
import sqlImage from "@/assets/sql.png";
import mongoImg from "@/assets/mongo.png";
import jsImage from "@/assets/js.png";
import coursesData from "./courses.json";
import iconImg from "@/assets/icon.png";
import fallImg from "@/assets/sky.webp";
export default {
  name: "Home",
  data() {
    return {
      fallImg,
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
      courses: [],
      leaderboard: [],
      iconImg,
    };
  },
  created() {
    this.fetchLeaderboard();
    this.initializeCourses();
    this.fetchUserImage();
  },
  methods: {
    profil() {
      this.$router.push("/person");
    },
    visitToTour(courseTitle) {
      if (courseTitle === "HTML/CSS") courseTitle = "HTML";
      if (courseTitle === "JavaScript") courseTitle = "JS";
      this.$router.push(`/course/${courseTitle}`);
    },
    initializeCourses() {
      const images = {
        "html-css": htmlAndCssImage,
        sql: sqlImage,
        mongodb: mongoImg,
        javascript: jsImage,
      };

      this.courses = coursesData.map((course) => ({
        ...course,
        src: images[course.id],
      }));
    },
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("registered");
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/login");
    },

    async fetchLeaderboard() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/leaderboard"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        this.leaderboard = data;
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
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
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./home.scss";
</style>
