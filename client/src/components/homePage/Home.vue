<template>
  <div>
    <h1>Welcome Home, {{ realName }} {{ surname }}</h1>
    <img v-if="imageUrl" :src="imageUrl" alt="User Profile Image" />
    <p v-else>No image available</p>
    <div>
      <p>Username: {{ username }}</p>
      <p>Email: {{ email }}</p>
      <p>Country: {{ country }}</p>
      <p>Phone: {{ countryCode }} {{ phone }}</p>
      <p>Gender: {{ gender }}</p>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
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
