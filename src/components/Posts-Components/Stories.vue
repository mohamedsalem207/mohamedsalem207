<template>
  <div
    class="
      stories
      mb-4
      d-flex
      align-items-center
      justify-content-between
      w-100
      rounded-3
      overflow-auto
    "
  >
    <div
      class="
        story-container
        flex-shrink-0
        d-flex
        flex-column
        justify-content-end
        align-items-center
        rounded-3
        me-2
        p-2
      "
      :style="`background-image: url(${defaultImg}); background-size: cover`"
    >
      <input
        type="file"
        id="addYourStory"
        style="width: 0; visibility: hidden"
      />
      <span class="add-btn mb-3 border p-1 border-3 rounded-3">
        <label for="addYourStory" @click="getFileValue($event)">
          <i
            class="
              fas
              fa-plus
              bg-white
              text-primary
              p-2
              rounded-3
              fs-6
              d-flex
              align-items-center
              justify-content-center
            "
          ></i>
        </label>
      </span>
      <h4
        class="
          fw-bold
          text-truncate text-capitalize text-white
          rounded-1
          p-2
          mb-0
          lh-sm
          text-center
          w-100
        "
      >
        add to story
      </h4>
    </div>
    <div
      v-for="story in stories"
      :key="story.id"
      class="
        story-container
        flex-shrink-0
        d-flex
        flex-column
        justify-content-between
        me-2
        p-2
        rounded-3
      "
      :style="`background-image: url(${story.storyImg}); background-size: cover`"
    >
      <span class="account-img-container p-1 border border-3 rounded-3">
        <img
          :src="story.accountImg"
          class="account-img rounded-3"
          alt="account-img"
        />
      </span>
      <h4
        class="
          fw-bold
          text-capitalize
          rounded-1
          p-2
          lh-sm
          text-white text-center text-truncate
          w-100
          mb-0
        "
      >
        {{ story.accountName }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stories",
  data() {
    return {
      newStory: [],
      defaultImg: require("@/assets/Stories-Images/default.jpg"),
      stories: [
        {
          id: 1,
          accountName: "mohamed salem",
          accountImg: require("@/assets/Profile-Images/first-profile.jpg"),
          storyImg: require("@/assets/Stories-Images/first.jpg"),
        },
        {
          id: 2,
          accountName: "ahmed salem",
          accountImg: require("@/assets/Profile-Images/second-profile.jpg"),
          storyImg: require("@/assets/Stories-Images/second.jpg"),
        },
        {
          id: 3,
          accountName: "mohamed ahmed",
          accountImg: require("@/assets/Profile-Images/third-profile.png"),
          storyImg: require("@/assets/Stories-Images/third.jpg"),
        },
        {
          id: 4,
          accountName: "ali ahmed",
          accountImg: require("@/assets/Profile-Images/forth-profile.jpg"),
          storyImg: require("@/assets/Stories-Images/forth.jpg"),
        },
        {
          id: 5,
          accountName: "moustafa mohamed",
          accountImg: require("@/assets/Profile-Images/fifth-profile.jpg"),
          storyImg: require("@/assets/Stories-Images/fifth.jpg"),
        },
      ],
    };
  },
  methods: {
    getFileValue() {
      var newImg = this.newStory;
      document.querySelectorAll("input[type='file']")[0].onchange =
        function () {
          newImg.push(this.value);
        };
    },
  },
};
</script>

<style scoped>
.stories::-webkit-scrollbar {
  display: none !important;
}

.stories {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

.story-container {
  height: 225px;
  /* width: 150px; */
  width: 147px;
}

.story-container:last-of-type {
  margin-inline-end: 0 !important;
}

.add-btn,
.add-btn label,
.story-container {
  cursor: pointer;
}

.story-container:first-of-type {
  cursor: auto;
}

.add-btn i,
.account-img {
  width: 35px;
  height: 35px;
}

.add-btn,
.add-btn label,
.account-img-container {
  border-color: #fff !important;
}

.account-img-container {
  width: fit-content;
}

.account-img {
  object-fit: cover;
}

.p-1 {
  padding: 3px !important;
}

.rounded-3 {
  border-radius: 7px !important;
}

h4 {
  font-size: 14px !important;
}
</style>
