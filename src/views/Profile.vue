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
    @click="hideDetailsPopup(), overflowAuto()"
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
      <!-- Edit Secondary School -->
      <h3 class="fs-5 fw-bold mb-2">Secondary School</h3>
      <input
        type="text"
        class="form-control mb-3 rounded-3 p-2"
        v-model="secondarySchool"
      />
      <!-- Edit You Educations -->
      <h3 class="fs-5 fw-bold mb-3">Education School or Faculty</h3>
      <input
        type="text"
        class="form-control mb-2 rounded-3 p-2"
        v-model="userGraduated"
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
      <select class="form-select mb-0 rounded-3 p-2" v-model="userState">
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
        <!-- Bio -->
        <div
          class="bio d-flex justify-content-center align-items-center m-0 mx-0"
        >
          <p class="fs-6 fw-bold bg-white p-2 px-4 rounded-3">{{ bio }}</p>
        </div>
        <!-- This is Header Will Apprear Incase of No Posts -->
        <h3
          v-if="postsLength == 0"
          class="no-post text-center w-100 mt-3 mb-4 fs-4 fw-bold"
        >
          There are no Posts to Show
        </h3>
        <!-- Calling of Post Component -->
        <Post
          v-else
          v-for="post in posts"
          :key="post.id"
          :posts="$store.state.posts"
          :post="post"
          :id="post.id"
          :postProfileImg="profileImg"
          :postProfileName="profileName"
          :firstName="firstName"
          :postDate="post.postDate"
          :textPost="post.textPost"
          :imgsPost="post.imgsPost"
          :like="post.like"
          :isLiked="post.isLiked"
          :comments="post.comments"
          :share="post.share"
          @sendImgSrc="getImgSrc"
          @sendDeltedPost="deletePost"
        />
      </div>
      <!-- Personal Info -->
      <div
        class="
          personal-info
          col-md-3
          cols-12
          position-sticky
          rounded-3
          overflow-auto
        "
      >
        <h3 class="title fs-6 fw-bold mb-3 px-4 text-uppercase">Abstract</h3>
        <div
          class="personal-info-details bg-white mb-4 rounded-3 p-4"
          v-if="
            userWork ||
            secondarySchool ||
            userGraduated ||
            userPlace ||
            userState
          "
        >
          <!-- Place Where User Works -->
          <h4 class="fs-6 w-100 d-flex align-items-center mb-3" v-if="userWork">
            <i class="fas fa-briefcase fs-5 me-3"></i>
            <span>{{ userWork }}</span>
          </h4>
          <!-- Secondary School Where The User Studies in -->
          <h4 class="fs-6 w-100 mb-3">
            <div class="d-flex align-items-center" v-if="secondarySchool">
              <i class="fas fa-graduation-cap fs-5 me-3"></i>
              <span>{{ secondarySchool }}</span>
            </div>
          </h4>
          <!-- Place Where The User Studies in and Graduated -->
          <h4 class="fs-6 w-100 mb-3">
            <div class="d-flex align-items-center" v-if="userGraduated">
              <i class="fas fa-graduation-cap fs-5 me-3"></i>
              <span>{{ userGraduated }}</span>
            </div>
          </h4>
          <!-- Place Where The User Lives in -->
          <h4
            class="fs-6 w-100 d-flex align-items-center mb-3"
            v-if="userPlace"
          >
            <i class="fas fa-home fs-5 me-3"></i>
            <span>{{ userPlace }}</span>
          </h4>
          <!-- User Marriage State -->
          <h4
            class="fs-6 w-100 d-flex align-items-center mb-3"
            v-if="userState"
          >
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
        <div class="p-4 mb-3 bg-white rounded-3 no-personal-info" v-else>
          <h3 class="text-center w-100 mb-0 fs-6 text-danger fw-bold">
            Personal information deleted
          </h3>
        </div>
        <!-- Followers Number -->
        <h3 class="title fs-6 fw-bold mb-3 px-4 text-uppercase">statistics</h3>
        <div class="followers bg-white rounded-3">
          <!-- Statistics -->
          <div
            class="
              stat
              d-flex
              align-items-center
              p-2
              px-4
              border border-1 border-top-0 border-start-0 border-end-0
            "
            v-for="(stat, i) in stats"
            :key="i"
          >
            <h4 class="mb-0 text-capitalize fw-bold me-3">
              {{ stat.statTitle }} :
            </h4>
            <p class="mb-0">{{ i == 0 ? postsLength : stat.statNum }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSide from "@/components/Main-Components/LeftSide";
import Post from "@/components/Posts-Components/Post";
import CreatePost from "@/components/Posts-Components/Create-Post";
export default {
  name: "Profile",
  data() {
    return {
      coverImg: require("@/assets/Profile-Images/cover.jpg"),
      profileImg: require("@/assets/Profile-Images/profile.png"),
      profileName: "Mohamed Salem",
      bio: "Hello, welcome to my account",
      popupImgSrc: "",
      userWork: "Front-End-Web Developer at Extra Soft Company",
      secondarySchool: "Saad Eldin Shrief Secondary School",
      userGraduated:
        "Studies at Faculty of Computers and Information Zagazig University",
      userPlace: "MeetGhamer",
      userState: "Single",
      detailsPopup: false,
      // Statistics (posts number, followers, following)
      stats: [
        {
          statTitle: "posts",
          statNum: 0,
        },
        {
          statTitle: "followers",
          statNum: 500,
        },
        {
          statTitle: "following",
          statNum: 1000,
        },
      ],
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
    // Function That Delete The Required Post
    deletePost(value) {
      this.$store.state.posts = this.$store.state.posts.filter(
        (post) => post != value
      );
    },
  },
  computed: {
    // Get The First Name from The Profile Name
    firstName() {
      return this.profileName.substring(0, this.profileName.indexOf(" "));
    },
    // Get The Length of The data => Posts
    postsLength() {
      return (this.stats[0].statNum = this.posts.length);
    },
    posts() {
      return this.$store.state.posts.filter(
        (post) =>
          post.postProfileName == this.profileName &&
          post.postProfileImg == this.profileImg
      );
    },
  },
  components: {
    LeftSide,
    Post,
    CreatePost,
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
.details-container h3,
.stat h4,
.bio p {
  color: #0d6efd;
}

.personal-info h4 span,
.stat p,
.no-personal-info h3,
h3.no-post {
  color: #2d435e;
}

.stat:last-of-type {
  border: 0 !important;
}

.stat h4,
.stat p {
  font-size: 18px;
}
</style>
