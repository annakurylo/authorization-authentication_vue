<template>
  <div class="v-navigation">
    <div class="v-navigation__container">
      <div class="v-navigation__container-nav">
        <router-link :to="{ name: 'main' }">
          <a href="">Main Page</a>
        </router-link>
        <router-link :to="{ name: 'registration' }">
          <a href="">Registration</a>
        </router-link>
        <router-link :to="{ name: 'login' }">
          <a href="">Login</a>
        </router-link>
        <router-link
          v-if="id"
          :to="{ name: 'user', params: { id: `${this.id}` } }"
        >
          <a href="">Account</a>
        </router-link>
        <a href="" @click="logout">Log out</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "v-navigation",
  data() {
    return {
      id: "",
    };
  },
  props: {},
  methods: {
    logout() {
      if (!localStorage.getItem("token")) {
        this.$router.push({ name: "login" });
        return;
      }
      localStorage.clear();
      alert("Користувач вийшов з облікового запису");
      this.$router.push({ name: "login" });
    },
  },
  async created() {
    const config = {
      params: {
        token: localStorage.getItem("token"),
      },
    };

    try {
      if (!config.params.token) {
        return;
      }
      const userID = await axios.get("/userid", config);
      this.id = userID.data.id;
    } catch (e) {
      console.log(e);
    }

    //this.id = userID.data.id;
  },
};
</script>

<style lang="scss" scoped>
.v-navigation {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 25;
  height: 50px;

  &__container {
    margin: 0 auto;
    padding: 0 10%;
    background-color: rgb(198, 148, 0);
    height: 100%;

    &-nav {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}

a:not(:last-child) {
  margin-right: 20px;
}
a:hover {
  color: rgb(255, 255, 255);
}
a {
  font-size: 20px;
  color: rgb(0, 0, 0);
  font-weight: 700;
  text-decoration: none;
  //font-style: italic;
  font-size: 16px;
}
</style>
