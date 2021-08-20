<template>
  <!-- Img Popup -->
  <div
    v-if="popupImgSrc"
    @click="removeImgSrc"
    class="
      img-popup
      position-fixed
      top-0
      start-0
      w-100
      h-100
      d-flex
      align-items-center
      justify-content-center
    "
  >
    <div class="d-flex flex-column" @click="stoppingPropagation">
      <i class="fs-2 mb-3 text-white fas fa-times" @click="removeImgSrc"></i>
      <img :src="popupImgSrc" class="rounded-2" alt="user-img" />
    </div>
  </div>
  <div class="container-fluid px-4">
    <div class="row">
      <!-- Calling of The Left Side Component -->
      <LeftSide activeLink="photos" />
      <div class="photos-content cols-12 col-md-9 ps-4 overflow-hidden">
        <div
          class="
            user-info
            d-flex
            mb-2
            align-items-center
            justify-content-between
          "
        >
          <!-- User Info (username and user Profile Img) -->
          <div class="d-flex align-items-center bg-white p-2 px-3 rounded-3">
            <img
              @click="$router.push('/profile')"
              :src="profileImg"
              class="profile-img rounded-circle me-3"
              alt="profile-Img"
            />
            <h3 class="fs-6 fw-bold mb-0">{{ profileName }}</h3>
          </div>
          <!-- -->
          <ul
            class="
              list-unstyled
              d-flex
              align-items-center
              justify-content-between
              w-50
              bg-white
              p-3
              rounded-3
              mb-0
            "
          >
            <li
              id="all"
              class="fw-bold active"
              @click="getTargetImages($event)"
            >
              All Imgaes
            </li>
            <li id="recent" class="fw-bold" @click="getTargetImages($event)">
              Recent Imgaes
            </li>
            <li
              id="beforeMonth"
              class="fw-bold"
              @click="getTargetImages($event)"
            >
              Before Month
            </li>
            <li
              id="beforeYear"
              class="fw-bold"
              @click="getTargetImages($event)"
            >
              Before Year
            </li>
          </ul>
        </div>
        <div
          class="
            photos
            d-flex
            justify-content-between
            flex-wrap
            overflow-auto
            mb-3
          "
        >
          <div
            class="mt-3 mx-2 rounded-3 overflow-hidden"
            v-for="img in userImages"
            :key="img"
          >
            <!-- User Img -->
            <img
              @click="getImgSrc(img.img)"
              :src="img.img"
              :class="`all d-block w-100 h-100 rounded-3 ${img.imgClass}`"
              alt="user-img"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSide from "@/components/Main-Components/LeftSide";
export default {
  name: "Photos",
  data() {
    return {
      profileName: "Mohamed Salem",
      profileImg: require("@/assets/Profile-Images/profile.png"),
      userImages: [
        {
          imgClass: "beforeMonth",
          img: require("@/assets/Profile-Images/first-profile.jpg"),
        },
        {
          imgClass: "beforeYear",
          img: require("@/assets/Profile-Images/second-profile.jpg"),
        },
        {
          imgClass: "beforeMonth",
          img: require("@/assets/Profile-Images/third-profile.png"),
        },
        {
          imgClass: "recent",
          img: require("@/assets/Profile-Images/forth-profile.jpg"),
        },
        {
          imgClass: "recent",
          img: require("@/assets/Profile-Images/fifth-profile.jpg"),
        },
        {
          imgClass: "beforeMonth",
          img: require("@/assets/Profile-Images/sixth.jpg"),
        },
        {
          imgClass: "recent",
          img: require("@/assets/Profile-Images/seventh.jpg"),
        },
        {
          imgClass: "recent",
          img: require("@/assets/Profile-Images/eighth.jpeg"),
        },
        {
          imgClass: "beforeYear",
          img: require("@/assets/Profile-Images/nineth.jpeg"),
        },
        {
          imgClass: "beforeMonth",
          img: require("@/assets/Stories-Images/default.jpg"),
        },
        {
          imgClass: "beforeYear",
          img: require("@/assets/Stories-Images/fifth.jpg"),
        },
        {
          imgClass: "beforeYear",
          img: require("@/assets/Stories-Images/first.jpg"),
        },
        {
          imgClass: "beforeMonth",
          img: require("@/assets/Stories-Images/forth.jpg"),
        },
        {
          imgClass: "recent",
          img: require("@/assets/Stories-Images/second.jpg"),
        },
        {
          imgClass: "beforeYear",
          img: require("@/assets/Stories-Images/third.jpg"),
        }
      ],
      targetImages: [],
      popupImgSrc: "",
    };
  },
  methods: {
    // Function That Show The ImgPopup
    getImgSrc(src) {
      this.popupImgSrc = src;
    },
    // Function That Hide The ImgPopup
    removeImgSrc() {
      this.popupImgSrc = "";
    },
    // Function That Stop Propagation
    stoppingPropagation(e) {
      e.stopPropagation();
    },
    // Function That Return The Target Images
    getTargetImages(e) {
      // Removing the active Class from all li
      [...e.target.parentElement.children].filter((el) =>
        el.classList.remove("active")
      );
      // Set the active Class to the Clicked li
      e.target.classList.add("active");
      if (e.target.id == "all") {
        document.querySelectorAll(".photos div").forEach(function (img) {
          img.classList.remove("d-none");
        });
      } else {
        document.querySelectorAll(".photos img").forEach(function (img) {
          if (img.classList.contains(`${e.target.id}`)) {
            img.parentElement.classList.remove("d-none");
          } else {
            img.parentElement.classList.add("d-none");
          }
        });
      }
    },
  },
  components: {
    LeftSide,
  },
};
</script>

<style scoped>
.img-popup {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 101;
}

.img-popup img {
  max-width: 80vw;
  max-height: 90vh;
}

.img-popup i,
ul li {
  cursor: pointer;
}

.user-info h3,
ul li.active,
ul li:hover {
  color: #0d6efd !important;
}

ul li {
  color: #2d435e;
}

.photos {
  height: calc(100vh - 12.2rem);
}

.photos div {
  width: 200px;
  height: 200px;
}

.photos img {
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.photos img:hover {
  transform: scale(1.2);
}

.photos img,
.user-info img {
  object-fit: cover;
}
</style>
