<template>
  <div v-if="user" class="top-bar">
    <div @click="homePage" id="icon">
      <img :src="iconImg" alt="icon" />
      <h2>Easy Learn</h2>
    </div>
    <div class="user-info">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="User Profile Image"
        class="user-image"
      />
      <span class="user-name">{{ user.realName }} {{ user.surname }}</span>
      <span class="coin">{{ user.coin }}</span>
      <font-awesome-icon v-if="user.coin" icon="coins" class="coin" />
      <button v-if="user.coin" @click="logout">Logout</button>
      <button v-else @click="login">Login</button>
    </div>
  </div>

  <div class="profile-container">
    <div v-if="user" class="left-panel">
      <img :src="imageUrl" alt="User Profile Image" class="profile-image" />
      <div class="user-details">
        <h2>{{ user.realName }} {{ user.surname }}</h2>
        <p class="username">@{{ user.username }}</p>
        <p>gender: {{ user.gender }}</p>
        <p>Country: {{ user.country }}</p>
        <p>Phone: ({{ user.countryCode }}) {{ user.phone }}</p>
      </div>
    </div>
    <div v-if="user" class="right-panel">
      <div class="exercise-section">
        <h3>HTML/CSS Exercises</h3>
        <p>Exercise 1: {{ user.html1 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 2: {{ user.html2 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 3: {{ user.html3 ? "Completed" : "Incomplete" }}</p>
      </div>
      <div class="exercise-section">
        <h3>JS Exercises</h3>
        <p>Exercise 1: {{ user.js1 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 2: {{ user.js2 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 3: {{ user.js3 ? "Completed" : "Incomplete" }}</p>
      </div>
      <div class="exercise-section">
        <h3>MongoDB Exercises</h3>
        <p>Exercise 1: {{ user.mongo1 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 2: {{ user.mongo2 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 3: {{ user.mongo3 ? "Completed" : "Incomplete" }}</p>
      </div>
      <div class="exercise-section">
        <h3>SQL Exercises</h3>
        <p>Exercise 1: {{ user.sql1 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 2: {{ user.sql2 ? "Completed" : "Incomplete" }}</p>
        <p>Exercise 3: {{ user.sql3 ? "Completed" : "Incomplete" }}</p>
      </div>
    </div>
    <div v-else class="loading-state">
      <p>User data is loading or not available...</p>
    </div>
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
import iconImg from "@/assets/icon.png";

export default {
  name: "Profile",
  data() {
    return {
      user: null,
      iconImg,
      imageUrl: "",
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    homePage() {
      this.$router.push("/home");
    },

    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("registered");
      this.$router.push("/login");
    },
    async fetchUserProfile() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/details/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        this.user = userData;
        this.imageUrl = `http://localhost:3000/api/user/image/${userId}`;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./profile.scss";
</style>
