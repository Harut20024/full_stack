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
    <h1>Community chat</h1>
    <ul class="messages">
      <li
        v-for="msg in messages"
        :key="msg._id"
        class="message"
        :class="getClassById(msg.id)"
      >
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
      userId: "",
    };
  },
  created() {
    this.userId = localStorage.getItem("userId");
    this.fetchMessage();
    this.fetchUser();
    socket.on("chat message", (newMessage) => {
      const updatedMessage = {
        ...newMessage,
        imageUrl: `http://localhost:3000/api/user/image/${newMessage.id}`,
      };
      this.messages.push(updatedMessage);
    });
  },

  methods: {
    getClassById(id) {
      return this.userId === id ? "self" : "other";
    },

    homePage() {
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
      if (this.userId) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/user/details/${this.userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const userData = await response.json();
          this.user = userData;
          this.imageUrl = `http://localhost:3000/api/user/image/${this.userId}`;
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    },
    async fetchMessage() {
      try {
        const response = await fetch("http://localhost:3000/api/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch Messages data");
        }
        let data = await response.json();

        data = data.map((message) => ({
          ...message,
          imageUrl: `http://localhost:3000/api/user/image/${message.id}`,
        }));

        this.messages = data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },

    async sendMessage() {
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
              id: this.userId,
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
