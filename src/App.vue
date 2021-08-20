<template>
  <div id="spaceParkApp">
    <!-- Calling of The Navbar Component -->
    <Navbar />
    <!-- Calling of The Routed Page to Be Viewed -->
    <RouterView />
  </div>
</template>

<script>
import Navbar from "@/components/Shared-Components/Navbar";
export default {
  name: "appPage",
  components: {
    Navbar,
  },
};
</script>
