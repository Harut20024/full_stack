<template>
  <div>
    <h1>Welcome Home</h1>
    <img v-if="imageUrl" :src="imageUrl" alt="User Profile Image" />
    <p v-else>No image available</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
    fetchUserImage() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        this.imageUrl = `http://localhost:3000/api/user/image/${userId}`;
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
