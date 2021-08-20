<template>
  <div class="container-fluid px-4">
    <div class="row">
      <!-- Chat Content -->
      <div class="chat-container cols-12 col-md-9 pe-4">
        <div
          class="chat-content w-100 position-relative rounded-3 overflow-hidden"
        >
          <!-- Will Appear if The User Donnot Select Someone to Chat with -->
          <div
            v-if="!currentChat.profileName && !currentChat.profileImg"
            class="
              position-absolute
              top-0
              start-0
              w-100
              h-100
              d-flex
              flex-column
              align-items-center
              justify-content-center
            "
          >
            <img src="@/assets/logo.png" class="d-block mb-3" alt="logo-img" />
            <h4 class="start-chat text-center fw-bold fs-4">
              Let’s Start Chatting with a Friend
            </h4>
          </div>
          <!-- Will Appear if The User Select Someone to Chat with -->
          <div
            v-else
            class="chat-with h-100 d-flex flex-column justify-content-between"
          >
            <!-- Header of The Chat -->
            <div
              class="
                chat-header
                w-100
                p-3
                bg-white
                d-flex
                justify-content-between
                align-items-center
              "
            >
              <i
                class="
                  fas
                  fa-ellipsis-v
                  d-flex
                  align-items-center
                  justify-content-center
                  rounded-circle
                "
              ></i>
              <div class="d-flex align-items-center">
                <h4 class="fs-6 fw-bold mb-0">{{ currentChat.profileName }}</h4>
                <img
                  :src="currentChat.profileImg"
                  class="profile-img rounded-circle ms-3"
                  alt="profile-img"
                />
              </div>
            </div>
            <!-- Content of The Chat -->
            <div class="in-chat w-100 p-3 overflow-auto">
              <div
                v-if="messages"
                class="
                  h-100
                  w-100
                  d-flex
                  flex-column
                  justify-content-end
                  overflow-hidden
                "
              >
                <h3
                  v-for="message in messages"
                  :key="message"
                  class="
                    d-flex
                    align-items-center
                    text-white
                    mb-0
                    mt-2
                    overflow-hidden
                  "
                >
                  <i
                    class="
                      fas
                      fa-check
                      me-2
                      d-flex
                      align-items-center
                      justify-content-center
                      rounded-3
                    "
                  ></i>
                  <p
                    class="
                      fs-6
                      p-2
                      px-3
                      d-inline-block
                      mb-0
                      lh-base
                      rounded-3
                      overflow-hidden
                    "
                  >
                    {{ message }}
                  </p>
                </h3>
              </div>
            </div>
            <!-- Footer of The Chat -->
            <div
              class="
                chat-footer
                bg-white
                p-3
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <textarea
                v-model="newMessage"
                @keypress="addingNewMessage"
                placeholder="Write a message"
                class="form-control fs-6 p-3 me-3 rounded-3 border-0"
                rows="1"
              ></textarea>
              <i class="fs-3 far fa-thumbs-up"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- User Chats -->
      <div
        class="chats cols-12 col-md-3 p-0 bg-white rounded-3 overflow-hidden"
      >
        <!-- Search for Friend to Chat with -->
        <div class="profile d-flex align-items-center mb-4 p-4 pb-0">
          <img
            :src="profileImg"
            class="profile-img me-3"
            :title="profileName"
            alt="profile-img"
          />
          <div class="search-input position-relative w-100">
            <i class="fas fa-search position-absolute fs-6"></i>
            <input
              type="text"
              placeholder="Search..."
              v-model="searchValue"
              class="form-control p-2 fs-6 rounded-3 border-0"
            />
          </div>
        </div>
        <!-- Chat Title -->
        <h3 class="chats-title text-uppercase mb-3 px-4 fs-6 fw-bold">chats</h3>
        <!-- Will Appear if There are No Chats and No Matched Chats -->
        <h3
          v-if="chats.length == 0"
          class="no-chat text-center w-100 mb-4 fs-4 fw-bold"
        >
          No Chats Match
        </h3>
        <!-- Chats -->
        <div v-else>
          <!-- Will Appear if The User Searched for a Profile Name -->
          <div
            v-if="filteredChats.length > 0"
            class="contact-chat overflow-scroll"
          >
            <div
              v-for="chat in filteredChats"
              :key="chat"
              :id="chat.id"
              :class="`
                ${$route.params.id == chat.id ? 'active' : ''}
                chat
                matched-chats
                d-flex
                align-items-center
                p-2
                px-4
                border border-1 border-top-0 border-start-0 border-end-0
              `"
              @click="getContatInfo($event, chat)"
            >
              <img
                :src="chat.profileImg"
                class="profile-img me-3 rounded-circle"
                alt="profile-img"
              />
              <h4 class="fs-6 fw-bold mb-0">{{ chat.profileName }}</h4>
            </div>
          </div>
          <!-- That Will Appear if There are no chats match The Search Value -->
          <h4
            v-else-if="filteredChats.length == 0"
            class="not-match text-center w-100 mb-4 fs-4 fw-bold"
          >
            No Matched Chats
          </h4>
          <!-- Will Be Appeared By Default if The Search Input is Empty -->
          <div
            v-else
            v-for="chat in chats"
            :key="chat.id"
            :id="chat.id"
            :class="`
              ${$route.params.id == chat.id ? 'active' : ''}
              chat
              d-flex
              align-items-center
              p-2
              px-4
              border border-1 border-top-0 border-start-0 border-end-0
            `"
            @click="getContatInfo($event, chat)"
          >
            <img
              :src="chat.profileImg"
              class="profile-img me-3 rounded-circle"
              alt="profile-img"
            />
            <h4 class="fs-6 fw-bold mb-0">{{ chat.profileName }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messenger",
  data() {
    return {
      profileName: "Mohamed Salem",
      profileImg: require("@/assets/Profile-Images/profile.png"),
      searchValue: "",
      chats: [
        {
          id: 1,
          profileImg: require("@/assets/Profile-Images/first-profile.jpg"),
          profileName: "Mohamed Salem",
          chatMessages: ["Hello I am Mohamed Salem", "How Are u ?"],
        },
        {
          id: 2,
          profileImg: require("@/assets/Profile-Images/second-profile.jpg"),
          profileName: "Ahmed Salem",
          chatMessages: ["Hello I am Ahmed Salem", "How Are u ?"],
        },
        {
          id: 3,
          profileImg: require("@/assets/Profile-Images/third-profile.png"),
          profileName: "Mohamed Ahmed",
          chatMessages: ["Hello I am Mohamed Ahmed"],
        },
        {
          id: 4,
          profileImg: require("@/assets/Profile-Images/forth-profile.jpg"),
          profileName: "Ali Ahmed",
          chatMessages: [],
        },
        {
          id: 5,
          profileImg: require("@/assets/Profile-Images/fifth-profile.jpg"),
          profileName: "Moustafa Mohamed",
          deliveredMsg: 0,
          chatMessages: ["Hello I am Moustafa Mohamed"],
        },
        {
          id: 6,
          profileImg: require("@/assets/Profile-Images/sixth.jpg"),
          profileName: "Islam Mohamed",
          chatMessages: [],
        },
        {
          id: 7,
          profileImg: require("@/assets/Profile-Images/seventh.jpg"),
          profileName: "mahmoud Ahmed",
          chatMessages: [],
        },
        {
          id: 8,
          profileImg: require("@/assets/Profile-Images/eighth.jpeg"),
          profileName: "Mohamed Sayed",
          chatMessages: ["Hello I am Mohamed Sayed", "How Are u ?"],
        },
        {
          id: 9,
          profileImg: require("@/assets/Profile-Images/nineth.jpeg"),
          profileName: "Ahmed Sayed",
          chatMessages: [],
        },
      ],
      currentChat: {
        profileName: "",
        profileImg: "",
        messages: [],
      },
      newMessage: "",
    };
  },
  methods: {
    getContatInfo(e, value) {
      // Passing The Contact Name and Img to The CurrentChat Data
      this.currentChat.profileName = value.profileName;
      this.currentChat.profileImg = value.profileImg;
      // Route to The Contact Chat
      this.$router.push(`/messenger/${value.id}`);
    },
    // Function The Send New Message In Chats
    addingNewMessage(e) {
      if (/\S/.test(this.newMessage) && e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        this.currentChat.messages.push(e.target.value);
        e.target.setAttribute("rows", "1");
        this.newMessage = "";
      } else if (e.keyCode == 13 && e.shiftKey) {
        e.target.setAttribute(
          "rows",
          parseInt(e.target.getAttribute("rows")) + 1
        );
      }
    },
  },
  computed: {
    // Function The Match The Chats With The Search Value
    filteredChats() {
      return this.chats.filter((chat) =>
        chat.profileName.match(new RegExp(this.searchValue, "i"))
      );
    },
    messages() {
      // Adding The Chats from The Clicked Chat to The Current Chat Data
      if (this.$route.params.id) {
        return (this.currentChat.messages = this.chats.filter(
          (chat) => chat.id == this.$route.params.id
        )[0].chatMessages);
      }
    },
  },
  mounted() {
    // Declaring The Page Id and The chat That has The Same Id
    let id = this.$route.params.id,
      filteredChat = this.chats.filter((chat) => chat.id == id)[0];
    // Passing The filteredChat Name and Img to The CurrentChat Data
    if (this.$route.params.id !== undefined) {
      this.currentChat.profileName = filteredChat.profileName;
      this.currentChat.profileImg = filteredChat.profileImg;
    }
  },
};
</script>

<style scoped>
.chat-container,
.chat-content,
.chats {
  height: calc(100vh - 7.7rem);
}

.chats-title + div,
.contact-chat {
  height: calc(100vh - 15.4rem);
}

.chat-header,
.chat-footer {
  min-height: 10vh;
}

.in-chat {
  height: 80vh;
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
  background-position: center;
}

.in-chat h3 p {
  width: fit-content !important;
  max-width: 97% !important;
  white-space: pre-line;
  overflow-wrap: break-word;
}

.in-chat h3 p,
.in-chat h3 i {
  background-color: #0d6efd;
}

.in-chat h3 i:first-of-type {
  width: 18px;
  height: 18px;
  font-size: 11px !important;
}

.chat-header i {
  height: 35px;
  width: 35px;
}

.chat-footer i {
  color: #0d6efd;
}

.profile input {
  padding-inline-start: 30px !important;
}

.profile input,
textarea,
.chat-header i:hover,
.chat.active {
  background-color: #f4f5f9 !important;
}

.profile i {
  top: 32%;
  left: 3%;
  color: #9da9b8;
}

.chats-title {
  color: #c1c7cf;
}

.chat h4,
.no-chat,
.not-match,
.start-chat {
  color: #2d435e;
}

.chat,
.chat-footer i,
.chat-header i {
  cursor: pointer;
}

.chat:last-of-type {
  border: 0 !important;
}

.chat:hover {
  background-color: #f4f5f9;
}
</style>
