<template>
  <div class="top-bar">
      <div id="icon" @click="homePage">
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
  <div class="content">
    <div id="mainer">
      <h1>HTML/CSS</h1>
      <p>
        HTML, or Hypertext Markup Language, is the standard markup language used
        to create web pages. It forms the structural layer of web pages,
        allowing developers to organize content with elements such as headings,
        paragraphs, links, images, and more.
      </p>

      <p>
        HTML documents are the backbone of the web. Each document contains a
        series of elements that define the structure and content of a webpage.
        These elements are marked up with tags, which label pieces of content
        for web browsers to interpret and display accordingly.
      </p>

      <p>
        Being the foundation of web development, HTML is essential for creating
        web pages that are functional, accessible, and user-friendly. It works
        closely with CSS (Cascading Style Sheets) and JavaScript to create
        interactive and stylized web pages that users interact with daily.
      </p>
      <img :src="htmlImg" alt="HTML and CSS Image" class="image" />
      <h3>HTML is the standard markup language for creating Web pages.</h3>

      <br />
      <p>
        What is HTML? HTML stands for Hyper Text Markup Language HTML is the
        standard markup language for creating Web pages HTML describes the
        structure of a Web page HTML consists of a series of elements HTML
        elements tell the browser how to display the content HTML elements label
        pieces of content such as "this is a heading", "this is a paragraph",
        "this is a link", etc. A Simple HTML Document
        <h2>Example</h2>
      </p>
    </div>
    <div class="code-example">
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;h1&gt;This is a Heading&lt;/h1&gt;
  &lt;p&gt;This is a paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
    </div>
    <div id="table">
      <ul>
        <li>
          The &lt;!DOCTYPE html&gt; declaration defines that this document is an
          HTML5 document.
        </li>
        <li>The &lt;html&gt; element is the root element of an HTML page.</li>
        <li>
          The &lt;head&gt; element contains meta information about the HTML
          page.
        </li>
        <li>
          The &lt;title&gt; element specifies a title for the HTML page (which
          is shown in the browser's title bar or in the page's tab).
        </li>
        <li>
          The &lt;body&gt; element defines the document's body, and is a
          container for all the visible contents, such as headings, paragraphs,
          images, hyperlinks, tables, lists, etc.
        </li>
        <li>The &lt;h1&gt; element defines a large heading.</li>
        <li>The &lt;p&gt; element defines a paragraph.</li>
      </ul>
    </div>
    <br />
    <h3>What is an HTML Element?</h3>
    <p>
      An HTML element is defined by a start tag, some content, and an end tag:
    </p>

    <pre><code>&lt;tagname&gt; Content goes here... &lt;/tagname&gt;</code></pre>

    <p>The HTML element is everything from the start tag to the end tag:</p>
    <div class="code-example">
      <pre><code>&lt;h1&gt;My First Heading&lt;/h1&gt;
&lt;p&gt;My first paragraph.&lt;/p&gt;</code></pre>
    </div>
    <h3>HTML Styles</h3>
    <p>
      The HTML style attribute is used to add styles to an element, such as
      color, font, size, and more.
    </p>
    <h4>Example</h4>
    <div class="code-example">
      <pre>
        <div class="text red">I am Red</div>
        <div class="text blue">I am Blue</div>
        <div class="text big">I am Big</div>
      </pre>
    </div>
    <h3>The HTML Style Attribute</h3>
    <p>
      Setting the style of an HTML element can be done with the style attribute.
    </p>
    <p>The HTML style attribute has the following syntax:</p>
    <div class="code-example">
      <pre><code>&lt;tagname style="property:value;"&gt;</code></pre>
    </div>
    <h3>HTML Images Syntax</h3>
    <div>
      <p>The HTML &lt;img&gt; tag is used to embed an image in a web page.</p>

      <p>
        Images are not technically inserted into a web page; images are linked
        to web pages. The &lt;img&gt; tag creates a holding space for the
        referenced image.
      </p>

      <p>
        The &lt;img&gt; tag is empty, it contains attributes only, and does not
        have a closing tag.
      </p>

      <p>The &lt;img&gt; tag has two required attributes:</p>

      <code>src</code> - Specifies the path to the image

      <code>alt</code> - Specifies an alternate text for the image, for
      accessibility purposes.

      <p>Syntax:</p>
      <div class="code-example">
        <pre><code>&lt;img src="url" alt="alternatetext"&gt;</code></pre>
      </div>
    </div>
    <!-- Updated Quiz Section to focus on missing HTML part -->
    <div class="quiz-section">
      <h3>Exercises</h3>
      <div>
        <h4>Exercise 1</h4>
        <p>Write in the missing attribute value</p>
        <code
          >&lt; <input id="answer1" v-model="userAnswer1" /> &gt;Here is your
          First Paragraph&lt;/p&gt;</code
        >
        <form @submit.prevent="submitQuiz(1)">
          <button type="submit">Submit</button>
        </form>
        <div v-if="quizSubmitted1">
          <p>
            Your Answer: <code>{{ userAnswer1 }}</code>
          </p>
          <p v-if="isCorrectAnswer1">Correct! Well done you get 5 coins!!!</p>
          <p v-else>
            That's not quite right. Remember to use the title attribute for
            tooltips.
          </p>
        </div>
      </div>
      <div>
        <h4>Exercise 2</h4>
        <p>
          Use the correct HTML attribute, and CSS, to set the color of the
          paragraph to "blue".
        </p>
        <code
          >&lt; <input id="answer2" v-model="userAnswer2" /> =
          "color:blue"&gt;This is a paragraph.&lt;/p&gt;</code
        >
        <form @submit.prevent="submitQuiz(2)">
          <button type="submit">Submit</button>
        </form>
        <div v-if="quizSubmitted2">
          <p>
            Your Answer: <code>{{ userAnswer2 }}</code>
          </p>
          <p v-if="isCorrectAnswer2">Correct! Well done you get 5 coins!!!</p>
          <p v-else>That's not quite right. Try again.</p>
        </div>
      </div>
      <div>
        <h4>Exercise 3</h4>
        <p>
          Use the HTML image attributes to set the size of the image to 250
          pixels wide.
        </p>
        <code
          >&lt; img src="scream.png"
          <input id="answer3" v-model="userAnswer3" /> = 250 &gt;</code
        >
        <form @submit.prevent="submitQuiz(3)">
          <button type="submit">Submit</button>
        </form>
        <div v-if="quizSubmitted3">
          <p>
            Your Answer: <code>{{ userAnswer3 }}</code>
          </p>
          <p v-if="isCorrectAnswer3">Correct! Well done you get 5 coins!!!</p>
          <p v-else>That's not quite right. Try again.</p>
        </div>
      </div>
    </div>
  </div>
  <footer>© 2024 Your Website. All Rights Reserved.</footer>

</template>

<script>
import iconImg from "@/assets/icon.png";
import htmlImg from "../../assets/html_css.png";
export default {
  name: "HtmlAndCss",
  data() {
    return {
      iconImg,
      imageUrl: "",
      realName: "",
      surname: "",
      coin: "",
      htmlImg,
      userAnswer1: "",
      userAnswer2: "",
      userAnswer3: "",
      quizSubmitted1: false,
      quizSubmitted2: false,
      quizSubmitted3: false,
      isCorrectAnswer1: false,
      isCorrectAnswer2: false,
      isCorrectAnswer3: false,
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
    homePage(){
      this.$router.push("/home");
    },
    async addCoin(exerciseKey, amount) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID is undefined.");
        return;
      }
      const endpointUrl = `http://localhost:3000/api/user/addcoin/${userId}`;

      try {
        const response = await fetch(endpointUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coinsToAdd: [amount],
            exerciseCompleted: [exerciseKey],
          }),
        });

        if (response.ok) {
          console.log("Coins and exercise status updated successfully");
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
    async submitQuiz(exerciseNumber) {
      let answer = this[`userAnswer${exerciseNumber}`];
      let isCorrect = false;
      let index = "";

      switch (exerciseNumber) {
        case 1:
          if (!this.ex1) {
            isCorrect = answer.includes("p");
            this.isCorrectAnswer1 = isCorrect;
            this.quizSubmitted1 = true;
            index = "html1";
          }
          break;
        case 2:
          if (!this.ex2) {
            isCorrect = answer === "style";
            this.isCorrectAnswer2 = isCorrect;
            this.quizSubmitted2 = true;
            index = "html2";
          }
          break;
        case 3:
          if (!this.ex3) {
            isCorrect = answer === "width";
            this.isCorrectAnswer3 = isCorrect;
            this.quizSubmitted3 = true;
            index = "html3";
          }
          break;
        default:
          console.error("Invalid exercise number");
          return;
      }

      if (isCorrect) {
        await this.addCoin(index, 5);
      }
    },
  },
};
</script>

<style scoped>
@import "./course.scss";
</style>
