<template>
  <!-- Post Img Popup -->
  <div
    @click="hideImg(), overflowAuto()"
    class="
      d-none
      show-post-img
      w-100
      h-100
      d-flex
      align-items-center
      justify-content-center
      position-fixed
      top-0
      start-0
    "
  >
    <div
      class="img-container overflow-hidden"
      @click="stoppingPropagation($event)"
    >
      <i
        @click="hideImg(), overflowAuto()"
        class="fs-2 mb-3 text-white fas fa-times"
      ></i>
      <img
        :src="popupImgSrc"
        class="d-block w-100 h-100 mx-100 rounded-2"
        alt="post-img"
      />
    </div>
  </div>
  <!-- Details Popup -->
  <div
    v-if="detailsPopup"
    @click="hideDetailsPopup"
    class="
      details
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
    <div
      class="details-container bg-white p-4 rounded-3"
      @click="stoppingPropagation($event)"
    >
      <!-- Edit You Job Description -->
      <h3 class="fs-5 fw-bold mb-2">Job Description</h3>
      <input
        type="text"
        class="form-control mb-3 rounded-3 p-2"
        v-model="userWork"
      />
      <!-- Edit You Educations -->
      <h3 class="fs-5 fw-bold mb-2">Education School or Faculty</h3>
      <input
        v-for="place in userEducation"
        :key="place"
        type="text"
        class="form-control mb-2 rounded-3 p-2"
        :value="place"
      />
      <!-- Edit Your Stay Place -->
      <h3 class="fs-5 fw-bold mt-3 mb-2">Place of Residence</h3>
      <input
        type="text"
        class="form-control mb-3 rounded-3 p-2"
        v-model="userPlace"
      />
      <!-- Edit The Marital Status -->
      <h3 class="fs-5 fw-bold mb-2">Marital Status</h3>
      <select class="form-select mb-4 rounded-3 p-2" v-model="userState">
        <option id="1" disabled>Select marital status</option>
        <option id="2">Single</option>
        <option id="3">Married</option>
      </select>
    </div>
  </div>
  <div class="container-fluid px-4">
    <div class="row">
      <LeftSide activeLink="profile" />
      <div class="cols-12 col-md-6 px-4">
        <div class="profile">
          <div
            class="
              profile-images
              w-100
              position-relative
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <img
              :src="coverImg"
              class="d-block w-100 rounded-3"
              alt="cover-img"
            />
            <img
              :src="profileImg"
              class="position-absolute rounded-circle border border-2"
            />
          </div>
        </div>
        <!-- Calling of Post Component -->
        <Post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :postProfileImg="profileImg"
          :postProfileName="profileName"
          :postDate="post.postDate"
          :textPost="post.textPost"
          :imgsPost="post.imgsPost"
          :like="post.like"
          :isLiked="post.isLiked"
          :comments="post.comments"
          :share="post.share"
          @sendImgSrc="getImgSrc"
        />
      </div>
      <div class="personal-info col-md-3 cols-12 position-sticky rounded-3">
        <h3 class="title fs-6 fw-bold mb-3 px-4 text-uppercase">Abstract</h3>
        <div class="personal-info-details bg-white rounded-3 p-4">
          <!-- Place Where User Works -->
          <h4 class="fs-6 w-100 d-flex align-items-center mb-3">
            <i class="fas fa-briefcase fs-5 me-3"></i>
            <span>{{ userWork }}</span>
          </h4>
          <!-- Place Where The User Studies in and Studied at -->
          <h4
            v-for="education in userEducation"
            :key="education"
            class="fs-6 w-100 d-flex align-items-center mb-3"
          >
            <i class="fas fa-graduation-cap fs-5 me-3"></i>
            <span>{{ education }}</span>
          </h4>
          <!-- Place Where The User Lives in -->
          <h4 class="fs-6 w-100 d-flex align-items-center mb-3">
            <i class="fas fa-home fs-5 me-3"></i>
            <span>{{ userPlace }}</span>
          </h4>
          <!-- User Marriage State -->
          <h4 class="fs-6 w-100 d-flex align-items-center mb-3">
            <i class="fas fa-heart fs-5 me-3"></i>
            <span>{{ userState }}</span>
          </h4>
          <!-- Edit Abstract Button -->
          <button
            @click="showDetailsPopup"
            class="
              btn btn-primary
              text-truncate text-capitalize
              px-4
              fs-6
              mb-0
              w-100
              d-block
              rounded-3
            "
          >
            Edit Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSide from "@/components/Main-Components/LeftSide";
import Post from "@/components/Posts-Components/Post";
export default {
  name: "Profile",
  data() {
    return {
      coverImg: require("@/assets/Profile-Images/cover.jpg"),
      profileImg: require("@/assets/Profile-Images/profile.png"),
      profileName: "Mohamed Salem",
      popupImgSrc: "",
      posts: [
        {
          id: 1,
          postDate: "12 hours ago",
          textPost: "One Of My Favourite Designs.",
          imgsPost: [require("@/assets/Posts-Images/1.png")],
          like: 5,
          isLiked: true,
          comments: [],
          share: 2,
        },
        {
          id: 1,
          postDate: "2 hours ago",
          textPost:
            "This was one of the most epic journeys, that i’ve got myself involved in. Maybe one of the most memorizable in my entire life!",
          imgsPost: [
            require("@/assets/Posts-Images/2.jpg"),
            require("@/assets/Posts-Images/3.jpg"),
          ],
          like: 0,
          isLiked: false,
          comments: [],
          share: 0,
        },
        {
          id: 1,
          postDate: "10 minutes ago",
          textPost: "Group of Similar Images.",
          imgsPost: [
            require("@/assets/Posts-Images/6.jpg"),
            require("@/assets/Posts-Images/7.jpg"),
            require("@/assets/Posts-Images/8.jpg"),
          ],
          like: 0,
          isLiked: false,
          comments: [],
          share: 0,
        },
      ],
      userWork: "Front-End-Web Developer at Extra Soft Company",
      userEducation: [
        "Studies at Faculty of Compouters and Information Zagazig University",
        "Studied at Saad Eldin Shrief Secondary School",
      ],
      userPlace: "MeetGhamer",
      userState: "Single",
      detailsPopup: false,
      // Edited User Info
      userWorkEdited: "",
      userEducationEdited: [],
      userPlaceEdited: "",
      userStateEdited: "",
    };
  },
  methods: {
    // Function That Return The Overflow of The Body Scroll
    overflowAuto() {
      document.body.style.overflowY = "auto";
    },
    // Function That Get The Clicked Img Src To Show in The Show Post Img Popup
    getImgSrc(imgSrc) {
      document.body.style.overflowY = "hidden";
      document.querySelector(".show-post-img").classList.remove("d-none");
      this.popupImgSrc = imgSrc;
    },
    // Function That Preventing Hiding of The Container of The Popup on Clicking on it
    stoppingPropagation(e) {
      e.stopPropagation();
    },
    // Function That Hide The Show Post Img Popup
    hideImg() {
      document.querySelector(".show-post-img").classList.add("d-none");
    },
    // Function That Show The Details Popup
    showDetailsPopup() {
      this.detailsPopup = true;
      document.body.style.overflow = "hidden";
    },
    // Function That Hide Details Popup
    hideDetailsPopup() {
      this.detailsPopup = false;
    },
  },
  components: {
    LeftSide,
    Post,
  },
};
</script>

<style scoped>
.details-container {
  width: 45%;
}

.show-post-img,
.details {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 101;
}

.show-post-img img {
  max-width: 80vw;
  max-height: 90vh;
}

.show-post-img .img-container {
  width: fit-content !important;
}

.profile {
  margin-bottom: 70px;
}

.show-post-img i {
  cursor: pointer;
}

.profile-images img:first-of-type {
  height: 350px;
  object-fit: cover;
}

.profile-images img:nth-of-type(2) {
  height: 150px;
  width: 150px;
  bottom: -15%;
}

.personal-info .title {
  color: #c1c7cf;
}

.personal-info i,
.details-container h3 {
  color: #0d6efd;
}

.personal-info h4 span {
  color: #2d435e;
}
</style>
