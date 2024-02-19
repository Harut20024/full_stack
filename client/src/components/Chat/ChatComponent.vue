<template>
  <div class="top-bar">
    <div @click="homePage" id="icon">
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
      <span class="user-name">{{ user.realName }} {{ user.surname }}</span>
      <span class="coin">{{ user.coin }}</span>
      <font-awesome-icon v-if="user.coin" icon="coins" class="coin" />
      <button v-if="user.coin" @click="logout">Logout</button>
      <button v-else @click="login">Login</button>
    </div>
  </div>
  <div class="chat-container">
    <ul class="messages">
      <li v-for="msg in messages" :key="msg.id" class="message">
        <div class="message-header">
          <img :src="msg.imageUrl" alt="Profile Image" class="profile-image" />
          <span class="username">{{ msg.username }}</span>
        </div>
        <p class="message-content">{{ msg.message }}</p>
      </li>
    </ul>
    <div class="message-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");
import iconImg from "@/assets/icon.png";

export default {
  name: "ChatComponent",
  data() {
    return {
      imageUrl: "",
      user: "",
      iconImg,
      newMessage: "",
      messages: [],
    };
  },
  created() {
    this.fetchMessage();
    this.fetchUser();
    socket.on("db change", (change) => {
      console.log("Database change detected", change);
      this.fetchMessage();
    });
  },
  methods: {
    homePage(){
      this.$router.push("/home");
    },
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("registered");
      this.$router.push("/login");
    },
    profil() {
      this.$router.push("/person");
    },
    async fetchUser() {
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
          this.user = userData;
          this.imageUrl = `http://localhost:3000/api/user/image/${userId}`;
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    },
    async fetchMessage() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/getMessages"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Messages data");
        }
        const data = await response.json();
        this.messages = data;
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    },
    async sendMessage() {
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("authToken");
      if (this.newMessage.trim()) {
        try {
          const response = await fetch("http://localhost:3000/api/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: this.newMessage,
              username: userName,
              id: userId,
            }),
          });
          if (!response.ok) throw new Error("Failed to send message");
          this.newMessage = "";
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./chat.scss";
</style>
