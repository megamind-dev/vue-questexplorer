<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item headerTitle" @click="goFeed">
          <h1 class="is-1 is-white">Quest</h1>
        </a>
        <div
          class="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="search" v-if="authenticated">
            <b-input
              icon="search"
              type="search"
              placeholder="Search..."
            ></b-input>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <div class="control" @click="goExplore">
                <img src="../assets/images/crystal.png" v-if="authenticated" />
              </div>
              <div class="control">
                <span v-if="!authenticated">
                  Login
                </span>
                <img src="../assets/images/heart.png" v-if="authenticated" />
              </div>
              <div class="control">
                <span v-if="!authenticated">
                  Join
                </span>
                <img
                  :src="userInfo.avatar"
                  v-if="authenticated && userInfo.avatar"
                  @click="goSetting"
                />
                <div @click="goSetting">
                  <v-gravatar
                    hash="f3ada405ce890b6f8204094deb12d8a8"
                    alt="Nobody"
                    :size="200"
                    default-img="retro"
                    v-if="authenticated && !userInfo.avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Gravatar from "vue-gravatar";
import { getUserQuery } from "../graphql/queries/user";

export default {
  /**
   * The name of the layout.
   */
  name: "default-layout",
  components: {
    "v-gravatar": Gravatar
  },
  data() {
    return {
      menuCollapsed: false,
      authenticated: false,
      userInfo: {
        avatar: ""
      }
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.authenticated = true;
    }
    this.$apollo
      .query({
        query: getUserQuery,
        variables: {
          id: localStorage.getItem("userId")
        }
      })
      .then(response => {
        this.userInfo = response.data.User;
      })
      .catch(error => {
        console.log(error);
      });
  },
  /**
   * The methods that the layout can use.
   */
  methods: {
    /**
     * Will log the user out.
     */
    logout() {
      this.$store.dispatch("auth/logout");
    },

    /**
     * Will toggle the menu.
     */
    toggleMenu() {
      this.menuCollapsed = !this.menuCollapsed;
    },
    goSetting() {
      this.$router.push("setting");
    },
    goExplore() {
      this.$router.push("explore");
    },
    goFeed() {
      this.$router.push("feed");
    }
  }
};
</script>
