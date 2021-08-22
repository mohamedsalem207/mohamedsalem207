<template>
  <!-- Create Post Box -->
  <div
    class="
      create-post
      bg-white
      p-3
      mb-4
      rounded-3
      d-flex
      justify-content-between
      align-items-center
    "
  >
    <div class="d-flex align-items-center w-100">
      <img
        :src="profileImg"
        class="profile-img me-3"
        alt="profile-img"
        @click="$router.push('/profile')"
      />
      <h3 class="p-2 h6 fw-bold text-capitalize mb-0 w-100 rounded-3">
        what’s <span class="text-lowercase">new</span>, {{ firstName }}?
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  props: ["profileImg", "firstName"],
};
</script>

<style scoped>
.create-post h3 {
  cursor: pointer;
}

.create-post h3:hover {
  background-color: #f4f5f9;
}
</style>
