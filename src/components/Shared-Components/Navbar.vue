<template>
  <nav class="navbar navbar-expand-lg mb-4 position-sticky top-0 border-bottom">
    <div class="container-fluid">
      <!-- App Title -->
      <router-link to="/" class="navbar-brand rounded-3">
        <img src="@/assets/logo.png" class="me-2 logo-img" alt="logo-img" />
        <span class="fs-4 fw-bold text-capitalize">spacepark</span>
      </router-link>
      <!-- Search Input -->
      <div class="search d-flex justify-content-end align-items-center w-50">
        <div class="input-box position-relative w-75 position-relative">
          <i class="fas fa-search position-absolute fs-6"></i>
          <!-- Search for Friends -->
          <input
            type="text"
            v-model="searchValue"
            class="form-control p-2 fs-6 border-0"
            placeholder="Search"
          />
          <!-- List of Friends That Match The Search Value -->
          <div
            v-if="searchValue"
            class="
              friends-searched
              position-absolute
              w-100
              start-0
              bg-white
              rounded-3
              overflow-auto
            "
          >
            <h3
              v-for="friend in searchedFriends"
              :key="friend"
              class="
                w-100
                p-3
                mb-0
                fs-6
                border border-1 border-top-0 border-start-0 border-end-0
              "
            >
              {{ friend }}
            </h3>
          </div>
        </div>
        <!-- Profie Page Link -->
        <router-link to="/profile" class="profile-link ms-3 rounded-3">
          <img
            :src="profileImg"
            class="profile-img rounded-circle"
            alt="profile-img"
          />
        </router-link>
      </div>
    </div>
  </nav>
  <!-- End of The Navbar -->
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      profileImg: require("@/assets/Profile-Images/profile.png"),
      searchValue: "",
      friends: [
        "Mohamed Salem",
        "Ahmed Salem",
        "Mohamed Ahmed",
        "Ali Ahmed",
        "Moustafa Mohamed",
        "Islam Mohamed",
        "mahmoud Ahmed",
        "Ahmed Sayed",
      ],
    };
  },
  computed: {
    searchedFriends() {
      return this.friends.filter((friend) =>
        friend.match(new RegExp(this.searchValue), "i")
      );
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #fcfcfc;
  z-index: 100;
}

.navbar-brand {
  outline: none;
}

.navbar-brand,
input,
.friends-searched h3 {
  color: #2d435e;
}

.logo-img {
  width: 60px;
}

i {
  top: 32%;
  left: 2%;
  color: #9da9b8;
}

input {
  padding-inline-start: 35px !important;
  background-color: #f4f5f9;
  border-radius: 10px;
}

.friends-searched {
  top: 50px;
}

.friends-searched h3 {
  cursor: pointer;
}

.friends-searched h3:hover {
  background-color: #f4f5f9;
  color: #0d6efd;
}

.friends-searched h3:last-of-type {
  border-bottom: 0 !important;
}
</style>
