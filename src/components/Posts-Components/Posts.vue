<template>
  <div class="col-md-6 cols-12 px-4 posts">
    <!-- Create Post Popup -->
    <div
      @click="hideNewPostPopup(), overflowAuto()"
      class="
        d-none
        create-post-popup
        w-100
        h-100
        position-fixed
        top-0
        start-0
        d-flex
        align-items-center
        justify-content-center
      "
    >
      <div
        @click="stoppingPropagation($event)"
        class="create-post-popup-container w-50 bg-white p-3 rounded-3"
      >
        <div
          class="
            profile-info
            d-flex
            align-items-center
            justify-content-between
            mb-3
          "
        >
          <div class="d-flex align-items-center">
            <img
              :src="profileImg"
              class="profile-img rounded-circle me-3"
              alt="profile-img"
            />
            <h3 class="fs-6 mb-0 fw-bold">
              {{ profileName }}
            </h3>
          </div>
          <i
            @click="hideNewPostPopup(), overflowAuto()"
            class="
              close-icon
              text-secondary
              d-flex
              align-items-center
              justify-content-center
              fas
              fa-times
              fs-5
              rounded-circle
            "
          ></i>
        </div>
        <div class="creation-post-content">
          <textarea
            v-model="newPost.postText"
            rows="1"
            :placeholder="`What do You Think ${firstName}`"
            class="form-control mb-3 rounded-3 border-0"
          ></textarea>
          <div
            v-if="newPost.postImg.length > 0"
            class="
              new-post-imgs
              p-3
              w-100
              d-inline-flex
              align-items-center
              flex-wrap
              mb-3
              border border-2
              rounded-3
            "
          >
            <img
              v-for="img in newPost.postImg"
              :key="img"
              :src="newPost.postImg"
              :class="`${
                newPost.postImg.length == 1
                  ? 'one-img w-100 h-100'
                  : 'multi-imgs'
              } d-block rounded-3`"
              alt="post-img"
            />
          </div>
          <input
            @change="getNewPostImg"
            type="file"
            class="invisible"
            id="addImg"
            multiple="multiple"
            accept="image/*"
          />
          <label
            for="addImg"
            class="
              d-inline-flex
              w-100
              h-100
              p-2
              mb-3
              fs-5
              rounded-3
              justify-content-center
              align-items-center
            "
          >
            <i class="far fa-images fs-4 me-2"></i>
            <span>Add Image</span>
          </label>
          <button
            @click="addNewPost"
            :disabled="isDisabled"
            class="btn btn-primary d-block w-100 p-2 fs-5 rounded-3"
          >
            Post
          </button>
        </div>
      </div>
    </div>
    <!-- Post Shared Notification Popup -->
    <div
      class="
        post-shared-notification
        d-flex
        align-items-center
        justify-content-center
        position-fixed
        w-100
        start-0
        text-center
      "
    >
      <h3
        class="
          p-2
          px-3
          bg-white
          rounded-3
          fs-5
          d-flex
          align-items-center
          justify-content-center
          text-center
        "
      >
        <i
          class="
            fas
            fa-check
            me-2
            text-primary
            rounded-circle
            d-flex
            align-items-center
            justify-content-center
            border border-2
            fs-6
          "
        ></i>
        Post Shared Successfully
      </h3>
    </div>
    <!-- Share Popup -->
    <div
      @click="hideSharePopup(), overflowAuto()"
      class="
        share-popup
        d-flex d-none
        align-items-center
        justify-content-center
        position-fixed
        top-0
        start-0
        w-100
        h-100
      "
    >
      <div
        @click="stoppingPropagation($event)"
        class="
          share-popup-container
          bg-white
          p-3
          px-4
          d-flex
          flex-column
          justify-content-center
          align-items-center
          rounded-3
        "
      >
        <h3 class="fs-5 mb-3">
          Are You Sure, You Want To Share
          <span class="fw-bold">{{ sharedPostFrom }}’s</span> Post
        </h3>
        <div class="share-control">
          <button
            @click="addSharedPost($event), hideSharePopup(), overflowAuto()"
            class="btn btn-primary px-4 fs-6 me-1 rounded-3 border-3"
          >
            Share
          </button>
          <button
            @click="hideSharePopup(), overflowAuto()"
            class="btn px-4 fs-6 ms-2 rounded-3 border border-3"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
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
    <!-- Calling of The Stories Component -->
    <Stories />
    <!-- Create Post Box -->
    <div
      @click="showNewPostPopup(), overflowHidden()"
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
        <img :src="profileImg" class="profile-img me-3" alt="profile-img" />
        <h3 class="p-2 h6 fw-bold text-capitalize mb-0 w-100 rounded-3">
          what’s <span class="text-lowercase">new</span>, {{ firstName }}?
        </h3>
      </div>
    </div>
    <!-- Calling of Post Component -->
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :postProfileImg="post.postProfileImg"
      :postProfileName="post.postProfileName"
      :postDate="post.postDate"
      :textPost="post.textPost"
      :imgsPost="post.imgsPost"
      :like="post.like"
      :isLiked="post.isLiked"
      :comments="post.comments"
      :share="post.share"
      @postShared="getSharedPost"
      @sendImgSrc="getImgSrc"
    />
  </div>
</template>

<script>
import Stories from "@/components/Posts-Components/Stories";
import Post from "@/components/Posts-Components/Post";
export default {
  name: "Posts",
  data() {
    return {
      profileName: "Mohamed Salem",
      profileImg: require("@/assets/Profile-Images/profile.png"),
      popupImgSrc: "",
      sharedPostFrom: "",
      postShared: "",
      // Will Passed To Profile Page
      sharedPosts: [],
      // New Post Data
      posts: [
        {
          id: 1,
          postProfileImg: require("@/assets/Profile-Images/first-profile.jpg"),
          postProfileName: "Moustafa Mohamed",
          postDate: "12 hours ago",
          textPost: "One Of My Favourite Designs.",
          imgsPost: [require("@/assets/Posts-Images/1.png")],
          like: 5,
          isLiked: true,
          comments: [],
          share: 2,
        },
        {
          id: 2,
          postProfileImg: require("@/assets/Profile-Images/second-profile.jpg"),
          postProfileName: "Ali Ahmed",
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
          id: 3,
          postProfileImg: require("@/assets/Profile-Images/third-profile.png"),
          postProfileName: "moustafa ahmed",
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
        {
          id: 4,
          postProfileImg: require("@/assets/Profile-Images/forth-profile.jpg"),
          postProfileName: "mohamed ahmed",
          postDate: "50 minutes ago",
          textPost: "",
          imgsPost: [
            require("@/assets/Posts-Images/10.jpg"),
            require("@/assets/Posts-Images/12.jpg"),
            require("@/assets/Posts-Images/background.jpg"),
            require("@/assets/Posts-Images/care.png"),
          ],
          like: 0,
          isLiked: false,
          comments: [],
          share: 0,
        },
        {
          id: 5,
          postProfileImg: require("@/assets/Profile-Images/fifth-profile.jpg"),
          postProfileName: "Ahmed Salem",
          postDate: "1 day ago",
          textPost: "",
          imgsPost: [
            require("@/assets/Posts-Images/clock.jpg"),
            require("@/assets/Posts-Images/contact.png"),
            require("@/assets/Posts-Images/choose-us.jpg"),
            require("@/assets/Posts-Images/design.jpg"),
            require("@/assets/Posts-Images/Editing.png"),
          ],
          like: 0,
          isLiked: false,
          comments: [],
          share: 0,
        },
      ],
      newPost: {
        postText: "",
        postImg: [],
      },
    };
  },
  methods: {
    // Function That Return The Overflow of The Body Scroll
    overflowAuto() {
      document.body.style.overflowY = "auto";
    },
    // Function That Make The Overflow of The Body Hidden
    overflowHidden() {
      document.body.style.overflow = "hidden";
    },
    // Function That Show Add New Post Menu
    showNewPostPopup() {
      document.querySelector(".create-post-popup").classList.remove("d-none");
    },
    // Function That Get The New Post Img
    getNewPostImg(e) {
      console.log(e.target.files);
    },
    addNewPost(e) {
      console.log(this.newPost.postText);
    },
    // Function That Hide New Post Popup
    hideNewPostPopup() {
      document.querySelector(".create-post-popup").classList.add("d-none");
    },
    // Function That Getting The Value of The sharedPostFrom
    getSharedPost(value) {
      document.body.style.overflowY = "hidden";
      document.querySelector(".share-popup").classList.remove("d-none");
      this.postShared = value;
      this.sharedPostFrom = value.postProfileName;
    },
    // Function on Clicking on the Container of The Share Popup
    hideSharePopup() {
      document.querySelector(".share-popup").classList.add("d-none");
    },
    // Function That Preventing Hiding of The Container of The Popup on Clicking on it
    stoppingPropagation(e) {
      e.stopPropagation();
    },
    // Function That add Shared Post to The User Profile
    addSharedPost(el) {
      this.postShared.share++;
      // Making The Share Button Disabled
      el.target.disabled = true;
      // Add To SharedPosts
      this.sharedPosts.push(this.postShared);
      // Add The Animation Class to The Top Shared Successfully Notification
      document
        .querySelector(".post-shared-notification")
        .classList.add("animation");
      // Removing The Animation Class from The Top Shared Successfully Notification After The Animation Ended
      setTimeout((_) => {
        // Enable The Share Button Again
        el.target.disabled = false;
        document
          .querySelector(".post-shared-notification")
          .classList.remove("animation");
      }, 2750);
    },
    // Function That Get The Clicked Img Src To Show in The Show Post Img Popup
    getImgSrc(imgSrc) {
      document.body.style.overflowY = "hidden";
      document.querySelector(".show-post-img").classList.remove("d-none");
      this.popupImgSrc = imgSrc;
    },
    // Function That Hide The Show Post Img Popup
    hideImg() {
      document.querySelector(".show-post-img").classList.add("d-none");
    },
  },
  computed: {
    // Function That Getting The First Name of The ProfileName
    firstName() {
      return this.profileName.substring(0, this.profileName.indexOf(" "));
    },
    // Function That Enable and Disable The Post Button
    isDisabled() {
      return /\S/.test(this.newPost.postText) || this.newPost.postImg.length > 0
        ? false
        : true;
    },
  },
  components: {
    Stories,
    Post,
  },
};
</script>

<style scoped>
@keyframes animate {
  15% {
    top: 30px;
  }
  30% {
    top: 30px;
  }
  45% {
    top: 30px;
  }
  60% {
    top: 30px;
  }
  75% {
    top: 30px;
  }
  90% {
    top: 30px;
  }
  100% {
    top: -55px;
  }
}

.animation {
  animation: animate 2.75s 1 ease-in-out;
}

.create-post-popup h3,
.create-post-popup label {
  color: #2d435e;
}

.close-icon,
.post-shared-notification h3 i {
  width: 30px;
  height: 30px;
}

.close-icon:hover {
  background-color: #f4f5f9;
}

.create-post-popup .new-post-imgs {
  min-height: 200px;
}

.create-post-popup input[type="file"] {
  width: 0;
  height: 0;
}

.one-img,
.multi-imgs {
  max-height: 200px;
}

.one-img,
.multi-imgs,
.show-post-img img {
  object-fit: contain;
}

.multi-imgs {
  width: 49%;
}

.multi-imgs:not(img:first-of-type):not(img:nth-of-type(2)) {
  margin-top: 2%;
}

.post-shared-notification {
  top: -55px;
  z-index: 102;
}

.post-shared-notification h3 {
  color: #2d435e;
  border: 3px solid #0d6efd;
}

.post-shared-notification h3 i {
  border-color: #0d6efd !important;
}

.share-popup,
.show-post-img,
.create-post-popup {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 101;
}

.post-shared-notification h3,
.show-post-img .img-container,
.share-popup-container,
.share-popup-container button {
  width: fit-content !important;
}

.show-post-img img {
  max-width: 80vw;
  max-height: 90vh;
}

.show-post-img i {
  cursor: pointer;
}

.create-post h3,
.img-container i,
.create-post-popup label,
.close-icon {
  cursor: pointer;
}

.create-post h3:hover,
.create-post-popup label {
  background-color: #f4f5f9;
}
</style>
