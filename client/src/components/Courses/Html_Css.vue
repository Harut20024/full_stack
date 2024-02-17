<template>
  <div class="top-bar">
    <div class="user-info">
      <img
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
  <div class="content">
    <h1>Understanding HTML</h1>
    <img :src="htmlImg" alt="HTML and CSS Image" class="image" />
    <p>
      HTML, or Hypertext Markup Language, is the standard markup language used
      to create web pages. It forms the structural layer of web pages, allowing
      developers to organize content with elements such as headings, paragraphs,
      links, images, and more.
    </p>

    <p>
      HTML documents are the backbone of the web. Each document contains a
      series of elements that define the structure and content of a webpage.
      These elements are marked up with tags, which label pieces of content for
      web browsers to interpret and display accordingly.
    </p>

    <p>
      Being the foundation of web development, HTML is essential for creating
      web pages that are functional, accessible, and user-friendly. It works
      closely with CSS (Cascading Style Sheets) and JavaScript to create
      interactive and stylized web pages that users interact with daily.
    </p>
    <!-- Updated Quiz Section to focus on missing HTML part -->
    <div class="quiz-section">
      <h2>HTML Exercise</h2>
      <p>Test Yourself With This Exercise</p>
      <h3>Exercise:</h3>
      <p>Write in the missing attribute value</p>
      <code>
        &lt; <input id="answer" v-model="userAnswer" /> &gt;Here is your First
        Paragraph&lt;/p&gt;
      </code>

      <form @submit.prevent="submitQuiz1">
        <button type="submit">Submit</button>
      </form>

      <!-- Display result -->
      <div v-if="quizSubmitted">
        <p>
          Your Answer: <code>{{ userAnswer }}</code>
        </p>
        <p v-if="isCorrectAnswer">Correct! Well done you get 5 coins!!!</p>
        <p v-else>
          That's not quite right. Remember to use the title attribute for
          tooltips.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import htmlImg from "../../assets/html_css.png";
export default {
  name: "HtmlAndCss",
  data() {
    return {
      imageUrl: "",
      username: "",
      email: "",
      realName: "",
      surname: "",
      coin: "",
      htmlImg,
      userAnswer: "",
      quizSubmitted: false,
      ex1: "",
      ex2: "",
      ex3: "",
    };
  },
  created() {
    this.fetchUserImage();
  },
  computed: {
    isCorrectAnswer() {
      if (this.userAnswer.includes("p")) {
        this.quizSubmitted = true;
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async addCoin(variantOfAnswer) {
      const userId = this.userId;
      const endpointUrl = `http://localhost:3000/api/user/${userId}/update`;

      try {
        const response = await fetch(endpointUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Include authorization headers if needed
          },
          body: JSON.stringify({
            coins: this.coin + 5,
            [variantOfAnswer]: true,
          }),
        });

        if (response.ok) {
          // Update local state or trigger a re-fetch as necessary
          console.log("Coins and exercise updated successfully");
          // Optionally, refresh user data to reflect the update
          this.fetchUserImage();
        } else {
          console.error("Failed to update coins and exercise status");
        }
      } catch (error) {
        console.error("Error updating coins and exercise status:", error);
      }
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
          this.realName = userData.realName;
          this.surname = userData.surname;
          this.coin = userData.coin;
          this.ex1 = userData.html1;
          this.ex2 = userData.html2;
          this.ex3 = userData.html3;
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    },
    async submitQuiz1() {
      if (!this.ex1) {
        if (this.isCorrectAnswer) {
          this.addCoin("html1");
          this.ex1 = true;
          this.quizSubmitted = true;
          setTimeout(() => {
            this.quizSubmitted = false;
          }, 2000);
        } else {
          this.quizSubmitted = true;
          setTimeout(() => {
            this.quizSubmitted = false;
          }, 2000);
        }
      }
    },
  },
};
</script>

<style scoped>
@import "./course.css";
</style>
