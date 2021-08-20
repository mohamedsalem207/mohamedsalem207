<template>
  <!-- This is Header Will Apprear Incase of No Posts -->
  <h3
    v-if="posts.length == 0"
    class="no-post text-center w-100 mb-4 fs-4 fw-bold"
  >
    There are no Posts to Show
  </h3>
  <!-- Post Container -->
  <div v-else class="post mb-4 bg-white p-3 rounded-3">
    <!-- Post Header -->
    <div class="post-header mb-4">
      <div class="d-flex align-items-center justify-content-between">
        <div class="post-owner d-flex align-items-center">
          <!-- Post Profile Img -->
          <img
            :src="postProfileImg"
            class="profile-img rounded-circle me-3"
            alt="post-owner-img"
          />
          <div>
            <!-- Post Profile Name -->
            <h3 class="fs-6 mb-0 fw-bold">
              {{ postProfileName }}
            </h3>
            <!-- Date of The Post -->
            <span class="post-date">{{ postDate }}</span>
          </div>
        </div>
        <!-- The Control of The Post -->
        <div class="post-control position-relative position-relative">
          <i
            class="
              fas
              fa-ellipsis-h
              d-flex
              align-items-center
              justify-content-center
              rounded-circle
            "
            @click="showDeleteBtn($event)"
          ></i>
          <div class="delete-post position-absolute d-none end-0">
            <button
              @click="deletePost(post)"
              class="
                d-block
                w-100
                bg-white
                p-2
                btn
                rounded-2
                border border-2
                fs-6
                fw-bold
              "
            >
              Hide Post
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- The Content of The Post -->
    <div class="post-content px-2 mb-4">
      <h3 v-if="post.textPost" class="fs-6 post-text mb-3">
        {{ textPost }}
      </h3>
      <div
        :class="`w-100 ${imgsPost.length == 1 ? 'single-img' : ''}${
          post.imgsPost.length == 2
            ? 'two-imgs d-flex align-items-center justify-content-between'
            : ''
        }${
          imgsPost.length >= 3
            ? 'multiple-imgs d-flex flex-wrap align-items-center justify-content-between'
            : ''
        }`"
      >
        <img
          v-for="img in imgsPost"
          :key="img"
          :src="img"
          @click="$emit('sendImgSrc', img)"
          :class="`${post.imgsPost.length == 1 ? 'w-100 ' : ''} rounded-3`"
          alt="post-img"
        />
      </div>
    </div>
    <!-- Post Statistics -->
    <div
      class="post-stat mx-2 d-flex align-items-center justify-content-between"
    >
      <h3 v-if="like" class="fs-6 w-100 text-start">
        {{ like }} <span>{{ like == 1 ? "Like" : "Likes" }}</span>
      </h3>
      <h3 class="fs-6 w-100 text-end">
        <span> {{ comments.length }} </span>
        <span class="me-2">
          {{ comments.length == 1 ? " Comment" : " Comments" }},</span
        >
        <span>{{ share }} </span>
        <span class="me-1">
          {{ share == 1 ? " Share" : " Shares" }}
        </span>
      </h3>
    </div>
    <!-- Interact With The Post -->
    <div
      class="
        post-footer
        mx-2
        border border-start-0 border-end-0 border-top-2 border-bottom-2
        d-flex
        align-items-center
        justify-space-between
      "
    >
      <!-- Like Post -->
      <div
        :class="`${
          isLiked ? 'liked' : ''
        } like p-2 d-flex align-items-center justify-content-center`"
        @click="liked(post)"
      >
        <i class="fs-5 far fa-thumbs-up me-2"></i>
        <span class="fs-6 fw-bold">Like</span>
      </div>
      <!-- Comment on Post -->
      <div
        class="comment p-2 d-flex align-items-center justify-content-center"
        @click="focusCommentInput($event)"
        :for="`postInput${post.id}`"
      >
        <i
          class="fs-5 far fa-comment-dots me-2"
          :for="`postInput${post.id}`"
        ></i>
        <span class="fs-6 fw-bold" :for="`postInput${id}`">Comment</span>
      </div>
      <!-- Share Post -->
      <div
        @click="$emit('postShared', post)"
        class="
          share
          p-2
          d-flex
          align-items-center
          justify-content-center
          position-relative
        "
      >
        <i class="fs-5 fas fa-share me-2"></i>
        <span class="fs-6 fw-bold">Share</span>
      </div>
    </div>
    <!-- Add a Comment -->
    <div class="add-comment mx-2 mt-3 d-flex align-items-center">
      <img :src="profileImg" class="profile-img me-3" alt="profile-img" />
      <textarea
        rows="1"
        @keypress="addComment($event, post)"
        placeholder="Add a Comment"
        class="form-control rounded-3 border-0"
        :id="`postInput${post.id}`"
      ></textarea>
    </div>
    <!-- Comments Box -->
    <div
      v-if="comments.length > 0"
      class="
        comments-box
        mt-3
        mx-2
        border border-top-2 border-bottom-0 border-start-0 border-end-0
      "
    >
      <div
        class="d-flex mt-3 overflow-hidden"
        v-for="comment in comments"
        :key="comment"
      >
        <img :src="profileImg" class="profile-img me-3" alt="post-img" />
        <div
          class="
            comment-content
            d-flex
            align-items-center
            position-relative
            overflow-hidden
          "
        >
          <div class="p-2 w-100 rounded-3">
            <h3
              class="
                comment-profile
                profileName
                fs-6
                fw-bold
                mb-1
                text-capitalize
              "
            >
              {{ profileName }}
            </h3>
            <p class="fs-6 mb-0 overflow-hidden">{{ comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
document.body.onclick = function () {
  document.querySelectorAll(".delete-post").forEach(function (btn) {
    btn.classList.add("d-none");
  });
};
export default {
  name: "Post",
  emits: ["sendImgSrc", "postShared"],
  data() {
    return {
      profileName: "Mohamed Salem",
      profileImg: require("@/assets/Profile-Images/profile.png"),
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
    };
  },
  methods: {
    liked(item) {
      if (item.isLiked) {
        item.like--;
      } else {
        item.like++;
      }
      item.isLiked = !item.isLiked;
    },
    focusCommentInput(el) {
      document.getElementById(el.target.getAttribute("for")).focus();
    },
    addComment(e, post) {
      /* on Clicking on the Enter key Only */
      if (e.keyCode == 13 && !e.shiftKey && /\S/.test(e.target.value)) {
        e.preventDefault();
        post.comments.push(e.target.value);
        e.target.setAttribute("rows", "1");
        e.target.value = "";
        /* on Clicking on the Enter key with the Shify Key */
      } else if (e.keyCode == 13 && e.shiftKey) {
        e.target.setAttribute(
          "rows",
          Number(e.target.getAttribute("rows")) + 1
        );
        console.log(e);
        /* Adding New Row When the Text Warp */
      } else if (e.target.scrollHeight - e.target.clientHeight) {
        e.target.setAttribute(
          "rows",
          Number(e.target.getAttribute("rows")) + 1
        );
      }
    },
    showDeleteBtn(el) {
      el.stopPropagation();
      el.target.nextElementSibling.classList.toggle("d-none");
    },
    deletePost(item) {
      return (this.posts = this.posts.filter((post) => post.id !== item.id));
    },
  },
  props: [
    "post",
    "id",
    "postProfileImg",
    "postProfileName",
    "postDate",
    "textPost",
    "imgsPost",
    "like",
    "isLiked",
    "comments",
    "share",
  ],
};
</script>

<style scoped>
.post-owner,
.post-control,
.post-content img,
.like,
.comment,
.share {
  cursor: pointer;
}

h3.no-post,
.post-owner h3,
.post-text,
.like,
.comment,
.share,
.comment-content div h3,
.comment-content i,
.delete-post button {
  color: #2d435e;
}

.fa-ellipsis-h {
  width: 35px;
  height: 35px;
}

.fa-ellipsis-h:hover {
  background-color: #f4f5f9;
}

.delete-post {
  min-width: 150px;
  top: 40px;
}

.delete-post button:hover,
.share-post button:hover {
  background-color: #2d435e !important;
  border-color: #2d435e !important;
  color: #fff;
}

.post-text {
  line-height: 27px;
}

.post-owner span {
  font-size: 15px;
}

.two-imgs img,
.multiple-imgs img {
  width: 49% !important;
}

.multiple-imgs img:not(img:first-of-type):not(img:nth-of-type(2)) {
  margin-top: 2%;
}

.post-content img {
  object-fit: cover;
}

.like,
.comment,
.share {
  width: 33.33333% !important;
}

.like:hover,
.share:not(.share-post button):hover,
.comment:hover {
  background-color: #f4f5f9;
  color: #0d6efd;
}

.liked i,
.liked span {
  color: #0d6efd !important;
}

.comment-content p {
  width: auto !important;
  white-space: pre-line;
  overflow-wrap: break-word;
}

.add-comment textarea,
.comment-content div {
  background-color: #f4f5f9;
}

.add-comment textarea {
  resize: none;
}

.comment-content:hover .fa-ellipsis-v {
  visibility: visible !important;
}

.add-comment textarea::-webkit-scrollbar {
  width: 0px;
}
</style>
