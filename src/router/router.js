import { createRouter, createWebHistory } from "vue-router";
import vMain from "./../components/v-main";
import vLogin from "./../components/v-login";
import vRegistration from "./../components/v-registration"
import vUser from "./../components/v-user"
import vUsers from "./../components/v-users"

let router = new createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: vMain,
    },
    {
      path: "/login",
      name: "login",
      component: vLogin,
    },
    {
      path: "/registration",
      name: "registration",
      component: vRegistration,
    },
    {
      path: "/user/:id",
      name: "user",
      component: vUser,
    },
    {
      path: "/users",
      name: "users",
      component: vUsers,
    },
  ],
});
export default router;
