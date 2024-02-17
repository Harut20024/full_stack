<template>
  <div class="form-container">
    <h2><font-awesome-icon icon="user-alt" /> Personal Information</h2>
    <form @submit.prevent="onSubmit">
      <!-- Profile Image -->
      <div class="form-group">
        <label for="image"
          ><font-awesome-icon icon="image" /> Profile Image:</label
        >
        <input
          type="file"
          id="image"
          @change="onImageChange"
          accept="image/*"
        />
      </div>
      <!-- Name -->
      <div class="form-group">
        <label for="realName"><font-awesome-icon icon="user" /> Name:</label>
        <input
          type="text"
          id="realName"
          @input="validateAlphabetical($event)"
          v-model="user.realName"
          required
        />
      </div>
      <!-- Surname -->
      <div class="form-group">
        <label for="surname"><font-awesome-icon icon="user" /> Surname:</label>
        <input
          type="text"
          @input="validateAlphabetical($event)"
          id="surname"
          v-model="user.surname"
          required
        />
      </div>
      <!-- Country -->
      <div class="form-group">
        <label for="country"><font-awesome-icon icon="globe" /> Country:</label>
        <input
          type="text"
          @input="validateAlphabetical($event)"
          id="country"
          v-model="user.country"
          required
        />
      </div>
      <!-- Gender -->
      <div class="form-group">
        <label for="gender"
          ><font-awesome-icon icon="venus-mars" /> Gender:</label
        >
        <select id="gender" v-model="user.gender" required>
          <option value="" disabled>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <!-- Phone -->
      <div class="form-group">
        <label for="phone"><font-awesome-icon icon="phone" /> Phone:</label>
        <div class="phone-input">
          <select v-model="user.countryCode" required>
            <option value="" disabled>Select country code</option>
            <option value="+374">+374 (Armenia)</option>
            <option value="+93">+93 (Afghanistan)</option>
            <option value="+355">+355 (Albania)</option>
            <option value="+213">+213 (Algeria)</option>
            <option value="+376">+376 (Andorra)</option>
            <option value="+43">+43 (Austria)</option>
            <option value="+32">+32 (Belgium)</option>
            <option value="+387">+387 (Bosnia and Herzegovina)</option>
            <option value="+359">+359 (Bulgaria)</option>
            <option value="+385">+385 (Croatia)</option>
            <option value="+357">+357 (Cyprus)</option>
            <option value="+420">+420 (Czech Republic)</option>
            <option value="+45">+45 (Denmark)</option>
            <option value="+20">+20 (Egypt)</option>
            <option value="+372">+372 (Estonia)</option>
            <option value="+358">+358 (Finland)</option>
            <option value="+33">+33 (France)</option>
            <option value="+995">+995 (Georgia)</option>
            <option value="+49">+49 (Germany)</option>
            <option value="+30">+30 (Greece)</option>
            <option value="+36">+36 (Hungary)</option>
            <option value="+354">+354 (Iceland)</option>
            <option value="+91">+91 (India)</option>
            <option value="+98">+98 (Iran)</option>
            <option value="+964">+964 (Iraq)</option>
            <option value="+353">+353 (Ireland)</option>
            <option value="+39">+39 (Italy)</option>
            <option value="+81">+81 (Japan)</option>
            <option value="+962">+962 (Jordan)</option>
            <option value="+7">+7 (Kazakhstan)</option>
            <option value="+254">+254 (Kenya)</option>
            <option value="+965">+965 (Kuwait)</option>
            <option value="+371">+371 (Latvia)</option>
            <option value="+961">+961 (Lebanon)</option>
            <option value="+218">+218 (Libya)</option>
            <option value="+423">+423 (Liechtenstein)</option>
            <option value="+370">+370 (Lithuania)</option>
            <option value="+352">+352 (Luxembourg)</option>
            <option value="+389">+389 (Macedonia)</option>
            <option value="+261">+261 (Madagascar)</option>
            <option value="+60">+60 (Malaysia)</option>
            <option value="+356">+356 (Malta)</option>
            <option value="+212">+212 (Morocco)</option>
            <option value="+31">+31 (Netherlands)</option>
            <option value="+64">+64 (New Zealand)</option>
            <option value="+234">+234 (Nigeria)</option>
            <option value="+47">+47 (Norway)</option>
            <option value="+968">+968 (Oman)</option>
            <option value="+92">+92 (Pakistan)</option>
            <option value="+970">+970 (Palestine)</option>
            <option value="+507">+507 (Panama)</option>
            <option value="+63">+63 (Philippines)</option>
            <option value="+48">+48 (Poland)</option>
            <option value="+351">+351 (Portugal)</option>
            <option value="+974">+974 (Qatar)</option>
            <option value="+40">+40 (Romania)</option>
            <option value="+966">+966 (Saudi Arabia)</option>
            <option value="+381">+381 (Serbia)</option>
            <option value="+65">+65 (Singapore)</option>
            <option value="+421">+421 (Slovakia)</option>
            <option value="+386">+386 (Slovenia)</option>
            <option value="+27">+27 (South Africa)</option>
            <option value="+82">+82 (South Korea)</option>
            <option value="+34">+34 (Spain)</option>
            <option value="+94">+94 (Sri Lanka)</option>
            <option value="+46">+46 (Sweden)</option>
            <option value="+41">+41 (Switzerland)</option>
            <option value="+963">+963 (Syria)</option>
            <option value="+886">+886 (Taiwan)</option>
            <option value="+66">+66 (Thailand)</option>
            <option value="+216">+216 (Tunisia)</option>
            <option value="+90">+90 (Turkey)</option>
            <option value="+380">+380 (Ukraine)</option>
            <option value="+971">+971 (United Arab Emirates)</option>
            <option value="+44">+44 (United Kingdom)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+598">+598 (Uruguay)</option>
            <option value="+58">+58 (Venezuela)</option>
            <option value="+84">+84 (Vietnam)</option>
            <option value="+967">+967 (Yemen)</option>
            <option value="+381">+381 (Yugoslavia)</option>
            <option value="+260">+260 (Zambia)</option>
            <option value="+263">+263 (Zimbabwe)</option>
          </select>
          <input
            type="tel"
            @input="validateNumeric($event)"
            v-model="user.phone"
            required
            placeholder="Enter phone number"
          />
        </div>
      </div>
      <!-- Submit Button -->
      <button type="submit" :disabled="isFormIncomplete">
        <font-awesome-icon icon="save" /> Save
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      user: {
        realName: "",
        surname: "",
        country: "",
        gender: "",
        phone: "",
        image: null,
        countryCode: "",
      },
    };
  },
  computed: {
    isFormIncomplete() {
      return (
        !this.user.realName.trim() ||
        !this.user.surname.trim() ||
        !this.user.country.trim() ||
        !this.user.gender.trim() ||
        !this.user.phone.trim()
      );
    },
  },
  methods: {
    validateAlphabetical(event) {
      event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
    },
    validateNumeric(event) {
      event.target.value = event.target.value.replace(/\D/g, "");
    },
    onImageChange(event) {
      const file = event.target.files[0];
      this.user.image = file;
    },
    async onSubmit() {
      await this.updateUser(this.user);
    },
    async updateUser(userDetails) {
      const userId = localStorage.getItem("userId");
      console.log(userId);
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      const formData = new FormData();
      for (const key in userDetails) {
        if (key !== "image") {
          formData.append(key, userDetails[key]);
        }
      }
      if (userDetails.image) {
        formData.append("image", userDetails.image);
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/update/${userId}`,
          {
            method: "PATCH",
            body: formData,
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Could not update user details.");
        }
        const data = await response.json();
        console.log("User details updated successfully:", data);
        alert("User details updated successfully!");
        localStorage.removeItem("userId");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error updating user details:", error);
        alert(error.message || "Failed to update user details.");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./formStyles.scss";

.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input[type="text"],
input[type="tel"],
input[type="file"],
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
.phone-input {
  display: flex;
}
.phone-input select {
  width: 30%;
  margin-right: 5px;
}
.phone-input input {
  width: 70%;
}
</style>
