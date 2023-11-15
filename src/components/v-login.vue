<template>
  <div class="v-login">
    <h1 class="v-login__title">Log in</h1>
    <div class="v-login__form">
      <form id="form" class="v-login__form-body" @submit.prevent="formSubmit">
        <div class="v-login__form-body-item">
          <input
            v-model="email"
            id="formEmail"
            placeholder="Email"
            type="text"
            class="v-login__form-body-item-input"
            name="email"
            :class="{ email: emailError }"
          />
        </div>
        <div class="v-login__form-body-item">
          <input
            v-model="password"
            id="formPassword"
            placeholder="Password"
            type="password"
            class="v-login__form-body-item-input"
            name="password"
            :class="{ password: passwordError }"
          />
        </div>
        <button
          @click="logUser"
          type="button"
          class="v-login__form-body-button"
        >
          Log in
        </button>
      </form>
    </div>
    <div class="v-login__registration">
      <div class="v-login__registration-isAccount">No account?</div>
      <router-link :to="{ name: 'registration' }">
        <div>
          <button class="v-login__registration-btn">Registration</button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  el: "#form",
  name: "v-login",
  components: {},
  props: {},
  data() {
    return {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
    };
  },
  computed: {
    logData() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    async logUser() {
      try {
        this.emailError = false
        this.passwordError = false
        const result = await axios.post("/login", this.logData);

        const id = result.data.id;
        localStorage.setItem("token", result.data.token);
        (this.email = ""), (this.password = "");

        setTimeout(() => {
          alert("Користувач успішно залогінився");
          this.$router.push({ name: "user", params: { id } });
        }, 100);
      } catch(err) {
        if(err.response.data.message.split(": ")[0] === "Email") {
          this.emailError = true
        }else {
          this.passwordError = true
        }

        setTimeout(() => {
          alert(err.response.data.message)
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-login {
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

  &__registration {
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

  .email {
    border: 2px solid red;
  }
  .password {
    border: 2px solid red;
  }
}
</style>
