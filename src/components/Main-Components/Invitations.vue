<template>
  <div
    class="invitations-box d-flex flex-column align-items-center mb-4 rounded-3"
  >
    <h3
      class="
        w-100
        mb-3
        px-4
        d-flex
        align-items-center
        justify-content-between
        fs-6
        fw-bold
      "
    >
      <span class="text-uppercase">invitations</span>
      <span
        :class="`${
          invitations.length >= 5 ? 'bg-primary' : 'bg-danger'
        } notification d-flex align-items-center justify-content-center fs-6 text-light rounded-circle p-1 px-2`"
        >{{ invitations.length }}</span
      >
    </h3>
    <div
      class="
        invitations-container
        w-100
        d-flex
        align-items-center
        flex-column
        bg-white
        p-4
        rounded-3
      "
    >
      <h3
        v-if="invitations.length == 0"
        class="no-invitations mb-0 fs-5 fw-bold text-center text-capitalize"
      >
        you have no invitaions
      </h3>
      <div
        v-for="invitation in invitations"
        :key="invitation.id"
        class="invitaion-content w-100"
      >
        <div
          @click="$router.push(invitation.pageLink)"
          :style="`background-image: url('${invitation.pageCover}')`"
          class="
            w-100
            p-3
            invitaion
            rounded-3
            d-flex
            justify-content-between
            flex-column
            position-relative
            overflow-hidden
          "
        >
          <div class="invitation-profile bg-white p-1 rounded-3">
            <img
              :src="invitation.pageImage"
              class="img-fluid h-100 rounded"
              alt="page-img"
            />
          </div>
          <h3
            class="fs-5 text-white fw-bold text-capitalize rounded-1 p-2 lh-sm"
          >
            {{ invitation.pageTitle }}
          </h3>
        </div>
        <div
          class="
            w-100
            invitation-control
            m-4
            mx-0
            d-flex
            align-items-center
            justify-content-around
          "
        >
          <button
            @click="accept($event, invitation)"
            class="
              btn btn-primary
              text-truncate text-capitalize
              px-4
              fs-6
              rounded-3
              border-3
            "
          >
            accept invitation
          </button>
          <button
            @click="remove(invitation)"
            class="
              btn
              text-secondary
              px-4
              text-capitalize
              fs-6
              rounded-3
              border border-3
              ms-1
              delete-invitaion
            "
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invitations",
  data() {
    return {
      invitations: [
        {
          id: 1,
          pageLink: "/",
          pageImage: require("@/assets/Invitaions-Images/company-profile.jpg"),
          pageCover: require("@/assets/Invitaions-Images/company.jpg"),
          pageTitle: "learn how to be a programmer",
        },
        {
          id: 2,
          pageLink: "/",
          pageImage: require("@/assets/Invitaions-Images/second-profile.jpg"),
          pageCover: require("@/assets/Invitaions-Images/second.jpg"),
          pageTitle: "expore the world",
        },
        {
          id: 3,
          pageLink: "/",
          pageImage: require("@/assets/Invitaions-Images/third-profile.jpg"),
          pageCover: require("@/assets/Invitaions-Images/third.jpg"),
          pageTitle: "travel to space",
        },
      ],
      acceptedInvitaions: [],
    };
  },
  methods: {
    accept(e, item) {
      e.target.textContent = "accepted";
      e.target.disabled = true;
      this.acceptedInvitaions.push(item);
      setTimeout(() => {
        this.invitations = this.invitations.filter(
          (invitation) => invitation.id !== item.id
        );
      }, 600);
    },
    remove(item) {
      this.invitations = this.invitations.filter(
        (invitation) => invitation.id !== item.id
      );
    },
  },
};
</script>

<style scoped>
.invitaion {
  min-height: 275px;
  background-size: cover;
}

.invitaion-content div:first-of-type {
  cursor: pointer;
}

.invitation-profile {
  width: 65px;
  height: 55px;
}

.invitation-profile img {
  object-fit: cover;
}

button.delete-invitaion:hover {
  background-color: #dfe1e6;
}
</style>
