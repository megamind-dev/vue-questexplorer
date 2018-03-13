<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="setting">
      <div class="column is-6 is-offset-3">
        <div class="suggest">
          <div class="content column is-10 is-offset-1">
            <span class="title">
              Settings
            </span>
            <div class="avatar">
              <img :src="userInfo.avatar" alt="avatar" v-if="userInfo.avatar" />
              <v-gravatar hash="f3ada405ce890b6f8204094deb12d8a8" alt="Nobody" :size="200" default-img="retro" v-if="!userInfo.avatar" />
              <span @click="goProfile">View Profile</span>
            </div>
            <p class="comment">
              <span>Change password</span>
            </p>
            <p class="comment">
              <span>Change email</span>
            </p>
            <p class="comment">
              <span>Change avatar</span>
            </p>
            <p class="comment" @click="goCreateQuest">
              <span>Suggest a quest idea</span>
            </p>
            <p class="comment">
              <span @click="onLogout">Logout</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Gravatar from 'vue-gravatar';
  import VNavigationbar from '@/layouts/NavigationBar';
  import { getUserQuery } from '../../graphql/queries/user';

  export default {
    name: 'createquest-index',
    components: {
      VNavigationbar,
      'v-gravatar': Gravatar,
    },
    data() {
      return {
        userInfo: {
          avatar: '',
        },
      };
    },
    created() {
      if (localStorage.getItem('token')) {
        this.authenticated = true;
      }
      this.$apollo.query({
        query: getUserQuery,
        variables: {
          id: localStorage.getItem('userId'),
        },
      }).then((response) => {
        this.userInfo = response.data.User;
      }).catch((error) => {
        console.log(error);
      });
    },
    methods: {
      onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.$router.push('/');
      },
      goProfile() {
        this.$router.push('/profile');
      },
      goCreateQuest() {
        this.$router.push('/create-quest');
      },
    },
  };
</script>
