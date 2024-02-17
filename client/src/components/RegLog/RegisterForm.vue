<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <h2>Register</h2>
      <div class="form-group icon-input">
        <font-awesome-icon icon="user" class="icon" />
        <input
          placeholder="Username"
          type="text"
          id="username"
          v-model="user.username"
          required
        />
      </div>
      <div class="form-group icon-input">
        <font-awesome-icon icon="envelope" class="icon" />
        <input
          placeholder="Email"
          type="email"
          id="email"
          v-model="user.email"
          required
        />
      </div>
      <div class="form-group icon-input">
        <font-awesome-icon icon="lock" class="icon" />
        <input
          placeholder="Password"
          type="password"
          id="password"
          v-model="user.password"
          required
        />
      </div>
      <div class="form-group icon-input">
        <font-awesome-icon icon="unlock" class="icon" />
        <input
          placeholder="Confirm Password"
          type="password"
          id="confirmPassword"
          v-model="user.confirmPassword"
          required
        />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <p>
        Already signed up?
        <span @click="navigateToLogin" class="link">Sign in instead</span>
      </p>
      <button type="submit" :disabled="isFormIncomplete">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage: "",
    };
  },
  computed: {
    isFormIncomplete() {
      return (
        !this.user.username ||
        !this.user.email ||
        !this.user.password ||
        !(this.user.confirmPassword === this.user.password)
      );
    },
  },
  methods: {
    async onSubmit() {
      this.errorMessage = "";
      if (this.user.confirmPassword !== this.user.password) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      const url = "http://localhost:3000/api/register";
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
        }),
      };

      try {
        const response = await fetch(url, requestData);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.message || `HTTP error! status: ${response.status}`
          );
        }
        alert("Registration successful!");
        localStorage.setItem("userId", data._id);
        this.$router.push("/personal");
      } catch (error) {
        this.errorMessage = error.message || "Registration failed.";
      }
    },
    navigateToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./formStyles.scss";
</style>
