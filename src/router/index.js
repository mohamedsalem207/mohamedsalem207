import { createRouter, createWebHistory } from "vue-router";
import Main from "@/views/Main";
import Profile from "@/views/Profile";
import Messenger from "@/views/Messenger";
import Photos from "@/views/Photos";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/messenger",
    name: "Messenger",
    component: Messenger,
  },
  {
    path: "/messenger/:id",
    name: "chat",
    component: Messenger,
  },
  {
    path: "/photos",
    name: "Photos",
    component: Photos,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
