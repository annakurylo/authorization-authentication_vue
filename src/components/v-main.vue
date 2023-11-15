<template>
  <div class="v-main">
    <div class="v-main__block">
      <div class="v-main__block-img">
        <img src="./../assets/img/welcome.jpg" alt="" />
      </div>
      <div class="v-main__block-welcome">WELCOME to the Person Website</div>
      <router-link :to="{ name: 'login' }">
        <a href="" class="v-main__block-start">Start</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-main",
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.v-main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 20px;
  color: rgb(198, 148, 0);

  &__block {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    border: 1px solid yellow;
    padding: 50px 100px;

    &-img img {
      width: 300px;
    }
    &-start {
      background-color: rgb(198, 148, 0);
      border: none;
      padding: 10px 30px;
      border-radius: 10px;
      font-weight: 700;
      color: black;
    }
    &-welcome {
      font-family: Snell Roundhand, cursive;
    }
    a {
      text-decoration: none;
    }
  }
}
</style>
