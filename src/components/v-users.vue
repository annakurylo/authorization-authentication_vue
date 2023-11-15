<template>
  <div v-if="users.length" class="v-users">
    <div class="v-users__title">All users</div>
    <div class="v-users__list">
      <div
        v-for="(user, indx) of users"
        :key="user.id"
        class="v-users__list-card"
      >
        <div class="v-users__list-card-name">
          {{ indx + 1 }}) {{ user.name }}
        </div>
        <router-link :to="{ name: 'user', params: { id: `${user.id}` } }" class="btn">
          <button class="v-users__list-card-btn">Info</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "v-users",
  props: {},
  data() {
    return {
      users: [],
    };
  },
  methods: {},
  async created() {
    const config = {
      params: {
        token: localStorage.getItem("token"),
      },
    };
    try {
      const users = await axios.get("/users", config);
      this.users = users.data;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss" scoped>
.v-users {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  font-size: 20px;
  color: rgb(198, 148, 0);
  &__title {
    font-size: 32px;
    color: rgb(198, 148, 0);
    font-weight: 700;
    font-family: Snell Roundhand, cursive;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    &-card {
      box-shadow: 0 0 8px 0 #e0e0e0;
      min-width: 500px;
      background-color: white;

      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      &-name {
        color: black;
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
}
</style>
