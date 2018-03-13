<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="create">
      <div class="title">
        <p>Quest</p>
      </div>
      <div class="profile">
        <div>
          <img src="../../assets/images/facebook-icon.png" alt="facebook" />
        </div>
        <div>
          <span class="add">
            Connect to Facebook
          </span>
        </div>
        <div>
          <span class="friend">
            Connect to Facebook to find friends to <br />follow.
          </span>
        </div>
        <div class="button addPhotoBtn" @click="onConnectFacebook">
          Connect to Facebook
        </div>
        <div>
          <button class="button skipBtn" @click="onSkip">Skip</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VNavigationbar from "@/layouts/NavigationBar";

export default {
  name: "create-index",
  components: {
    VNavigationbar
  },
  data() {
    return {};
  },
  methods: {
    onConnectFacebook() {
      console.log("facebook connect");
    },
    onSkip() {
      this.$router.push("create-quest");
    }
  }
};
</script>
