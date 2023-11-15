<template>
  <div v-if="!isError" class="v-user">
    <h1 class="v-user__title">User Information</h1>
    <div class="v-user__form">
      <form id="form" class="v-user__form-body" @submit.prevent="formSubmit">
        <div class="v-user__form-body-item">
          <input
            v-model="username"
            id="formName"
            :disabled="!isAdmin"
            placeholder="Name"
            type="text"
            class="v-user__form-body-item-input"
            name="name"
            :class="{ pib: pibError }"
          />
        </div>

        <div class="v-user__form-body-item">
          <input
            v-model="phone"
            id="formPhone"
            :disabled="!isAdmin"
            placeholder="Phone"
            type="text"
            class="v-user__form-body-item-input"
            name="phone"
            :class="{ phone: phoneError }"
          />
        </div>

        <div class="v-user__form-body-item">
          <input
            v-model="pasport"
            id="formId"
            :disabled="!isAdmin"
            placeholder="Number of ID-card"
            type="text"
            class="v-user__form-body-item-input"
            name="id"
            :class="{ pasport: pasportError }"
          />
        </div>
        <div class="v-user__form-body-item">
          <input
            v-model="faculty"
            id="formFaculty"
            :disabled="!isAdmin"
            placeholder="Faculty"
            type="text"
            class="v-user__form-body-item-input _req _id"
            name="faculty"
            :class="{ faculty: facultyError }"
          />
        </div>
        <div class="v-user__form-body-item">
          <input
            v-model="birthday"
            id="formBirthday"
            :disabled="!isAdmin"
            placeholder="Bithday"
            type="date"
            class="v-user__form-body-item-input _req _id"
            name="birthday"
            autocomplete="on"
            :class="{ birthday: birthdayError }"
          />
        </div>
        <div v-if="isAdmin" class="v-user__form-body-item radio">
            <fieldset class="v-user__form-body-item-radiobtn">
                <div class="v-user__form-body-item-radiobtn-value">
                  <input type="radio" id="user" v-model="role" value="User" :checked="!userRole"/>
                  <label for="user">User</label>
                </div>
              
                <div class="v-user__form-body-item-radiobtn-value">
                  <input type="radio" id="admin" v-model="role" value="Admin" :checked="userRole"/>
                  <label for="admin">Admin</label>
                </div>
              </fieldset>
        </div>
        <button
          v-if="isAdmin"
          @click="updateUser"
          type="button"
          class="v-user__form-body-button"
        >
          Редагувати
        </button>
        <button
          v-if="isAdmin"
          @click="deleteUser"
          type="button"
          class="v-user__form-body-button"
        >
          Видалити
        </button>
        <router-link :to="{ name: 'users' }" class="btn">
          <button v-if="isAdmin" class="v-user__form-body-button">
            Всі користувачі
          </button>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "v-user",
  components: {},
  props: {},
  data() {
    return {
      id: this.$route.params.id,
      username: "",
      phone: "",
      pasport: "",
      faculty: "",
      birthday: "",
      role: "",
      isAdmin: false,
      isError: false,
      pibError: false,
      phoneError: false,
      pasportError: false,
      facultyError: false,
      birthdayError: false,
      roles: []
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
    pasport() {
      if (!this.pasportTest) {
        this.pasportError = true;
      } else {
        this.pasportError = false;
      }
      if (this.id === "") {
        this.pasportError = false;
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
  },
  computed: {
    userRole() {
      return this.roles.includes("Admin")
    },
    updateData() {
      return {
        username: this.username,
        phone: this.phone,
        id: this.pasport,
        faculty: this.faculty,
        birthday: this.birthday,
        role: this.role,
      };
    },
    pibTest() {
      return /^[А-ЯІ][а-яі]*\s[А-ЯІ][.](\s)?[А-ЯІ][.]+$/.test(this.username);
    },
    phoneTest() {
      return /^(\+3|)[0-9]{10,11}$/.test(this.phone);
    },
    pasportTest() {
      return /^[А-ЯІ|A-Z][А-ЯІ|A-Z]\s[№](\d{6})+$/.test(this.pasport);
    },
    facultyTest() {
      return /[А-ЯІ]+$/.test(this.faculty);
    },
    birthdayTest() {
      return /^(\d{4})[-](\d{2})[-](\d{2})+$/.test(this.birthday);
    },
  },
  methods: {
    async deleteUser() {
      const result = await axios.delete(
          `/user/${this.id}`
        );

        if (result.data.status === "fail" && result.data.message) {
          alert(result.data.message);
        } else {
          setTimeout(() => {
          alert("Користувач успішно видалений");
          this.$router.go(-1); //!!!!!!!!!!!!!!
        }, 100);
        }

    },
    async updateUser() {
      if (
        !this.pibError &&
        !this.phoneError &&
        !this.facultyError &&
        !this.bitrhdayError &&
        !this.pasportError &&
        this.username !== "" &&
        this.phone !== "" &&
        this.pasport !== "" &&
        this.faculty !== "" &&
        this.birthday !== ""
      ) {

        console.log("role " + this.role)

        const result = await axios.put(
          `/user/${this.id}`,
          this.updateData
        );

        if (result.data.status === "fail" && result.data.message) {
          alert(result.data.message);
        } else {
          this.username = "";
          this.phone = "";
          this.pasport = "";
          this.faculty = "";
          this.birthday = "";
          this.pibError = false;
          this.phoneError = false;
          this.pasportError = false;
          this.facultyError = false;
          this.birthdayError = false;
          this.roles = []
        }
        setTimeout(() => {
          alert("Користувач успішно відредагований");
          this.$router.go();
        }, 100);
      }
    },
  },
  async created() {
    //this.$router.go();
    const config = {
      params: {
        token: localStorage.getItem("token"),
      },
    };
    try {
      const user = await axios.get(`/user/${this.id}`, config);
      this.birthday = user.data.user.birthday;
      this.faculty = user.data.user.faculty;
      this.pasport = user.data.user.id;
      this.phone = user.data.user.phone;
      this.username = user.data.user.username;
      this.isAdmin = user.data.admin;
      this.roles = user.data.userRoles


      if(this.roles.includes("Admin")) {
        this.role = "Admin"
      }else {
        this.role = "User"
      }

    } catch (err) {
      this.isError = true;
      setTimeout(() => {
        alert(err.response.data.message);
      }, 500);
    }
  },
};
</script>

<style lang="scss" scoped>
.v-user {
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

        &-radiobtn {
            border-radius: 5px;
            height: 50px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            color: rgb(255, 255, 255);

            &-value{

            }
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

*:disabled {
  background-color: white;
  color: rgb(0, 0, 0);
  opacity: 1;
}

.pib {
  border: 2px solid red;
}
.phone {
  border: 2px solid red;
}
.pasport {
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

.btn {
  text-decoration: none;
  color: #000000;
  width: 100%;
}
a {
  width: 100%;
}


fieldset {
    border: 0;
}

input[type='radio'] {
    -webkit-appearance:none;
    width:15px;
    height:15px;
    border:1px solid darkgray;
    border-radius:50%;
    outline:none;
    box-shadow:0 0 5px 0px gray inset;
    margin: 0 10px 0 0;
}
input[type='radio']:hover {
    box-shadow:0 0 5px 0px orange inset;
}
input[type='radio']:before {
    content:'';
    display:block;
    width:100%;
    height:100%;
    /*margin: 20% auto;    */
    border-radius:50%;    
}
input[type='radio']:checked:before {
    background:rgb(198, 148, 0);
}

input[type='radio']:before {
    content:'';
    display:block;
    width:100%;
    height:100%;
    /*margin: 20% auto;    */
    border-radius:50%;    
}
</style>
