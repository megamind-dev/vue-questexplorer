<template>
  <div>
    <v-navigationbar></v-navigationbar>
    <div class="setting">
      <div class="column is-10 is-offset-1">
        <div class="profile">
          <div class="info">
            <div class="column is-8 is-offset-2">
              <div class="user columns">
                <div class="avatar column is-3">
                  <img :src="userInfo.avatar" alt="avatar" v-if="userInfo.avatar" />
                  <v-gravatar hash="f3ada405ce890b6f8204094deb12d8a8" alt="Nobody" :size="200" default-img="retro" v-if="!userInfo.avatar" />
                </div>
                <div class="detail column is-9">
                  <div class="columns">
                    <div class="column">
                      <span class="name">
                        {{userInfo.fullName}}
                      </span>
                    </div>
                    <div class="column">
                      <div class="columns">
                        <div class="column is-7">
                          <button class="button">
                            Follow
                          </button>
                        </div>
                        <div class="column is-5">
                          <button class="button">
                            More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> objectives</span>
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> quests</span>
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> followers</span>
                      <span class="count"><strong>{{userInfo.numObjectives}}</strong> following</span>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <span class="count">{{userInfo.bio ? userInfo.bio : "There is no bio yet"}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns is-multiline quests">
                <div v-for="(quest, index) in quests" :key="index" class="column is-6">
                  <div class="quest">
                    <div class="main-bg" @click="goDetail(quest.id)">
                      <progressive-img
                        :src="quest.containObjectives[0].image"
                        placeholder="https://unsplash.it/1920/1080?image=10"
                      />
                    </div>
                    <div class="columns text">
                      <div class="column is-10">
                        <div>
                          <span class="name">{{quest.title}}</span>
                        </div>
                        <div>
                          <span class="description">{{quest.description}}</span>
                        </div>
                      </div>
                      <div class="column is-2">
                        <div class="like">
                          <span>
                            3/6
                          </span>
                        </div>
                      </div>  
                    </div>
                    <div>
                      <button class="button is-danger">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Gravatar from 'vue-gravatar';
  import VueProgressiveImage from 'vue-progressive-image';
  import VNavigationbar from '@/layouts/NavigationBar';
  import { getUserQuery } from '../../graphql/queries/user';
  import { fetchAllQuestQuery } from '../../graphql/queries/quest';
  import { fetchAllObjectiveQuery } from '../../graphql/queries/objective';
  
  Vue.use(VueProgressiveImage);

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
        quests: [],
        objectives: [],
        imageArray: [],
        imageUrl: '',
      };
    },
    created() {
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
      this.$apollo.query({
        query: fetchAllQuestQuery,
      }).then((response) => {
        this.quests = response.data.allQuests;
        console.log(this.quests);
      }).catch((error) => {
        console.log(error);
      });
      this.$apollo.query({
        query: fetchAllObjectiveQuery,
      }).then((response) => {
        this.objectives = response.data.allObjectives;
        // console.log(this.objectives);
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
      goDetail(id) {
        this.$router.push({
          path: '/quest',
          query: { id },
        });
      },
    },
  };
</script>
