<template>
  <div class="right-side cols-12 col-md-3 position-sticky overflow-auto">
    <!-- Friends Requests -->
    <Requests />
    <!-- Calling Contact Component -->
    <Contact />
  </div>
</template>

<script>
import Requests from "@/components/Main-Components/Requests";
import Contact from "@/components/Main-Components/Contact";
export default {
  name: "RightSide",
  components: {
    Requests,
    Contact,
  },
};
</script>
