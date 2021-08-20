<template>
  <div class="main-page">
    <div class="container-fluid px-4">
      <div class="row position-relative">
        <LeftSide activeLink="home" />
        <Posts />
        <RightSide />
      </div>
    </div>
  </div>
</template>

<script>
import LeftSide from "@/components/Main-Components/LeftSide";
import Posts from "@/components/Posts-Components/Posts";
import RightSide from "@/components/Main-Components/RightSide";
export default {
  name: "Main",
  components: {
    LeftSide,
    Posts,
    RightSide,
  },
  props: ["activeLink"]
};
</script>
