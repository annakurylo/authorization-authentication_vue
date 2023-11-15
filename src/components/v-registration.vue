<template>
  <div class="v-registration">
    <h1 class="v-registration__title">Registration</h1>
    <div class="v-registration__form">
      <form
        id="form"
        class="v-registration__form-body"
        @submit.prevent="formSubmit"
      >
        <div class="v-registration__form-body-item">
          <input
            v-model="email"
            id="formEmail"
            placeholder="Email"
            type="text"
            class="v-registration__form-body-item-input"
            name="email"
            :class="{ email: emailError }"
          />
        </div>

        <div class="v-registration__form-body-item">
          <input
            v-model="username"
            id="formName"
            placeholder="Name"
            type="text"
            class="v-registration__form-body-item-input"
            name="name"
            :class="{ pib: pibError }"
          />
        </div>

        <div class="v-registration__form-body-item">
          <input
            v-model="phone"
            id="formPhone"
            placeholder="Phone"
            type="text"
            class="v-registration__form-body-item-input"
            name="phone"
            :class="{ phone: phoneError }"
          />
        </div>

        <div class="v-registration__form-body-item">
          <input
            v-model="id"
            id="formId"
            placeholder="Number of ID-card"
            type="text"
            class="v-registration__form-body-item-input"
            name="id"
            :class="{ id: idError }"
          />
        </div>
        <div class="v-registration__form-body-item">
          <input
            v-model="faculty"
            id="formFaculty"
            placeholder="Faculty"
            type="text"
            class="v-registration__form-body-item-input _req _id"
            name="faculty"
            :class="{ faculty: facultyError }"
          />
        </div>
        <div class="v-registration__form-body-item">
          <input
            v-model="birthday"
            id="formBirthday"
            placeholder="Birthday"
            type="date"
            class="v-registration__form-body-item-input _req _id"
            name="birrthday"
            autocomplete="on"
            :class="{ birthday: birthdayError }"
          />
        </div>
        <div class="v-registration__form-body-item">
          <input
            v-model="password"
            id="formPassword"
            placeholder="Password"
            type="password"
            class="v-registration__form-body-item-input"
            name="password"
            :class="{ password: passwordError }"
          />
        </div>
        <button
          @click="regUser"
          type="button"
          class="v-registration__form-body-button"
        >
          Submit
        </button>
      </form>
    </div>

    <div class="v-registration__login">
      <div class="v-registration__login-isAccount">Have an account?</div>
      <router-link :to="{ name: 'login' }">
        <div><button class="v-registration__login-btn">Log in</button></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  el: "#form",
  name: "v-registration",
  components: {},
  props: {},
  data() {
    return {
      email: "",
      username: "",
      phone: "",
      id: "",
      faculty: "",
      birthday: "",
      password: "",
      pibError: false,
      phoneError: false,
      idError: false,
      facultyError: false,
      birthdayError: false,
      emailError: false,
      passwordError: false,
    };
  },
  watch: {
    username() {
      if (!this.pibTest || this.username.length > 30) {
        this.pibError = true;
      } else {
        this.pibError = false;
      }
      if (this.username === "") {
        this.pibError = false;
      }
    },
    phone() {
      if (!this.phoneTest) {
        this.phoneError = true;
      } else {
        this.phoneError = false;
      }
      if (this.phone === "") {
        this.phoneError = false;
      }
    },
    id() {
      if (!this.idTest) {
        this.idError = true;
      } else {
        this.idError = false;
      }
      if (this.id === "") {
        this.idError = false;
      }
    },
    faculty() {
      if (!this.facultyTest) {
        this.facultyError = true;
      } else {
        this.facultyError = false;
      }
      if (this.faculty === "") {
        this.facultyError = false;
      }
    },
    birthday() {
      if (!this.birthdayTest) {
        this.birthdayError = true;
      } else {
        this.birthdayError = false;
      }
      if (this.birthday === "") {
        this.birthdayError = false;
      }
    },
    email() {
      if (!this.emailTest) {
        this.emailError = true;
      } else {
        this.emailError = false;
      }
      if (this.email === "") {
        this.emailError = false;
      }
    },
    password() {
      if (!this.passwordTest) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
      if (this.password === "") {
        this.passwordError = false;
      }
    },
  },
  computed: {
    regData() {
      return {
        email: this.email,
        username: this.username,
        phone: this.phone,
        id: this.id,
        faculty: this.faculty,
        birthday: this.birthday,
        password: this.password,
      };
    },
    pibTest() {
      return /^[А-ЯІ][а-яі]*\s[А-ЯІ][.](\s)?[А-ЯІ][.]+$/.test(this.username);
    },
    phoneTest() {
      return /^(\+3|)[0-9]{10,11}$/.test(this.phone);
    },
    idTest() {
      return /^[А-ЯІ|A-Z][А-ЯІ|A-Z]\s[№](\d{6})+$/.test(this.id);
    },
    facultyTest() {
      return /[А-ЯІ]+$/.test(this.faculty);
    },
    birthdayTest() {
      return /^(\d{4})[-](\d{2})[-](\d{2})+$/.test(this.birthday);
    },
    emailTest() {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(this.email);
    },
    passwordTest() {
      return /^(?=.*[0-9])(?=.*[!@#$%^&*\\-\\_])[a-zA-Z0-9!@#$%^&*\\-\\_]{6,16}$/.test(
        this.password
      );
    },
  },
  methods: {
    async regUser() {
      if (
        !this.pibError &&
        !this.emailError &&
        !this.phoneError &&
        !this.idError &&
        !this.facultyError &&
        !this.bitrhdayError &&
        !this.passwordError &&
        this.username !== "" &&
        this.email !== "" &&
        this.phone !== "" &&
        this.id !== "" &&
        this.faculty !== "" &&
        this.birthday !== "" &&
        this.password !== ""
      ) {
        const result = await axios.post("/registration", this.regData);

        console.log(result);
        if (result.data.status === "fail" && result.data.message) {
          alert(result.data.message);
        } else {
          this.email = "";
          this.username = "";
          this.phone = "";
          this.id = "";
          this.faculty = "";
          this.birthday = "";
          this.password = "";
          this.pibError = false;
          this.phoneError = false;
          this.idError = false;
          this.facultyError = false;
          this.birthdayError = false;
          this.emailError = false;
          this.passwordError = false;
        }
        setTimeout(() => {
          alert("Користувач успішно зараєстрований, можете залогінитися");
          this.$router.push({ name: "login" });
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-registration {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  height: 100vh;
  font-size: 20px;
  color: rgb(198, 148, 0);

  &__title {
    font-size: 32px;
    color: rgb(198, 148, 0);
    font-weight: 700;
    font-family: Snell Roundhand, cursive;
  }

  &__form {
    width: 350px;
    &-body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;

      &-item {
        width: 100%;
        &-input {
          width: 310px;
          font-size: 16px;
          height: 50px;
          padding: 0 20px;
          border-radius: 5px;
          transition: all 0.5s ease 0s;
        }
        &-input:focus {
          box-shadow: 0 0 15px rgb(198, 148, 0);
        }
      }

      &-button {
        width: 100%;
        margin: 0 auto;
        min-height: 60px;
        font-size: 18px;
        border-radius: 20px;
        letter-spacing: 2px;
        text-transform: uppercase;
        background-color: rgb(198, 148, 0);
        color: #000000;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 5px 0 #161b13;
        transition: background-color 0.5s ease 0s;
        position: relative;
        top: 0;
      }

      &-button:hover {
        background-color: rgb(198, 148, 0);
      }
      &-button:active {
        top: 3px;
        box-shadow: 0 2px #161b13;
      }
    }
  }

  &__login {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &-isAccount {
    }

    &-btn {
      background-color: rgb(198, 148, 0);
      border: none;
      padding: 5px 15px;
      border-radius: 10px;
      box-shadow: 0 5px 0 #161b13;
      transition: background-color 0.5s ease 0s;
      position: relative;
      top: 0;
    }
    &-btn:active {
      top: 3px;
      box-shadow: 0 2px #161b13;
    }
  }
}
.pib {
  border: 2px solid red;
}
.phone {
  border: 2px solid red;
}
.id {
  border: 2px solid red;
}
.faculty {
  border: 2px solid red;
}
.email {
  border: 2px solid red;
}
.birthday {
  border: 2px solid red;
}

.password {
  border: 2px solid red;
}

input::placeholder {
  color: rgb(143, 143, 143);
}
input[type="date"]::before {
  color: #999;
  content: attr(placeholder);
  margin-right: 122px;
}
input[type="date"]:focus::before {
  content: "" !important;
  display: none;
}
</style>
