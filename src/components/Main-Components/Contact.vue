<template>
  <div class="contacts">
    <h3
      class="
        w-100
        contact-title
        mb-3
        px-3
        d-flex
        align-items-center
        justify-content-between
        fs-6
        fw-bold
      "
    >
      <span class="text-uppercase">contacts</span>
      <span
        :class="`${
          contacts.length >= 5 ? 'bg-primary' : 'bg-danger'
        } notification d-flex align-items-center justify-content-center fs-6 text-light rounded-circle p-1 px-2`"
        >{{ contacts.length }}</span
      >
    </h3>
    <div
      class="contact-container bg-white p-3 px-0 mb-4 rounded-3 overflow-hidden"
    >
      <div
        v-for="contact in contacts"
        :key="contact.id"
        @click="$router.push(`/messenger/${contact.id}`)"
        class="
          w-100
          contact
          p-2
          px-3
          border border-top-0 border-bottom-1 border-start-0 border-end-0
          d-flex
          align-items-center
          justify-content-between
        "
      >
        <div class="contact-info d-flex align-items-center">
          <img
            :src="contact.profileImg"
            class="profile-img me-3 rounded-circle"
            alt="profile-img"
          />
          <h4 class="fs-6 fw-bold mb-0">{{ contact.profileName }}</h4>
        </div>
        <span
          v-if="contact.deliveredMsg"
          :class="`notification d-flex align-items-center justify-content-center fs-6 text-light rounded-circle p-1 px-2 ${
            contact.deliveredMsg >= 5 ? 'bg-primary' : 'bg-danger'
          }`"
          >{{ contact.deliveredMsg }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contact",
  data() {
    return {
      contacts: [
        {
          id: 1,
          profileImg: require("@/assets/Profile-Images/first-profile.jpg"),
          profileName: "Mohamed Salem",
          deliveredMsg: 2,
        },
        {
          id: 2,
          profileImg: require("@/assets/Profile-Images/second-profile.jpg"),
          profileName: "Ahmed Salem",
          deliveredMsg: 1,
        },
        {
          id: 3,
          profileImg: require("@/assets/Profile-Images/third-profile.png"),
          profileName: "Mohamed Ahmed",
          deliveredMsg: 0,
        },
        {
          id: 4,
          profileImg: require("@/assets/Profile-Images/forth-profile.jpg"),
          profileName: "Ali Ahmed",
          deliveredMsg: 9,
        },
        {
          id: 5,
          profileImg: require("@/assets/Profile-Images/fifth-profile.jpg"),
          profileName: "Moustafa Mohamed",
          deliveredMsg: 0,
        },
        {
          id: 6,
          profileImg: require("@/assets/Profile-Images/sixth.jpg"),
          profileName: "Islam Mohamed",
          deliveredMsg: 3,
        },
        {
          id: 7,
          profileImg: require("@/assets/Profile-Images/seventh.jpg"),
          profileName: "mahmoud Ahmed",
          deliveredMsg: 0,
        },
        {
          id: 8,
          profileImg: require("@/assets/Profile-Images/eighth.jpeg"),
          profileName: "Mohamed Sayed",
          deliveredMsg: 7,
        },
        {
          id: 9,
          profileImg: require("@/assets/Profile-Images/nineth.jpeg"),
          profileName: "Ahmed Sayed",
          deliveredMsg: 4,
        },
      ],
    };
  },
};
</script>

<style scoped>
.contact-title {
  color: #c1c7cf;
}

.contact {
  cursor: pointer;
}

.contact:hover {
  background-color: #f4f5f9;
}

.contact:last-of-type {
  margin-bottom: 0 !important;
  border-bottom: 0 !important;
}

.contact h4 {
  color: #2d435e;
}
</style>
