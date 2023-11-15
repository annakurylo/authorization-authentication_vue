<template>
  <v-navigation></v-navigation>
  <div class="wrapper__container">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import vNavigation from "./components/v-navigation.vue";
export default {
  name: "App",
  components: {
    vNavigation,
  },
};
</script>

<style>
.wrapper__container {
  margin-top: 30px;
}
* {
  margin: 0;
  padding: 0;
 }
 body {
  background: url(./assets/img/bg.jpg);
  background-repeat: no-repeat;
 }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
