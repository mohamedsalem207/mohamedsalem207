<template>
  <div class="left-side-links bg-white px-0 mb-4 rounded-3 overflow-hidden">
    <!-- Left Side Links -->
    <div class="list-group list-group-flush">
      <router-link
        v-for="link in links"
        :key="link.id"
        :to="link.path"
        :class="`list-group-item p-4 d-flex align-items-center justify-content-between ${link.active}`"
      >
        <span>
          <i :class="`${link.iconClass} fs-5 me-2`"></i>
          <span class="fs-6 fw-bold text-capitalize link-text">{{
            link.linkText
          }}</span>
        </span>
        <span
          v-if="link.notifications > 0"
          :class="`${
            link.notifications >= 5 ? 'bg-primary' : 'small-notification'
          } notification d-flex align-items-center justify-content-center fs-6 text-light rounded-circle p-1 px-2`"
          >{{ link.notifications }}</span
        >
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftSidelinkTexts",
  data() {
    return {
      links: [
        {
          id: 1,
          path: "/",
          active: this.activeLink == "home" ? "active-link" : "",
          linkText: "home",
          iconClass: "fas fa-home",
          notifications: 0,
        },
        {
          id: 2,
          path: "/messenger",
          active: this.activeLink == "messenger" ? "active-link" : "",
          linkText: "messenger",
          iconClass: "far fa-id-badge",
          notifications: 8,
        },
        {
          id: 3,
          path: "/photos",
          active: this.activeLink == "photos" ? "active-link" : "",
          linkText: "photos",
          iconClass: "far fa-image",
          notifications: 0,
        },
        {
          id: 5,
          path: "/profile",
          active: this.activeLink == "profile" ? "active-link" : "",
          linkText: "profile",
          iconClass: "fas fa-user",
          notifications: 5,
        },
      ],
    };
  },
  props: ["activeLink"],
};
</script>

<style scoped>
i {
  width: 30px;
  color: #c1c7cf;
}

a {
  border-left: 5px solid transparent !important;
  outline: none;
}

a.active-link,
a:hover {
  background-color: #f4f5f9;
  border-left-color: #0d6efd !important;
}

a.active-link i,
a.active-link span:first-of-type,
a:hover i,
a:hover span:first-of-type {
  color: #0d6efd !important;
}

.link-text {
  color: #2d435e;
}
</style>
