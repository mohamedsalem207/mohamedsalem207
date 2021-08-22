import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
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
          id: 3,
          postProfileImg: require("@/assets/Profile-Images/profile.png"),
          postProfileName: "Mohamed Salem",
          postDate: "10 minutes ago",
          textPost: "Group of Similar Images.",
          imgsPost: [
            require("@/assets/Posts-Images/Email campaign-rafiki.png"),
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
          postProfileImg: require("@/assets/Profile-Images/profile.png"),
          postProfileName: "Mohamed Salem",
          postDate: "50 minutes ago",
          textPost: "",
          imgsPost: [
            require("@/assets/Posts-Images/Confirmed-pana (1).png"),
            require("@/assets/Posts-Images/Forgot password-bro.png"),
          ],
          like: 0,
          isLiked: false,
          comments: [],
          share: 0,
        },
        {
          id: 6,
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
});

export default store;
