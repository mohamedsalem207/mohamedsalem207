<template>
  <div class="left-side cols-12 col-md-3 position-sticky overflow-auto">
    <!-- Profile Info Card -->
    <div
      class="profile-name d-flex align-items-center bg-white mb-4 p-4 rounded-3"
    >
      <router-link to="/profile" class="profile-link me-3 rounded-3">
        <img :src="profileImg" class="profile-img" alt="profile-img" />
      </router-link>
      <div class="name w-100 overflow-hidden">
        <h3 class="fs-5 fw-bold mb-1 w-100 text-truncate">{{ profileName }}</h3>
        <router-link
          to="/profile"
          class="fs-6 w-100 d-block text-truncate text-decoration-none"
          >@{{ username }}</router-link
        >
      </div>
    </div>
    <!-- Calling of The LeftSideLinks Component -->
    <LeftSideLinks :activeLink="activeLink" />
    <!-- Invitaions Component -->
    <Invitations />
  </div>
</template>

<script>
import LeftSideLinks from "@/components/Main-Components/LeftSideLinks";
import Invitations from "@/components/Main-Components/Invitations";
export default {
  name: "LeftSide",
  data() {
    return {
      profileImg: require("@/assets/Profile-Images/profile.png"),
      profileName: "Mohamed Salem",
      username: "mohamedSalem",
    };
  },
  components: {
    LeftSideLinks,
    Invitations,
  },
  props: ["activeLink"],
};
</script>

<style scoped>
.name h3 {
  color: #2d435e;
}

.name a {
  outline: none;
}
</style>
