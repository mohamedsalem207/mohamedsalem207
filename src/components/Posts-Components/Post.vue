<template>
  <!-- Post Container -->
  <div class="post mb-4 bg-white p-3 rounded-3">
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
              @click="$emit('sendDeltedPost', post)"
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
        :class="`w-100 ${
          imgsPost.length == 1 ? 'single-img d-flex justify-content-center' : ''
        }${
          post.imgsPost.length == 2
            ? 'two-imgs d-flex align-items-center justify-content-around'
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
          class="mx-2 rounded-3"
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
        :for="`postInput${id}`"
      >
        <i class="fs-5 far fa-comment-dots me-2" :for="`postInput${id}`"></i>
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
        :placeholder="`${firstName}, Add a Comment?`"
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
  emits: ["sendImgSrc", "postShared", "sendDeltedPost"],
  data() {
    return {
      profileName: "Mohamed Salem",
      profileImg: require("@/assets/Profile-Images/profile.png"),
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
      return (this.$store.state.posts = this.$store.state.posts.filter(
        (post) => post.id !== item.id
      ));
    },
  },
  props: [
    "posts",
    "post",
    "id",
    "postProfileImg",
    "postProfileName",
    "firstName",
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

.single-img img {
  max-width: 100% !important;
  margin: 0 !important;
}

.two-imgs img,
.multiple-imgs img {
  max-width: 47.5% !important;
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
