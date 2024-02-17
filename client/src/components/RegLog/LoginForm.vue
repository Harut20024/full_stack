<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <h2>Login</h2>
      <div class="form-group icon-input">
        <font-awesome-icon icon="user" class="icon" />
        <input
          placeholder="Username"
          type="text"
          id="username"
          v-model="credentials.username"
          required
        />
      </div>
      <div class="form-group icon-input">
        <font-awesome-icon icon="lock" class="icon" />
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          placeholder="Password"
          required
        />
      </div>
      <p>
        Don't have an account?
        <span @click="routeToRegister" class="link">Register now</span>
      </p>
      <button type="submit" :disabled="isFormIncomplete">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    isFormIncomplete() {
      return !this.credentials.username || !this.credentials.password;
    },
  },
  methods: {
    async onSubmit() {
      const loginUrl = "http://localhost:3000/api/user/login";

      try {
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.credentials),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userId", data._id);
          console.log(data._id);
          this.$router.push("/home");
        } else {
          alert(`Login failed: ${data.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    },
    routeToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./formStyles.scss";
</style>
