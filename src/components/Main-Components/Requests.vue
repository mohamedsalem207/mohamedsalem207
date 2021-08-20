<template>
  <div class="requests d-flex flex-column w-100">
    <h3
      class="
        w-100
        requests-title
        mb-3
        px-3
        d-flex
        align-items-center
        justify-content-between
        fs-6
        fw-bold
      "
    >
      <span class="text-uppercase">requests</span>
      <span
        :class="`${
          requests.length >= 5 ? 'bg-primary' : 'bg-danger'
        } notification d-flex align-items-center justify-content-center fs-6 text-light rounded-circle p-1 px-2`"
        >{{ requests.length }}</span
      >
    </h3>
    <!-- This Header Will Aprear if There are no friends Requests -->
    <h3
      v-if="requests.length == 0"
      class="no-request text-center w-100 mb-4 fs-4 fw-bold"
    >
      no Requests to Show
    </h3>
    <div
      v-for="request in requests"
      :key="request"
      class="
        request
        d-flex
        flex-column
        align-items-center
        bg-white
        mb-3
        p-3
        rounded-3
      "
    >
      <div
        class="
          w-100
          request-profile-info
          mb-2
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <img
          :src="request.profileImg"
          class="profile-img me-3 rounded-circle"
          alt="profile-img"
        />
        <h4 class="fs-6 lh-base w-100">
          <span class="fw-bold">{{ request.profileName }}</span> wants to add
          you to friends
        </h4>
      </div>
      <div
        class="
          request-state
          w-100
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <button
          @click="acceptRequest($event, request)"
          class="
            btn btn-primary
            text-truncate text-capitalize
            px-4
            fs-6
            me-1
            rounded-3
            border-3
          "
        >
          accept
        </button>
        <button
          @click="removeRequest($event, request)"
          class="
            btn
            text-secondary
            px-4
            text-capitalize
            fs-6
            rounded-3
            border border-3
            ms-1
          "
        >
          deciline
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Requests",
  data() {
    return {
      requests: [
        {
          id: 1,
          profileName: "Mohamed sayed",
          profileImg: require("@/assets/Profile-Images/second-profile.jpg"),
        },
        {
          id: 2,
          profileName: "Ahmed Moustafa",
          profileImg: require("@/assets/Profile-Images/third-profile.png"),
        },
      ],
      acceptedRequests: [],
    };
  },
  methods: {
    acceptRequest(el, item) {
      this.acceptedRequests.push(item);
      el.target.disabled = true;
      el.target.textContent = "accepted";
      setTimeout((_) => {
        return (this.requests = this.requests.filter(
          (request) => request.id != item.id
        ));
      }, 500);
    },
    removeRequest(el, item) {
      el.target.disabled = true;
      el.target.textContent = "decilined";
      setTimeout(() => {
        return (this.requests = this.requests.filter(
          (request) => request.id != item.id
        ));
      }, 500);
    },
  },
};
</script>

<style scoped>
.requests-title {
  color: #c1c7cf;
}

.request h4,
.no-request {
  color: #2d435e;
}
</style>
